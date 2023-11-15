import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({

    id: String,
    name: String,
    email: String,
    pic: String,

})

export default mongoose.models.User || mongoose.model('User', UserSchema)
