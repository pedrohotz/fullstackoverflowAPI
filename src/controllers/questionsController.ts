import { Response, Request } from "express";
import { QuestionBody } from "../interfaces/questionsIntefaces";
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

export {
    create,
}