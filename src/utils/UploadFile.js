import fs from "fs";

let dir = "./public/images"
const allowExt = ["jpg", "png", "jpeg"]

export default async function UploadFile(file) {
    const idx = file.name.lastIndexOf('.');

    const extName = file.name.substring(idx + 1);
    const valid = allowExt.includes(extName);
    if (!valid) return false;

    const byte = await file.arrayBuffer();
    const buffer = Buffer.from(byte);
    const newName = `${new Date().getTime()}_${file.name}`;
    const path = `${dir}/${newName}`;

    fs.writeFile(
        path,
        buffer,
        (opt) => console.log({ opt })
    );
    return newName;
}