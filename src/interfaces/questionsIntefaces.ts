interface QuestionBody {
    question: string;
    student: string;
    classname: string;
    tags: string;
  }
  
interface QuestionBodyDB {
    question: string;
    studentId: number;
    tags: string;
}

  export {
      QuestionBody,
      QuestionBodyDB,
  }