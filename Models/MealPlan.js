import mongoose from "mongoose";

const mealPlanSchema = new mongoose.Schema({
    user: mongoose.Schema.Types.ObjectId,
})

export default mongoose.models.MealPlan || mongoose.model('MealPlan', mealPlanSchema)
