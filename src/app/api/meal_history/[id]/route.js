import mealHistory from "@/models/meals_history";
import { ObjectId } from "mongodb";
import userModel from "@/models/user_model"

const GET = async (req, { params }) => {
    try {
        const { id } = params;
        const history = await mealHistory.aggregate(
            [
                {
                    $match: {
                        mealId: new ObjectId(id) // Match specific mealId
                    }
                },
                {
                    $unwind: "$record" // Unwind the `record` array to process each user separately
                },
                {
                    $lookup: {
                        from: "balances",
                        let: {
                            mealId: "$mealId",
                            userId: "$record.userId"
                        },
                        pipeline: [
                            {
                                $match: {
                                    $expr: {
                                        $and: [
                                            { $eq: ["$mealId", "$$mealId"] }
                                        ]
                                    }
                                }
                            },
                            {
                                $unwind: "$account"
                            },
                            {
                                $match: {
                                    $expr: {
                                        $eq: ["$account.userId", "$$userId"]
                                    }
                                }
                            },
                            {
                                $project: {
                                    amount: "$account.amount"
                                }
                            }
                        ],
                        as: "balanceDetails"
                    }
                },
                {
                    $unwind: "$balanceDetails" // Unwind balanceDetails to bring `amount` to the root level
                },
                {
                    $group: {
                        _id: {
                            userId: "$record.userId",
                            mealId: "$mealId"
                        },
                        totalCount: { $sum: "$record.count" },
                        amount: { $first: "$balanceDetails.amount" }
                    }
                },
                {
                    $lookup: {
                        from: "users",
                        localField: "_id.userId",
                        foreignField: "_id",
                        as: "userDetails"
                    }
                },
                {
                    $unwind: "$userDetails" // Unwind userDetails to bring `user` data to the root level
                },
                {
                    $group: {
                        _id: "$_id.mealId",
                        record: {
                            $push: {
                                userId: "$userDetails",
                                totalCount: "$totalCount",
                                amount: "$amount",
                                // user: "$userDetails" // Include populated user details here
                            }
                        }
                    }
                },
                {
                    $project: {
                        _id: 0,
                        mealId: "$_id",
                        record: 1
                    }
                }
            ]

        );
        return Response.json({ data: history })
    } catch (error) {
        console.log(error);
        return Response.json({ message: error })
    }
}
const POST = async (req, { params }) => {
    try {
        const { id } = params;
        const lastEntry = await mealHistory.findOne({ mealId: id }).sort({ createdAt: -1, _id: -1 }).lean();
        const today = new Date();
        if (lastEntry.date == today.toLocaleDateString()) return Response.json({ error: "Every thing updated" });
        const startDate = new Date(lastEntry.date);
        startDate.setDate(startDate.getDate() + 1);
        let objData = [];
        for (let date = new Date(startDate); date < today; date.setDate(date.getDate() + 1)) {
            const exist = await mealHistory.findOne({ mealId: id, date: new Date(date).toLocaleDateString() })
            if (!exist) {
                objData.push({
                    date: date.toLocaleDateString(),
                    mealId: lastEntry.mealId,
                    record: lastEntry.record,
                });
            }
        }

        if (objData.length === 0) return Response.json("There is not one for inserted!");
        const inserted = await mealHistory.insertMany(objData);
        const populateHistory = await mealHistory.find({ _id: { $in: inserted.map(doc => doc._id) } })
            .populate({
                path: 'record.userId',
                model: userModel
            });
        return Response.json(populateHistory);
    } catch (error) {
        return Response.json({ error: error })
    }
}
export { GET, POST }