import mongoose, { Schema } from "mongoose";
import paginate from "mongoose-paginate-v2";

const schema = new Schema({
    name: {
        required: false,
        type: String
    },
    email: {
        required: false,
        type: String
    },
    password: {
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
schema.plugin(paginate);
const userModel = mongoose.models.Users ?? mongoose.model("Users", schema);

export default userModel;