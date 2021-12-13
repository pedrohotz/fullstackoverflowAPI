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

interface UnansweredQuestionsBody {
  id: number;
  question: string;
  student: string;
  class: string;
  submitedAt: string;
}

interface UnansweredQuestionBodyById {
  question: string;
  student: string;
  class: string;
  tags: string;
  answered: boolean;
  submitedAt: string;
}

interface AnsweredQuestionBodyById extends UnansweredQuestionBodyById{
  answeredAt: string;
  answeredBy: string;
  answer: string;
}

  export {
      QuestionBody,
      QuestionBodyDB,
      AnswerQuestionBody,
      UnansweredQuestionsBody,
      UnansweredQuestionBodyById,
      AnsweredQuestionBodyById,
  }