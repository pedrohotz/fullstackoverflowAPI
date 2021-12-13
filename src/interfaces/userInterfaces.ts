interface UserBody {
    name: string;
    classname: string;
}

interface UserBodyDB{
    name: string;
    classID: number;
    token: string;
}

export {
    UserBody,
    UserBodyDB,
}