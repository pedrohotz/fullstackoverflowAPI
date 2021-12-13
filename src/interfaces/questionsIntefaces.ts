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

  export {
      QuestionBody,
      QuestionBodyDB,
  }