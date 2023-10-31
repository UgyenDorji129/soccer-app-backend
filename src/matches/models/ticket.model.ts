import * as mongoose from 'mongoose';

export const TicketSchema = new mongoose.Schema(
    {
        userId:{type: mongoose.Schema.Types.ObjectId, ref: "User"},
        matchId:{type: mongoose.Schema.Types.ObjectId, ref: "Match"},
    }
)

export const ticket = mongoose.model("ticket", TicketSchema)