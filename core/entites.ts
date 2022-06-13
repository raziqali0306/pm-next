export interface CredItemType {
    _id: string,
    name: string,
    username: string,
    password: string,
    passwordHistory?: [string],
    url?: string,
}

export interface User {
    name: string,
    username: string,
    email: string,
    password: string,
    credentials?: [CredItem],
}