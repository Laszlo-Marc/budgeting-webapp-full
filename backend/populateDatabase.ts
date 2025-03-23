import {UserRepository} from './repositories/userRepository';

export async function populateDatabase(userReposiory: UserRepository) {
    //expenseRepository: ExpenseRepository,
    for (let i = 1; i <= 28; i++) {
        const user = await userReposiory.createUser();
        userReposiory.addUser(user);
    }

    // for (let j = 1; j <= 100; j++) {
    //     const categories = Object.values(Category);
    //     for (let i = 0; i < 1000; i++) {
    //         const randomCategory =
    //             categories[Math.floor(Math.random() * categories.length)];
    //         const amount = faker.number.int({min: 1, max: 1000});
    //         const date = faker.date.past();
    //         const formattedDate = format(date, 'yyyy-MM-dd');
    //         const description = faker.finance.transactionDescription();
    //         const receiver = faker.company.name();
    //         const account = faker.finance.accountName();

    //         const expenseInfo = {
    //             category: randomCategory,
    //             amount: amount,
    //             date: formattedDate,
    //             description: description,
    //             receiver: receiver,
    //             account: account,
    //             userid: j,
    //         };

    //         const expense = new ExpenseModel(expenseInfo);
    //         await expense.save();
    //     }
    //     console.log('Expenses created for user: ', j);
    // }
    // console.log('Database populated');
}
