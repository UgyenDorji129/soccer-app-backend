import * as mongoose from 'mongoose';

export const TeamSchema = new mongoose.Schema(
    {
        name: {type: String, index:{required: true}},
        logo:{type:String, index:{required:true}},
        playerId:{type: mongoose.Schema.Types.ObjectId, ref: "Player"}
    }
)

export const user = mongoose.model("team", TeamSchema)