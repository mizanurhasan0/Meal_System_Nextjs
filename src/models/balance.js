import mongoose, { Schema } from "mongoose";
import paginate from "mongoose-paginate-v2";

const schema = new Schema({
    account: [
        {
            userId: {
                type: Schema.Types.ObjectId,
                ref: 'Users'
            },
            amount: Number,
            logs: [{ amount: String, date: String, status: Boolean, _id: false }],
            _id: false,
        }
    ],
    mealId: {
        type: Schema.Types.ObjectId,
        ref: 'Meals'
    },
}, {
    timestamps: true,
});

schema.methods.toJSON = function () {
    const obj = this.toObject();
    delete obj._v;
    return JSON.parse(JSON.stringify(obj).replace(/_id/g, 'id'));
}
schema.plugin(paginate);
const balanceModal = mongoose.models.Balance ?? mongoose.model("Balance", schema);

export default balanceModal;