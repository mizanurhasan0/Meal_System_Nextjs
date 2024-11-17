import balanceModal from "@/models/balance";
import mealHistory from "@/models/meals_history";
import { ObjectId } from "mongodb";
// const allowField = new Set(["name", "email", "password", "avatar"]);

const GET = async (req) => {
    try {
        const param = req.nextUrl.searchParams.get("id");

        const history = await balanceModal.findOne({ mealId: param }).populate({
            path: 'account.userId',
            model: 'Users'
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
        let getData = [];
        data.account.forEach(({ userId, amount }) => {
            const idx = getBal.account.findIndex((a) => a.userId.toString() === userId);
            if (idx !== -1) {
                getData = [getBal.account[idx], ...getData];
                getBal.account[idx].logs = [{ amount: amount, date: new Date().toLocaleDateString(), status: Number(amount) > 0 }, ...getBal.account[idx].logs];
            }
            else {
                getBal.account = [...getBal.account, { userId: userId, amount: amount, logs: [] }];
            }

        });

        const bal = await getBal.save();
        // const history = await mealHistory.aggregate(
        //     [
        //         {
        //             $match: {
        //                 mealId: new ObjectId(data.mealId) // Match specific mealId
        //             }
        //         },
        //         {
        //             $unwind: "$record" // Unwind the `record` array to process each user separately
        //         },
        //         {
        //             $lookup: {
        //                 from: "balances",
        //                 let: {
        //                     mealId: "$mealId",
        //                     userId: "$record.userId"
        //                 },
        //                 pipeline: [
        //                     {
        //                         $match: {
        //                             $expr: {
        //                                 $and: [
        //                                     { $eq: ["$mealId", "$$mealId"] }
        //                                 ]
        //                             }
        //                         }
        //                     },
        //                     {
        //                         $unwind: "$account"
        //                     },
        //                     {
        //                         $match: {
        //                             $expr: {
        //                                 $eq: ["$account.userId", "$$userId"]
        //                             }
        //                         }
        //                     },
        //                     {
        //                         $project: {
        //                             amount: "$account.amount"
        //                         }
        //                     }
        //                 ],
        //                 as: "balanceDetails"
        //             }
        //         },
        //         {
        //             $unwind: "$balanceDetails" // Unwind balanceDetails to bring `amount` to the root level
        //         },
        //         {
        //             $group: {
        //                 _id: {
        //                     userId: "$record.userId",
        //                     mealId: "$mealId"
        //                 },
        //                 totalCount: { $sum: "$record.count" },
        //                 amount: { $first: "$balanceDetails.amount" }
        //             }
        //         },
        //         {
        //             $lookup: {
        //                 from: "users",
        //                 localField: "_id.userId",
        //                 foreignField: "_id",
        //                 as: "userDetails"
        //             }
        //         },
        //         {
        //             $unwind: "$userDetails" // Unwind userDetails to bring `user` data to the root level
        //         },
        //         {
        //             $group: {
        //                 _id: "$_id.mealId",
        //                 record: {
        //                     $push: {
        //                         userId: "$userDetails",
        //                         totalCount: "$totalCount",
        //                         amount: "$amount",
        //                         // user: "$userDetails" // Include populated user details here
        //                     }
        //                 }
        //             }
        //         },
        //         {
        //             $project: {
        //                 _id: 0,
        //                 mealId: "$_id",
        //                 record: 1
        //             }
        //         }
        //     ]

        // );

        return Response.json(history[0]);
    } catch (error) {
        return Response.json({ message: error + "Something went wrong!!" })
    }
}

export { GET, POST };