import mongoose from "mongoose";

const healthDataSchema = new mongoose.Schema({

    weight: Number,
    height: Number,
    age: Number,
    gender: String,
    date: {type: date, default: new Date()},
    user: mongoose.Schema.Types.ObjectId,

})

export default mongoose.models.HealthData || mongoose.model('HealthData', healthDataSchema)
