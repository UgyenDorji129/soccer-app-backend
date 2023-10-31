import * as mongoose from 'mongoose';

export const MatchSchema = new mongoose.Schema(
    {
        category: {type: String, index:{required: true}},
        league: {type: String, index:{required: true}},
        referee:{type: String, index:{required: true}},
        linesMenOne:{type: String, index:{required: true}},
        linesMenTwo:{type: String, index:{required: true}},
        teamOneId:{type: mongoose.Schema.Types.ObjectId, ref: "Team"},
        teamTwoId:{type: mongoose.Schema.Types.ObjectId, ref: "Team"},
    }
)

export const match = mongoose.model("match", MatchSchema)