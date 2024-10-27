import userModel from "@/models/user-model";

const GET = async (req, { params }) => {
    try {
        const usr = await userModel.findOne({ email: params.id });
        return Response.json({ data: usr || {} })
    } catch (error) {
        return Response.json({ message: error })
    }
}

export { GET };