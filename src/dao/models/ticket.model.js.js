import mongoose from "mongoose";

const ticketSchema = new mongoose.Schema({
    code: {
        type: String, 
        unique: true,
        required: true, 
        default: function() {
            return `TICKET-${Math.floor(Math.random() * 1000)}`
        }
    }, 
    purchase_datetime: {
        type: Date, 
        default: Date.now, 
        required: true
    }, 
    amount: {
        type: Number, 
        required: true
    },
    purchaser: {
        type: String, 
        required: true
    }
})

const TicketModel = mongoose.model("tickets", ticketSchema);

export default TicketModel;