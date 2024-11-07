import userModel from "@/models/user_model";
import UploadFile from "@/utils/UploadFile";

const allowField = new Set(["name", "email", "password", "avatar"]);

const GET = async (req) => {
    try {
        const query = req.nextUrl.searchParams;
        if (query.get('all')) return Response.json({ data: await userModel.find() })
        const usrs = await userModel.paginate();
        return Response.json({ data: usrs })
    } catch (error) {
        return Response.json({ message: error })
    }
}


const POST = async (req) => {
    try {
        const fd = await req.formData();
        const data = Object.fromEntries(fd);

        if (data.file && data.file.size != 0) {
            const flName = await UploadFile(data.file);
            if (!flName) return Response.json({ error: "Image error!" })
            data.avatar = flName;
        }
        delete data.file;
        const valid = Object.keys(data).every(k => allowField.has(k));
        if (!valid) return Response.json({ error: "Field error" });
        const mdl = await userModel.create(data);
        return Response.json({ data: mdl });
    } catch (error) {
        return Response.json({ message: error + "Something went wrong!!" })
    }
}

export { GET, POST };