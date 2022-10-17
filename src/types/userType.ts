export default interface IUser{
    id?: any | null,
    name?: string | null,
    login?: string,
    password?: string,
    type: string
    token: string
}