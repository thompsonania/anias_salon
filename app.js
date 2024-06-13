import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import dotenv from 'dotenv';
import { employeeRouter } from './routes/employeeRouter.js';
import { customerRouter } from './routes/customerRouter.js';
import { serviceRouter } from './routes/serviceRouter.js';
import { srvc_employeeRouter } from './routes/srvc_employeeRouter.js';
import { authRouter } from './routes/authRouter.js';
import { appointmentRouter } from './routes/appointmentRouter.js';



const app = express();

dotenv.config({path: './config.env'});

app.use(morgan('dev'));

//CORS Configuration
app.options('*', cors(['http://localhost:4200']));
app.use(cors(['http://localhost:4200']));

//Body Parsing Configuration
app.use(express.json({limit: '1kb'}));
app.use(express.urlencoded({extended: true, limit: '1kb'}));

//Routes
app.use('/api/v1/employee', employeeRouter);
app.use('/api/v1/customer', customerRouter);
app.use('/api/v1/service', serviceRouter);
app.use('/api/v1/srvc_employee', srvc_employeeRouter);
app.use('/api/v1/auth', authRouter);
app.use('/api/v1/appointment', appointmentRouter);


const port = process.env.PORT || 3000;
const server = app.listen(port, () => console.log(`listening on http://localhost:${port}`));