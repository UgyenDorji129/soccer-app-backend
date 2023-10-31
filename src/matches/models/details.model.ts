import * as mongoose from 'mongoose';

export const DetailSchema = new mongoose.Schema(
    {
        stadium: {type: String, index:{required: true}},
        time: {type: String, index:{required: true}},
        status:{type: Boolean, index:{required: true}},
        goal:{type:String, index:{required: true}},
        matchId:{type: mongoose.Schema.Types.ObjectId, ref: "Match"}
    }
)

export const details = mongoose.model("details", DetailSchema)