import { AnswerQuestionBody, QuestionBody } from "../interfaces/questionsIntefaces";
import { UnansweredQuestionsBody } from "../interfaces/userInterfaces";
import * as questionsRepository from '../repositories/questionsRepository';
import * as userRepository from '../repositories/userRepository';


function formatTimeStamp(timestamp : string) : string{
    const date = new Date(timestamp);
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const hours = date.getHours();
    const minutes = ('0' + date.getMinutes()).slice(-2);
    const formated = `${year}-${month}-${day} ${hours}:${minutes}`;
    return formated;
}


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

async function getUnansweredQuestions() : Promise <UnansweredQuestionsBody[]> {
    let result = await questionsRepository.getUnansweredQuestions();
    if(!result) return null;
    result = result.map((question) => ({
        ...question,
        submitedAt: formatTimeStamp(question.submitedAt)
    }));
    return result;
}


export { 
 create,
 answerQuestion,
 getUnansweredQuestions,
}