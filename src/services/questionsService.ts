import { QuestionBody } from "../interfaces/questionsIntefaces";
import * as questionsRepository from '../repositories/questionsRepository';
async function create(questionBody: QuestionBody): Promise<number>{
    const {
        question,
        student,
        classname,
        tags,
    } = questionBody;
    const studentId = await questionsRepository.getUserByName(student);
    if(!studentId) return null
    const result = await questionsRepository.insertQuestion({
        question,
        studentId,
        tags
    })
    return result;
}


export { 
 create,
}