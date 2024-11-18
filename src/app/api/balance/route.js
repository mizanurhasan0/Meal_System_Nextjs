import balanceModal from "@/models/balance";
import userModel from "@/models/user_model";
import mealHistory from "@/models/meals_history";
import { ObjectId } from "mongodb";

// const allowField = new Set(["name", "email", "password", "avatar"]);

const GET = async (req) => {
    try {
        const param = req.nextUrl.searchParams.get("id");

        const history = await balanceModal.findOne({ mealId: param }).populate({
            path: 'account.userId',
            model: userModel
        });

        return Response.json({ data: history })
    } catch (error) {
        return Response.json({ message: error })
    }
}

const POST = async (req) => {
    try {
        // const param = req.nextUrl.searchParams.get("id");
        const data = await req.json();
        const getBal = await balanceModal.findOne({ mealId: data.mealId });
        if (!getBal) return Response.json({ data: await balanceModal.create(data) })
        let setData = [];
        data.account.forEach(async ({ userId, amount }) => {
            const idx = getBal.account.findIndex((a) => a.userId.toString() === userId);
            if (idx === -1) {
                let getUsr = await userModel.findOne({ _id: userId });
                if (getUsr) {
                    getBal.account = [...getBal.account, { userId: userId, amount: amount, logs: [] }];
                    setData = [...setData, { userId: getUsr, amount: amount }];
                }
            }
            else {
                getBal.account[idx].amount += Number(amount);
                getBal.account[idx].logs = [{ amount: amount, date: new Date().toLocaleDateString(), status: Number(amount) > 0 }, ...getBal.account[idx].logs];
                setData = [...setData, { userId: userId, amount: getBal.account[idx].amount }];

            }

        });

        const bal = await getBal.save();

        return Response.json(setData);
    } catch (error) {
        return Response.json({ message: error + "Something went wrong!!" })
    }
}
// const POST = async (req) => {
//     try {
//         // const param = req.nextUrl.searchParams.get("id");
//         const data = await req.json();
//         const getBal = await balanceModal.findOne({ mealId: data.mealId });
//         if (!getBal) return Response.json({ data: await balanceModal.create(data) })
//         let getData = [];
//         data.account.forEach(({ userId, amount }) => {
//             const idx = getBal.account.findIndex((a) => a.userId.toString() === userId);
//             if (idx !== -1) {
//                 getData = [getBal.account[idx], ...getData];
//                 getBal.account[idx].logs = [{ amount: amount, date: new Date().toLocaleDateString(), status: Number(amount) > 0 }, ...getBal.account[idx].logs];
//             }
//             else {
//                 getBal.account = [...getBal.account, { userId: userId, amount: amount, logs: [] }];
//             }

//         });

//         const bal = await getBal.save();

//         return Response.json([]);
//     } catch (error) {
//         return Response.json({ message: error + "Something went wrong!!" })
//     }
// }

export { GET, POST };