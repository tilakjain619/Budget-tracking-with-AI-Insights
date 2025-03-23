import mongoose from "mongoose";
import Expense from "./Expense";
import Budget from "./Budget";
import AIInsight from "./AIInsight";

// Define the User Schema
const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"], // Custom error message
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      match: [
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        "Please enter a valid email address",
      ], // Improved regex for email validation
      lowercase: true, // Automatically converts email to lowercase
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: [8, "Password must be at least 8 characters long"], // Minimum password length
    },
    currency: {
      type: String,
      maxlength: 3, // Allows for currency codes like "USD" or "INR"
      default: "₹",
    },
    monthly_income: {
      type: Number,
      default: 0,
      min: [0, "Monthly income cannot be negative"], // Validation for minimum value
    },
    savings_goal: {
      type: Number,
      default: 0,
      min: [0, "Saving Goal cannot be negative"], // Validation for minimum value
    },
  },
  {
    timestamps: true, // Automatically adds `createdAt` and `updatedAt` fields
  }
);

// Middleware to handle cascade delete
UserSchema.pre("remove", async function (next) {
  const userId = this._id;

  // Delete related collections
  try {
    await Expense.deleteMany({ userId });
    await Budget.deleteMany({ userId });
    await AIInsight.deleteMany({ userId });
    next();
  } catch (error) {
    console.error("Error during cascade delete:", error);
    next(error);
  }
});

// Compile the model or use the existing one
const User = mongoose.models.User || mongoose.model("User", UserSchema);

export default User;
