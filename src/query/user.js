"use server"
import { userModel } from "../models/user-model";

export async function createUsr(moduleData) {
    try {
        const module = await userModel.create(moduleData);
        return JSON.parse(JSON.stringify(module));
    } catch (e) {
        throw new Error(e)
    }
}
export async function getUsr() {
    try {
        const module = await userModel.find();
        return JSON.parse(JSON.stringify(module));
    } catch (e) {
        throw new Error(e)
    }
}