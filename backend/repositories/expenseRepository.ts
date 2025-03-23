/* eslint-disable @typescript-eslint/no-explicit-any */
import {faker} from '@faker-js/faker';
import {format} from 'date-fns';
import {Category, ExpenseModel, IExpense} from '../models/expenseModel';
export class ExpenseRepository {
    public async getMoreExpenses(
        page: number,
        userid: number,
    ): Promise<IExpense[]> {
        try {
            const pageSize = 50;
            const skip = page * pageSize;
            const expenses = await ExpenseModel.find({userid: userid})
                .skip(skip)
                .limit(pageSize);
            return expenses;
        } catch (error) {
            console.log('Error getting expenses: ', error);
            return [];
        }
    }
    public async getExpenses(
        page: number,
        userid: number,
    ): Promise<IExpense[]> {
        try {
            const pageSize = 50;
            const skip = page * pageSize;

            const expenses = await ExpenseModel.find({userid: userid})
                .skip(skip)
                .limit(pageSize);

            return expenses;
        } catch (error) {
            console.log('Error getting expenses: ', error);
            return [];
        }
    }
    public async addExpense(expenseData: unknown): Promise<IExpense> {
        const expense = new ExpenseModel(expenseData);
        await expense.save();
        return expense;
    }
    public async createExpensesForUser(userId: number) {
        const categories = Object.values(Category);
        for (let i = 0; i < 10000; i++) {
            const randomCategory =
                categories[Math.floor(Math.random() * categories.length)];
            const amount = faker.number.int({min: 1, max: 1000});
            const date = faker.date.past();
            const formattedDate = format(date, 'yyyy-MM-dd');
            const description = faker.finance.transactionDescription();
            const receiver = faker.company.name();
            const account = faker.finance.accountName();

            const expenseInfo = {
                category: randomCategory,
                amount: amount,
                date: formattedDate,
                description: description,
                receiver: receiver,
                account: account,
                userid: userId,
            };

            const expense = new ExpenseModel(expenseInfo);
            await expense.save();
            return expense;
        }
    }
}
