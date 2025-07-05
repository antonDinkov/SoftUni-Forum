export interface User {
    _id: string,
    themes: string[],
    posts: string[],
    tel: string,
    email: string,
    username: string,
    password: string,
    created_At: string,
    updatedAt: string,
    __v?: number
}