import mealHistory from "@/models/meals_history";

// const allowField = new Set(["name", "email", "password", "avatar"]);

const GET = async () => {
    try {
        const history = await mealHistory.paginate();
        return Response.json({ data: history })
    } catch (error) {
        return Response.json({ message: error })
    }
}

const POST = async (req) => {
    try {
        const fd = await req.formData();
        const data = Object.fromEntries(fd);
        const obj = Object.entries(data)
            .filter(([key]) => key.startsWith('usr_'))
            .map(([key, count]) => ({
                userId: key.replace('usr_', ''),
                count
            }));
        // if (!valid) return Response.json({ error: "Field error" });
        const mdl = await mealHistory.create({ date: data.date, record: obj });
        return Response.json({ data: mdl });
    } catch (error) {
        return Response.json({ message: error + "Something went wrong!!" })
    }
}

export { GET, POST };