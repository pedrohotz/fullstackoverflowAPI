import express from 'express';
import cors from 'cors';
import * as questionsController from './controllers/questionsController';
import * as userController from './controllers/userController';
import authorization from './middlewares/authorization';
const app = express();
app.use(cors());
app.use(express.json());

app.post('/questions', questionsController.create);
app.post('/questions/:id',authorization,questionsController.answerQuestion);
app.post('/users', userController.create);

app.get('/questions', questionsController.getUnansweredQuestions);
app.get('/questions/:id',questionsController.getQuestionById);

export default app;