import mealsModel from "@/models/meals";

const allowField = new Set(["name", "start", "end"]);

const GET = async () => {
    try {
        const history = await mealsModel.find();
        return Response.json({ data: history });
    } catch (error) {
        return Response.json({ message: error })
    }
}

const POST = async (req) => {
    try {
        const fd = await req.formData();
        const data = Object.fromEntries(fd);
        const valid = Object.keys(data).every((k) => allowField.has(k));
        if (!valid) return Response.json({ error: "Field error" });
        const mdl = await mealsModel.create(data);
        return Response.json({ data: mdl });
    } catch (error) {
        return Response.json({ message: error + "Something went wrong!!" })
    }
}

export { GET, POST };