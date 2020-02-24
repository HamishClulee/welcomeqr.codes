export interface QUser {
    email: string | null,
    id: string | null,
    authed: boolean,
    subdom: string | null,
}
export interface LoginPayload {
    email: string,
    use: string, 
}
export interface SignUpPayload {
    email: string,
    use: string,
    cuse: string,
}