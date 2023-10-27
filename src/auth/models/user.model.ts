import * as mongoose from 'mongoose';

export const UserSchema = new mongoose.Schema(
    {
        name: {type: String, index:{required: true}},
        email: {type: String, index:{required: true, unique: true}},
        password: {type: String, index:{required: true}},
    }
)

export const user = mongoose.model('user',UserSchema)