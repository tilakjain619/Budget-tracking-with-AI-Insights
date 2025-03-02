import mongoose from "mongoose";
import AIInsight from "./AIInsight";

const BudgetSchema = new mongoose.Schema({
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    category:{
        type: String,
        required: true
    },
    limit: Number,
    spent: {
        type: Number,
        default: 0
    },
    startDate: Date,
    endDate: Date
},
{
    timestamps: true
})

BudgetSchema.pre("remove", async function (next) {
    const budgetId = this.id;
    await AIInsight.deleteMany({budgetId});
    next();
})

export default mongoose.models.Budget || mongoose.model('Budget', BudgetSchema);