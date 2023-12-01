import mongoose from "mongoose";

const mealPlanItemSchema = new mongoose.Schema({
    user: mongoose.Schema.Types.ObjectId,
    mealPlan : mongoose.Schema.Types.ObjectId,
    foodId: String

})

export default mongoose.models.MealPlanItem || mongoose.model('MealPlanItem', mealPlanItemSchema)
