import { User } from "./user.model";

export interface SidePost {
    _id: string,
    likes: string[],
    text: string,
    userId: User,
    themeID: string,
    created_at: string,
    updatedAt: string,
    __v?: number
}