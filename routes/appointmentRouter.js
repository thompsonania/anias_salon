import express from 'express';
import { createAppointment, createCustomerAppointment, deleteAppointment, getAllAppointments, getAllCustomerAppointments,
     getAllEmployeeAppointments, getSingleAppointment, getSingleCustomerAppointment, updateAppointment} 
     from '../controller/appointmentController.js';

export const appointmentRouter = express.Router();

appointmentRouter.get('/all-appointments', getAllAppointments); //admin can view
appointmentRouter.get('/single-appointment/:id', getSingleAppointment); //admin can view

appointmentRouter.get('/employee-appointments/:employee_id', getAllEmployeeAppointments); //employee can view


appointmentRouter.post('/create-appointment', createAppointment); //admin can create 
appointmentRouter.patch('/update-appointment/:id', updateAppointment); //only admin can update
appointmentRouter.delete('/delete-appointment/:id', deleteAppointment); //only admin can delete

appointmentRouter.get('/all-customer-appointments/:customer_id', getAllCustomerAppointments); //admin can view
appointmentRouter.get('/single-customer-appointment/:id/customer/:customer_id', getSingleCustomerAppointment); //admin can view

appointmentRouter.post('/create-customer-appointment', createCustomerAppointment); //customer can create 


