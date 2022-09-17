export interface UserData {
    id: string
    name: string
    email: string
    username: string
    dp: string
}

export interface User {
    data: UserData
    logged: boolean
    login: () => void
    logout: () => void
}