import mongoose from "mongoose";

const mealPlanItemSchema = new mongoose.Schema({
    user: mongoose.Schema.Types.ObjectId,
})

export default mongoose.models.MealPlanItem || mongoose.model('MealPlanItem', mealPlanItemSchema)
