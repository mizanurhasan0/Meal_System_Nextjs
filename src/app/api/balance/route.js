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
        const data = await req.json();
        // console.log();
        // if (!valid) return Response.json({ error: "Field error" });
        const mdl = await balanceModal.create(data);
        return Response.json({ data: mdl });
    } catch (error) {
        return Response.json({ message: error + "Something went wrong!!" })
    }
}

export { GET, POST };