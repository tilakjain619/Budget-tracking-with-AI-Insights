import mongoose from "mongoose";

const ExpenseSchema = new mongoose.Schema({
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    amount:{
        type: Number,
        required: true
    },
    category:{
        type: String,
        required: true
    },
    description:{
        type: String
    },
    date:{
        type: Date
    }
},
{
    timestamps: true
});

export default mongoose.models.Expense || mongoose.model('Expense', ExpenseSchema);