import { Response, Request } from "express";
import { QuestionBody } from "../interfaces/questionsInterfaces";
import { questionSchemma } from '../schemmas/questionsSchemmas';
import * as questionsServices from '../services/questionsService';

async function create(req: Request, res: Response): Promise<Response<any,Record<string,any>>>{
    const questionBody : QuestionBody = req.body;
    try {
        const { error } = questionSchemma.validate(questionBody);
        if(error)  return res.status(400).send("Invalid Body");
        const result = await questionsServices.create(questionBody);
        if(!result) return res.status(404).send("User not Found");
        return res.status(201).send({
            id: result
        })
    } catch (error) {
        return res.status(500);
    }
}

async function answerQuestion(req: Request, res: Response): Promise<Response<any,Record<string,any>>>{
    const { userId } = res.locals;
    const questionId = Number(req.params.id);
    const { answer }  = req.body;
    try {
       const result = await questionsServices.answerQuestion({userId,questionId,answer})
       if(!result) return res.status(400);
       return res.sendStatus(200);
    } catch (error) {
        return res.status(500);
    }

}


async function getUnansweredQuestions(req: Request, res: Response) : Promise<Response<any,Record<string,any>>>{
    try {
        const result = await questionsServices.getUnansweredQuestions();
        if(!result) return res.sendStatus(404);
        return res.status(200).send(result);
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
}

async function getQuestionById(req: Request, res: Response) : Promise<Response<any,Record<string,any>>>{
    const questionId = Number(req.params.id);
    try {
        const result = await questionsServices.getQuestionsById(questionId);
        if(!result) return res.sendStatus(400);
        return res.status(200).send(result)
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }

}




export {
    create,
    answerQuestion,
    getUnansweredQuestions,
    getQuestionById,
}