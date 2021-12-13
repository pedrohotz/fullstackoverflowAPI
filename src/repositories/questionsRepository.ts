import connection from "../connection/database";
import { AnswerQuestionBody, QuestionBodyDB } from "../interfaces/questionsIntefaces";
import { UnansweredQuestionsBody } from "../interfaces/userInterfaces";


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

async function getUnansweredQuestions() : Promise <UnansweredQuestionsBody[]> {
    const result = await connection.query(`SELECT questions.id, questions.question, users.name AS student, class.classname, questions."submitedAt" FROM questions JOIN users ON questions.student = users.id JOIN class ON users.class_id = class.id WHERE answered = false`);
    if(result.rowCount === 0){
        return null
    }
    return result.rows;
}

export {
    insertQuestion,
    getUserByName,
    checkForExistentQuestion,
    answer,
    getUnansweredQuestions,
}