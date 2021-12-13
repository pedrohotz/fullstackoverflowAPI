import connection from "../connection/database";
import { AnswerQuestionBody, QuestionBodyDB } from "../interfaces/questionsIntefaces";


async function getUserByName(student: string): Promise <number>{
    const result = await connection.query("SELECT id FROM users WHERE name = $1",[student])
    if(result.rowCount === 0){
        return null;
    }
    return result.rows[0].id;
}


async function checkForExistentQuestion(questionId:number) : Promise  <boolean> {
    const result = await connection.query("SELECT * FROM questions WHERE id = $1", [questionId]);
    if(result.rowCount === 0){
        return null;
    }
    return true;
}


async function insertQuestion(questionBody: QuestionBodyDB) : Promise <number>{
    const {
        question,
        userId,
        tags,
    } = questionBody;
    const result = await connection.query("INSERT INTO questions (question,student,tags) VALUES ($1,$2,$3) RETURNING id", [question,userId,tags]);
    return result.rows[0].id;
}

async function answer(answerBody:AnswerQuestionBody) : Promise <boolean> {
    const {
        userId,
        questionId,
        answer 
    } = answerBody;
    await connection.query('UPDATE questions SET "answeredAt" = CURRENT_TIMESTAMP, "answeredBy" = $1, answer = $2, answered = true WHERE id = $3', [userId,answer,questionId]);
    return true;
}

export {
    insertQuestion,
    getUserByName,
    checkForExistentQuestion,
    answer,
}