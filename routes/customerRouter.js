import express from 'express';
import { createCustomer, deleteCustomer, getAllCustomers, getSingleCustomer, updateCustomer } from '../controller/customerController.js';



export const customerRouter = express.Router();

customerRouter.post('/create-customer', createCustomer);
customerRouter.get('/all-customers', getAllCustomers);
customerRouter.get('/single-customer/:id', getSingleCustomer);
customerRouter.patch('/update-customer/:id', updateCustomer);
customerRouter.delete('/delete-customer/:id', deleteCustomer);