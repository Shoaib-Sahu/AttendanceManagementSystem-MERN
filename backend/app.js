import express from 'express';
import authRoute from './routes/authRoute.js';
import userRoute from './routes/studentRoute.js';
import leaveRoute from './routes/leaveReqRoute.js';
import cors from 'cors'
const app = express();

// Middlewares
app.use(express.json());
app.use(cors());

// Avaliable Routes
app.use("/auth", authRoute);
app.use("/student", userRoute);
app.use("/leave", leaveRoute)

export default app;