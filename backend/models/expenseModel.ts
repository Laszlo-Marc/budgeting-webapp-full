/* eslint-disable @typescript-eslint/no-var-requires */
import mongoose, {Document} from 'mongoose';

const AutoIncrement = require('mongoose-sequence')(mongoose);
export interface IExpense extends Document {
    eid: number;
    category: Category;
    amount: number;
    date: string;
    description: string;
    receiver: string;
    account: string;
    userid: number;
}
export enum Category {
    FOOD = 'Food',
    TRANSPORTATION = 'Transportation',
    ENTERTAIMENT = 'Entertainment',
    SERVICES = 'Services',
    HEALTH = 'Health',
    OTHER = 'Other',
}

const ExpenseSchema = new mongoose.Schema({
    category: {type: String, enum: Object.values(Category)},
    amount: {type: Number, required: true},
    date: {type: String, required: true},
    description: {type: String, required: true, maxlength: 40000},
    receiver: {type: String, required: true},
    account: {type: String, required: true},
    userid: {type: Number, required: true},
});
ExpenseSchema.plugin(AutoIncrement, {inc_field: 'eid'});
export const ExpenseModel = mongoose.model<IExpense>('expenses', ExpenseSchema);
