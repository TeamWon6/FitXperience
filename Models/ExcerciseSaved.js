import mongoose from "mongoose";

const excerciseSavedSchema = new mongoose.Schema({

    user: mongoose.Schema.Types.ObjectId,
    excerciseId: String

})

export default mongoose.models.ExcerciseSaved || mongoose.model('ExcerciseSaved', excerciseSavedSchema)
