import * as mongoose from 'mongoose';

export const PlayerSchema = new mongoose.Schema(
    {
        name: {type: String, index:{required: true}},
        tshirt: {type: Number, index:{required: true}}
    }
)

export const user = mongoose.model("player", PlayerSchema)