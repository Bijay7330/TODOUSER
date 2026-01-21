import express from 'express'
import { createTodo, delTodo, getTodo, updateTodo } from '../controller/todoController.js';
import { hasToken } from '../middleware/hasToken.js';


const todoRouter = express.Router();

todoRouter.post('/create',hasToken,createTodo);

todoRouter.get('/get',hasToken,getTodo);

todoRouter.delete('/delete/:id',hasToken,delTodo);

todoRouter.put('/update/:id',hasToken,updateTodo);

export default todoRouter;


