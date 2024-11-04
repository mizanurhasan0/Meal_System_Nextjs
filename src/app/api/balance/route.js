import balanceModal from "@/models/balance";

// const allowField = new Set(["name", "email", "password", "avatar"]);

const GET = async (req) => {
    try {
        const param = req.nextUrl.searchParams.get("id");
        const history = await balanceModal.find({ mealId: param }).populate({
            path: 'amount.userId',
            model: 'Users'
        });
        return Response.json({ data: history })
    } catch (error) {
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
        const mdl = await balanceModal.create({ date: data.date, record: obj, mealId: param });
        return Response.json({ data: mdl });
    } catch (error) {
        return Response.json({ message: error + "Something went wrong!!" })
    }
}

export { GET, POST };