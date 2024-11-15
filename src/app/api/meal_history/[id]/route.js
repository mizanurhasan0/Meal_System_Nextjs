import mealHistory from "@/models/meals_history";
import { ObjectId } from "mongodb"

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
        const d = await mealHistory.findOne({ mealId: id }).sort({ createdAt: -1 });
        const getlastObject = { ...JSON.parse(JSON.stringify(d)) };
        const startDate = new Date(getlastObject.date);
        startDate.setDate(startDate.getDate() + 1);
        const today = new Date();
        let objData = [];
        for (let d = new Date(startDate); d < today; d.setDate(d.getDate() + 1)) {
            let { mealId, record } = getlastObject;
            let dt = ({ date: new Date(d).toLocaleDateString(), mealId, record });
            objData.push(dt);
        }

        const mdl = await mealHistory.insertMany(objData);
        console.log(mdl);
        // if (!valid) return Response.json({ error: "Field error" });
        // const mdl = await mealHistory.create({ date: data.date, record: obj, mealId: param });
        return Response.json({ data: "mdl" });
    } catch (error) {
        return Response.json({ message: error + "Something went wrong!!" })
    }
}
export { GET, POST }