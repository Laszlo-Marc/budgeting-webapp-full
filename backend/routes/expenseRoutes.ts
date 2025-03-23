import express from 'express';
import {
    addExpense,
    checkInternet,
    deleteExpense,
    getExpenseBYID,
    getExpenses,
    updateExpense,
} from '../controller/expenseController';
import {
    addUser,
    deleteUser,
    getUserById,
    getUsers,
    updateUser,
} from '../controller/userController';

const router = express.Router();
router.get('/expenses', getExpenses);
router.get('/expenses/:id', getExpenseBYID);
router.post('/expenses', addExpense);
router.put('/expenses/:id', updateExpense);
router.delete('/expenses/:id', deleteExpense);
router.get('/check-internet', checkInternet);
router.get('/users', getUsers);
router.get('/users/:id', getUserById);
router.post('/users', addUser);
router.put('/users/:id', updateUser);
router.delete('/users/:id', deleteUser);

export default router;
