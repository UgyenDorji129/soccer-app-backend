import * as mongoose from 'mongoose';

export const PlayerSchema = new mongoose.Schema(
    {
        name: {type: String, index:{required: true}},
        tshirt: {type: Number, index:{required: true}},
        teamId:{type: mongoose.Schema.Types.ObjectId, ref: "Team"}
    }
)

export const player = mongoose.model("player", PlayerSchema)