import express from 'express';
import cors from 'cors';
import * as questionsController from './controllers/questionsController';
import * as userController from './controllers/userController';
import authorization from './middlewares/authorization';
const app = express();
app.use(cors());
app.use(express.json());

app.post('/question', questionsController.create);
app.post('/question/:id',authorization,questionsController.answerQuestion);
app.post('/user', userController.create);

export default app;