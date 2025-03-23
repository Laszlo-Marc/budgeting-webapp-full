/* eslint-disable @typescript-eslint/no-unused-vars */
import {faker} from '@faker-js/faker';
import {Category, Expense} from './models/expense';
const testExpense1 = new Expense(
    1,
    Category.FOOD,

    20,
    new Date(),
    'Lunch',
    'McDonalds',
    'Cash',
);
const testExpense2 = new Expense(
    2,
    Category.TRANSPORTATION,

    10,
    new Date(),
    'Bus fare',
    'McDonalds',
    'Cash',
);
const testExpense3 = new Expense(
    3,
    Category.ENTERTAIMENT,

    100,
    new Date(),
    'Concert',
    'McDonalds',
    'Cash',
);
const testExpense4 = new Expense(
    4,
    Category.FOOD,

    30,
    new Date(),
    'Dinner',
    'McDonalds',
    'Cash',
);
const testExpense5 = new Expense(
    5,
    Category.TRANSPORTATION,

    10,
    new Date(),
    'Taxi fare',
    'McDonalds',
    'Cash',
);
const testExpense6 = new Expense(
    6,
    Category.ENTERTAIMENT,

    100,
    new Date(),
    'Movie',
    'McDonalds',
    'Cash',
);
const testExpense7 = new Expense(
    7,
    Category.FOOD,

    20,
    new Date(),
    'Lunch',
    'McDonalds',
    'Cash',
);
const testExpense8 = new Expense(
    8,
    Category.FOOD,

    5,
    new Date(),
    'Coffee',
    'Starbucks',
    'Credit Card',
);
const testExpense9 = new Expense(
    9,
    Category.FOOD,

    50,
    new Date(),
    'Groceries',
    'Walmart',
    'Debit Card',
);
const testExpense10 = new Expense(
    10,
    Category.HEALTH,

    30,
    new Date(),
    'Gym Membership',
    'Fitness Center',
    'Credit Card',
);
const testExpense11 = new Expense(
    11,
    Category.FOOD,

    50,
    new Date(),
    'Shopping',
    'Mall',
    'Credit Card',
);
const testExpense12 = new Expense(
    12,
    Category.SERVICES,

    40,
    new Date(),
    'Gas',
    'Gas Station',
    'Cash',
);
const testExpense13 = new Expense(
    13,
    Category.SERVICES,
    60,
    new Date(),
    'Phone Bill',
    'Telecom Company',
    'Debit Card',
);

// export const expenses: Expense[] = [
//     testExpense1,
//     testExpense2,
//     testExpense3,
//     testExpense4,
//     testExpense5,
//     testExpense6,
//     testExpense7,
//     testExpense8,
//     testExpense9,
//     testExpense10,
//     testExpense11,
//     testExpense12,
//     testExpense13,
// ];
const generateExpenses = () => {
    const expenses: Expense[] = [];
    const categories = Object.values(Category); // Get an array of enum values

    for (let i = 1; i <= 100; i++) {
        const randomCategoryIndex = Math.floor(
            Math.random() * categories.length,
        );
        const randomCategory = categories[randomCategoryIndex];

        const expense = new Expense(
            i,
            randomCategory,
            faker.number.int(300),
            faker.date.past(),
            faker.finance.transactionDescription(),
            faker.company.name(),
            faker.finance.accountName(),
        );

        expenses.push(expense);
    }

    return expenses;
};
export const expenses: Expense[] = generateExpenses();
