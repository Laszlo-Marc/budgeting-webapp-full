/* eslint-disable @typescript-eslint/no-explicit-any */
import {Request, Response} from 'express';
import {ExpenseModel} from '../models/expenseModel';
import {UserModel} from '../models/userModel';
import {UserRepository} from '../repositories/userRepository';

export const users = new UserRepository();

export const getUsers = async (req: Request, res: Response) => {
    try {
        const page = parseInt(req.query.page as string);
        const allUsers = await users.getUsers(page);
        res.json(allUsers);
    } catch (error) {
        console.error('Error getting users: ', error);
        return res.status(400).json({message: 'Error getting users'});
    }
};

export const getUserById = async (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    const user = await UserModel.findById({id: id});
    if (user) {
        res.status(200).json(user);
    } else {
        res.status(404).send('User not found');
    }
};

export const addUser = async (req: Request, res: Response) => {
    try {
        const {name, age, email, password, expenses} = req.body;
        if (
            !name ||
            !age ||
            !email ||
            !password ||
            isNaN(age) ||
            typeof email !== 'string' ||
            typeof password !== 'string'
        ) {
            return res.status(400).json({message: 'Invalid user data'});
        } else {
            const newUser = {
                name: name,
                age: age,
                email: email,
                password: password,
                expenses: expenses,
            };

            users.addUser(newUser);
            return res.status(201).json(newUser);
        }
    } catch (error) {
        console.error('Error adding user: ', error);
        return res.status(400).json({message: 'Error adding user'});
    }
};

export const updateUser = async (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    const user = UserModel.findOne({uid: id});
    const {name, age, email, password} = req.body;
    if (
        !name ||
        !age ||
        !email ||
        !password ||
        isNaN(age) ||
        typeof email !== 'string' ||
        typeof password !== 'string'
    ) {
        return res.status(400).json({message: 'Invalid user data'});
    } else {
        if (await user) {
            const updatedUser = await UserModel.updateOne(
                {uid: id},
                {name: name, age: age, email: email, password: password},
            );
            res.status(200).json(updatedUser);
        }
    }
};
export const deleteUser = async (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    const user = await UserModel.findOne({uid: id});
    if (user) {
        await ExpenseModel.deleteMany({userid: id});
        await user.deleteOne();
        res.status(200).send('User deleted');
    } else {
        res.status(404).send('User not found');
    }
};
