import express from 'express';
import cors from 'cors';
import * as questionsController from './controllers/questionsController';
import * as userController from './controllers/userController';
const app = express();
app.use(cors());
app.use(express.json());

app.post('/question', questionsController.create);
app.post('/user', userController.create);

export default app;