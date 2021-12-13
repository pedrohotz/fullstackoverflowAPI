import { AnswerQuestionBody, QuestionBody } from "../interfaces/questionsIntefaces";
import * as questionsRepository from '../repositories/questionsRepository';
import * as userRepository from '../repositories/userRepository';
async function create(questionBody: QuestionBody): Promise<number>{
    const {
        question,
        student,
        classname,
        tags,
    } = questionBody;
    const userId = await questionsRepository.getUserByName(student);
    if(!userId) return null;
    const classID = await userRepository.getClassId(classname);
    if(!classID) return null;
    const result = await questionsRepository.insertQuestion({
        question,
        userId,
        tags
    })
    return result;
}


async function answerQuestion(answerBody:AnswerQuestionBody) : Promise <boolean> {
    const isValidQuestion = await questionsRepository.checkForExistentQuestion(answerBody.questionId);
    if(!isValidQuestion) return null;
    const result = await questionsRepository.answer(answerBody)
    return result;
}


export { 
 create,
 answerQuestion,
}