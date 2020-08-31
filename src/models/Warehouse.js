import mongoose from 'mongoose'

let WarehouseSchema = mongoose.Schema({
    Name: {
        type: String,
        required: true,
        unique: true
    },
    Location: String,
    Description: String
})
export default mongoose.model('Warehouse', WarehouseSchema)