/* eslint-disable @typescript-eslint/no-explicit-any */
import {Request, Response} from 'express';
import request from 'supertest';
import app from '../app';
import * as expenseController from '../controller/expenseController';
import {Expense} from '../models/expense';
import {expenses} from '../stores/expenseStore';
// Mocking Express response object
const mockResponse = () => {
    const res: Partial<Response> = {};
    res.status = jest.fn().mockReturnValue(res);
    res.json = jest.fn().mockReturnValue(res);
    res.send = jest.fn().mockReturnValue(res);
    return res as Response;
};

describe('expenseController', () => {
    // Mocking Express request object for testing
    const req: Partial<Request> = {};

    describe('getExpenses', () => {
        it('should return expenses', () => {
            const res = mockResponse();
            expenseController.getExpenses(req as Request, res);
            expect(res.json).toHaveBeenCalledWith(expenses);
        });
    });

    describe('getExpenseBYID', () => {
        it('should return the expense for a valid ID', () => {
            const res = mockResponse();
            req.params = {id: '1'};
            expenseController.getExpenseBYID(req as Request, res);
            expect(res.json).toHaveBeenCalledWith(expect.any(Expense));
        });

        it('should return 404 for an invalid ID', () => {
            const res = mockResponse();
            req.params = {id: '999'};
            expenseController.getExpenseBYID(req as Request, res);
            expect(res.status).toHaveBeenCalledWith(404);
            expect(res.send).toHaveBeenCalledWith('Expense not found');
        });
    });

    // Test for adding an expense
    it('should add a new expense', async () => {
        const newExpense = {
            category: 'Food',
            amount: 50,
            date: new Date(),
            description: 'Groceries',
            receiver: 'Grocery store',
            account: 'Bank',
        };

        const response = await request(app)
            .post('/api/expenses')
            .send(newExpense)
            .expect(201);

        expect(response.body).toHaveProperty('id');
        expect(response.body.category).toBe(newExpense.category);
        // Add more assertions as needed
    });

    // Test for deleting an expense
    it('should delete an existing expense', async () => {
        const expenseIdToDelete = 1; // Assuming the first expense in the store is deleted

        const response = await request(app)
            .delete(`/api/expenses/${expenseIdToDelete}`)
            .expect(200);

        expect(response.text).toBe('Expense deleted successfully');
        expect(expenses).not.toContainEqual(
            expect.objectContaining({id: expenseIdToDelete}),
        );
        // Add more assertions as needed
    });
    describe('addExpense', () => {
        it('should return 400 for adding an invalid expense', async () => {
            const invalidExpense = {
                category: 'Food',
                amount: '50',
                date: new Date(),
                description: 'Groceries',
                receiver: 'Grocery store',
            };

            const response = await request(app)
                .post('/api/expenses')
                .send(invalidExpense)
                .expect(400);

            expect(response.body).toEqual({message: 'Invalid expense data'});
        });
    });

    describe('deleteExpense', () => {
        it('should return 404 for deleting an expense that does not exist', async () => {
            const nonexistentExpenseId = -6;

            const response = await request(app)
                .delete(`/api/expenses/${nonexistentExpenseId}`)
                .expect(404);
            console.log(response.body);
            expect(response.body).toEqual({});
        });
    });
});
