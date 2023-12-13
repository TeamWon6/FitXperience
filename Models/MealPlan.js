import mongoose from "mongoose";

const mealPlanSchema = new mongoose.Schema({
    user: mongoose.Schema.Types.ObjectId,
    name: {type: String, default: 'Un named'},
})

export default mongoose.models.MealPlan || mongoose.model('MealPlan', mealPlanSchema)
