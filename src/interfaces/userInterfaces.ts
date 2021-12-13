interface UserBody {
    name: string;
    classname: string;
}

interface UserBodyDB{
    name: string;
    classID: number;
    token: string;
}


interface UnansweredQuestionsBody {
    id: number;
    question: string;
    student: string;
    class: string;
    submitedAt: string;
  }

export {
    UserBody,
    UserBodyDB,
    UnansweredQuestionsBody,
}