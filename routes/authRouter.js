import express from 'express';
import { createAdminUser, getThisUser, loginUser, protect, registerUser} from '../controller/authController.js';



export const authRouter = express.Router();

authRouter.post('/login', loginUser);
authRouter.post('/register', registerUser);

authRouter.post('/create-user', createAdminUser);
authRouter.use(protect)
authRouter.get('/my-profile', getThisUser);

