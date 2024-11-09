import mongoose from "mongoose";

export async function dbConnect() {
    try {
        const conn = await mongoose.connect(String(process.env.MONGODB_CONNECTION_STRING), {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            connectTimeoutMS: 20000,
            socketTimeoutMS: 20000
        });
        return conn;
    } catch (err) {
        console.error(err);
    }
}