import mongoose, { Schema } from "mongoose";
import paginate from "mongoose-paginate-v2";

const schema = new Schema({
    name: {
        required: false,
        type: String
    },
    start: {
        required: false,
        type: String
    },
    end: {
        required: false,
        type: String
    },
    users_id: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Users'
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
const mealsModel = mongoose.models.Meals ?? mongoose.model("Meals", schema);

export default mealsModel;