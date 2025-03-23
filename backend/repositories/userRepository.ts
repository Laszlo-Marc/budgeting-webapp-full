import {faker} from '@faker-js/faker';
import {IUser, UserModel} from '../models/userModel';

export class UserRepository {
    public async addUser(userData: unknown): Promise<IUser> {
        const user = new UserModel(userData);
        await user.save(); // Use save method instead of insertOne
        return user;
    }

    public async createUser(): Promise<IUser> {
        const name = faker.person.fullName();
        const age = faker.number.int(80);
        const email = faker.internet.email();
        const password = faker.internet.password();

        const userData = {
            name: name,
            age: age,
            email: email,
            password: password,
        };
        const user = new UserModel(userData);
        await user.save(); // Use save method instead of insertOne
        return user;
    }

    public async getUsers(page: number): Promise<IUser[]> {
        try {
            const pageSize = 50;
            const skip = page * pageSize;
            const users = await UserModel.find().skip(skip).limit(pageSize);
            return users;
        } catch (error) {
            console.log('Error getting users: ', error);
            return [];
        }
    }
    public async getMoreUsers(page: number): Promise<IUser[]> {
        try {
            const numOfUsers = await UserModel.countDocuments();
            if (page == 0 && numOfUsers < 50) {
                return [];
            } else {
                const pageSize = 50;
                const skip = page * pageSize;
                const users = await UserModel.find().skip(skip).limit(pageSize);
                return users;
            }
        } catch (error) {
            console.log('Error getting users: ', error);
            return [];
        }
    }
}
