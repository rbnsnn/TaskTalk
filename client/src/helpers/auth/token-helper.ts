import jwtDecode from "jwt-decode"

interface AuthToken {
    exp: number
}

export const storeToken = (authToken: string, refreshToken: string): string => {
    const decoded = jwtDecode<AuthToken>(authToken)
    const expiration = (decoded.exp * 1000).toString()

    localStorage.setItem('authToken', authToken)
    localStorage.setItem('expiration', expiration)
    localStorage.setItem('refreshToken', refreshToken)

    return expiration
}

export const removeToken = (): void => {
    localStorage.removeItem('authToken')
    localStorage.removeItem('expiration')
    localStorage.removeItem('refreshToken')
}

export const calculateRemainingTime = (expirationTime: string): number => {
    const currentTime = new Date().getTime()
    const remainingTime = parseInt(expirationTime) - currentTime

    return remainingTime
}

export const retrieveStoredToken = () => {
    const authToken = localStorage.getItem('authToken')
    const expiration = localStorage.getItem('expiration')
    const refreshToken = localStorage.getItem('refreshToken')

    const remainingTime = calculateRemainingTime(expiration!)
    if (!authToken || remainingTime <= 3600) {
        removeToken()
        return null
    }

    return {
        authToken,
        expiration: remainingTime,
        refreshToken
    }
}
