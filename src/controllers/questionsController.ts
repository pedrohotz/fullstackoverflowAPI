import { Response, Request } from "express";
import { QuestionBody } from "../interfaces/questionsIntefaces";
import { questionSchemma } from '../schemmas/questionsSchemmas';
import * as questionsServices from '../services/questionsService';

async function create(req: Request, res: Response): Promise<Response<any,Record<string,any>>>{
    const questionBody : QuestionBody = req.body;
    try {
        const { error } = questionSchemma.validate(questionBody);
        if(error)  return res.sendStatus(400).send("Invalid Body");
        const result = await questionsServices.create(questionBody);
        return res.status(201).send({
            id: result
        })
    } catch (error) {
        return res.sendStatus(500);
    }
}

export {
    create,
}