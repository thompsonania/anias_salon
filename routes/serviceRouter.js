import express from 'express';
import { createService, deleteService, getAllServices, getSingleService, updateService } from '../controller/serviceController.js';


export const serviceRouter = express.Router();

serviceRouter.post('/create-service', createService);
serviceRouter.get('/all-services', getAllServices);
serviceRouter.get('/single-service/:id', getSingleService);
serviceRouter.patch('/update-service/:id', updateService);
serviceRouter.delete('/delete-service/:id', deleteService);