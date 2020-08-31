import mongoose from "mongoose";

let PeopleSchema = new mongoose.Schema({
    FirstName: String,
    LastName: String,
    Company: String,
    Location: String,
    Phone: String,
})
export default mongoose.model('People', PeopleSchema)