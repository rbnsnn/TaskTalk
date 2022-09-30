export interface UserData {
    companyId: string,
    companyName: string,
    userId: string
    username: string,
    email: string,
    roles: string[],
    firstName?: string,
    lastName?: string,
    phoneNumber?: string
    authToken?: string,
    refreshToken?: string
}