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
            getBal.account[idx].amount += Number(amount);
            // console.log(getBal.account[idx]);
            getData = [getBal.account[idx], ...getData];
            getBal.account[idx].logs = [{ amount: amount, date: new Date().toLocaleDateString(), status: Number(amount) > 0 }, ...getBal.account[idx].logs];
        });
        const bal = await getBal.save();
        // const popData = await bal.populate({
        //     path: 'account.userId',
        //     model: 'Users'
        // });
        // console.log(getData);
        return Response.json({ data: getData });
    } catch (error) {
        return Response.json({ message: error + "Something went wrong!!" })
    }
}

export { GET, POST };