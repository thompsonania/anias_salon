import express from 'express';
import { createSrvc_employee, deleteSrvc_employee, getAllSrvc_employees, getAllSrvc_employeesById, 
    getSingleSrvc_employee, updateSrvc_employee } from '../controller/srvc_employeeController.js';


export const srvc_employeeRouter = express.Router();

srvc_employeeRouter.post('/create-srvc_employee', createSrvc_employee);
srvc_employeeRouter.get('/all-srvc_employees', getAllSrvc_employees);
srvc_employeeRouter.get('/all-srvc-employees/:id', getAllSrvc_employeesById);
srvc_employeeRouter.get('/single-srvc_employee/:id', getSingleSrvc_employee);
srvc_employeeRouter.patch('/update-srvc_employee/:id', updateSrvc_employee);
srvc_employeeRouter.delete('/delete-srvc_employee/:id', deleteSrvc_employee);

