import express from 'express';
import { createEmployee, deleteEmployee, getAllEmployees, getSingleEmployee, updateEmployee } from '../controller/employeeController.js';


export const employeeRouter = express.Router();

employeeRouter.post('/create-employee', createEmployee);
employeeRouter.get('/all-employees', getAllEmployees);
employeeRouter.get('/single-employee/:id', getSingleEmployee);
employeeRouter.patch('/update-employee/:id', updateEmployee);
employeeRouter.delete('/delete-employee/:id', deleteEmployee);