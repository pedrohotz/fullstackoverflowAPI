interface QuestionBody {
    question: string;
    student: string;
    classname: string;
    tags: string;
  }
  
interface QuestionBodyDB {
    question: string;
    userId: number;
    tags: string;
}


interface AnswerQuestionBody {
  userId: number;
  questionId: number;
  answer: string;
}

  export {
      QuestionBody,
      QuestionBodyDB,
      AnswerQuestionBody
  }