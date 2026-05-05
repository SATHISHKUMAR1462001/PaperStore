import express from 'express';
import product from './routes/productRoutes.js';
import user from './routes/userRoutes.js';
import order from './routes/orderRoutes.js';
import cookieParser from 'cookie-parser';
import errorhandler from './middleware/error.js';
import cors from 'cors';
const app = express();
app.use(express.json());
app.use(cookieParser());

app.use(cors({ origin: "http://localhost:5173",credentials:true}));
app.use(cors());

app.use('/api/v1', product);
app.use('/api/v1', user);
app.use('/api/v1', order);


app.use(errorhandler);

export default app;

