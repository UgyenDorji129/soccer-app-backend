import * as mongoose from 'mongoose';

export const BettingSchema = new mongoose.Schema(
    {
        userId:{type: mongoose.Schema.Types.ObjectId, ref: "User"},
        matchId:{type: mongoose.Schema.Types.ObjectId, ref: "Match"},
        prediction:{type: String, index:{required:true}},
        amount:{type: String, index:{required:true}}
    }
)

export const betting = mongoose.model("betting", BettingSchema)