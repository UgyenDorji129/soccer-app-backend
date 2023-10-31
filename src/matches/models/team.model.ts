import * as mongoose from 'mongoose';

export const TeamSchema = new mongoose.Schema(
    {
        name: {type: String, index:{required: true}},
        logo:{type:String, index:{required:true}},
        team:{type:String, index:{required:true}},
    }
)

export const team = mongoose.model("team", TeamSchema)