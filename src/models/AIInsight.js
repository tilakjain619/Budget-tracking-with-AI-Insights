import mongoose from "mongoose";

const AIInsightSchema = new mongoose.Schema({
    userId:{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },
    day: { type: Number, required: true },
    month: { type: Number, required: true },
    year: { type: Number, required: true },
    spendingPattern: { type: String, required: true },
    unusualSpending: { type: String, required: true },
    savingTip: { type: String, required: true },
    predictedExpenseNextMonth: { type: Number, required: true },
}, { timestamps: true });

export default mongoose.models.AIInsight || mongoose.model('AIInsight', AIInsightSchema);