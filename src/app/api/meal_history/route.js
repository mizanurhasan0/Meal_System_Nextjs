import mealHistory from "@/models/meals_history";
import mealsModel from "@/models/meals";
import userModel from "@/models/user_model";

import { dbConnect } from "@/service/mongo";
// const allowField = new Set(["name", "email", "password", "avatar"]);

const GET = async (req) => {
    // await dbConnect();
    try {
        const param = req.nextUrl.searchParams.get("id");

        const history = await mealHistory.find({ mealId: param }).populate({
            path: 'record.userId',
            model: userModel
        });
        // const history = await mealHistory.find({ mealId: param });
        return Response.json({ data: history })
    } catch (error) {
        console.log(error);
        return Response.json({ message: error })
    }
}

const POST = async (req) => {
    try {
        const param = req.nextUrl.searchParams.get("id");
        const fd = await req.formData();
        const data = Object.fromEntries(fd);
        const obj = Object.entries(data)
            .filter(([key]) => key.startsWith('usr_'))
            .map(([key, count]) => ({
                userId: key.replace('usr_', ''),
                count
            }));
        // if (!valid) return Response.json({ error: "Field error" });
        const mdl = await mealHistory.create({ date: data.date, record: obj, mealId: param });
        return Response.json({ data: mdl });
    } catch (error) {
        return Response.json({ message: error + "Something went wrong!!" })
    }
}

export { GET, POST };