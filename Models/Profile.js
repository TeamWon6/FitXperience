import mongoose from "mongoose";

const ProfileSchema = new mongoose.Schema({

    weight: Number,
    height: Number,
    age: Number,
    gender: String,
    user: mongoose.Schema.Types.ObjectId

})

export default mongoose.models.Profile || mongoose.model('Profile', ProfileSchema)
