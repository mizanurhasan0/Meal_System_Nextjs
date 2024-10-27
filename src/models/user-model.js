import mongoose, { Schema } from "mongoose";

const schema = new Schema({
    email: {
        required: false,
        type: String
    },
    pass: {
        required: false,
        type: String
    },
    avatar: String,
}, {
    timestamps: true,
});

schema.methods.toJSON = function () {
    const obj = this.toObject();
    delete obj._v;
    return JSON.parse(JSON.stringify(obj).replace(/_id/g, 'id'));
}

const userModel = mongoose.models.Users ?? mongoose.model("Users", schema);

export default userModel;