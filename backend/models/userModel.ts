/* eslint-disable @typescript-eslint/no-var-requires */
import mongoose, { Document, Schema } from 'mongoose';
const AutoIncrement = require('mongoose-sequence')(mongoose);

export interface IUser extends Document {
    uid: number;
    name: string;
    age: number;
    email: string;
    password: string;
}
const UserSchema: Schema = new Schema({
    name: {type: String, required: true},
    age: {type: Number, required: true},
    email: {type: String, required: true},
    password: {type: String, required: true},
});
UserSchema.plugin(AutoIncrement, {inc_field: 'uid'});
export const UserModel = mongoose.model<IUser>('users', UserSchema);
