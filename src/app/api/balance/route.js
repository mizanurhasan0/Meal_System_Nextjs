import balanceModal from "@/models/balance";

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
        console.log(getBal.account);
        const bal = await getBal.save();

        // console.log(getData);
        return Response.json({ data: bal });
    } catch (error) {
        return Response.json({ message: error + "Something went wrong!!" })
    }
}

export { GET, POST };