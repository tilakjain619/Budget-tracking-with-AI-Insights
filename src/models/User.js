import mongoose from "mongoose";
import Expense from "./Expense";
import Budget from "./Budget";
import AIInsight from "./AIInsight";

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        match: [/.+\@.+\..+/, 'Please enter a valid email address']
    },
    password: {
        type: String,
        required: true,
    },
    currency: {
        type: String,
        maxLength: 1,
        default: "₹"
    },
    monthly_income: {
        type: Number,
        default: 0
    }
},
    {
        timestamps: true
    }
)
// 🛑 Cascade delete when a user is removed
UserSchema.pre("remove", async function (next) {
    const userId = this._id;

    await Expense.deleteMany({ userId }); // Delete user's expenses
    await Budget.deleteMany({ userId }); // Delete user's budgets
    await AIInsight.deleteMany({ userId }); // Delete AI insights

    next();
});
export default mongoose.models.User || mongoose.model('User', UserSchema);