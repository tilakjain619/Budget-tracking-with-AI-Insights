import mongoose from "mongoose";

const AIInsightSchema = new mongoose.Schema({
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    budgetId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Budget"
    },
    month: String,
    year: Number,
    spendingPattern: String,
    savingTip: String,
    predictedExpenseNextMonth: Number
},
{
    timestamps: true
})

export default mongoose.models.AIInsight || mongoose.model('AIInsight', AIInsightSchema);