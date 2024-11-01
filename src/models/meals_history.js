import mongoose, { Schema } from "mongoose";
import paginate from "mongoose-paginate-v2";

const schema = new Schema({
    date: {
        required: false,
        type: String
    },
    record: [
        {
            userId: {
                type: Schema.Types.ObjectId,
                ref: 'Users',
            },
            count: {
                type: Number,
                default: 0
            },
            _id: false
        }
    ]
}, {
    timestamps: true,
});

schema.methods.toJSON = function () {
    const obj = this.toObject();
    delete obj._v;
    return JSON.parse(JSON.stringify(obj).replace(/_id/g, 'id'));
}
schema.plugin(paginate);
const mealHistory = mongoose.models.History ?? mongoose.model("History", schema);

export default mealHistory;