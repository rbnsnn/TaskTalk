import jwtDecode from "jwt-decode"

interface AuthToken {
    exp: number
}

export const storeToken = (authToken: string): string => {
    const decoded = jwtDecode<AuthToken>(authToken)
    const expiration = (decoded.exp * 1000).toString()

    localStorage.setItem('authToken', authToken)
    localStorage.setItem('expiration', expiration)

    return expiration
}

export const removeToken = (): void => {
    localStorage.removeItem('authToken')
    localStorage.removeItem('expiration')
}

export const calculateRemainingTime = (expirationTime: string): number => {
    const currentTime = new Date().getTime()
    const remainingTime = parseInt(expirationTime) - currentTime

    return remainingTime
}

export const retrieveStoredToken = () => {
    const storedToken = localStorage.getItem('authToken');
    const expirationTime = localStorage.getItem('expiration');

    const remainingTime = calculateRemainingTime(expirationTime!);
    if (!storedToken || remainingTime <= 3600) {
        removeToken()
        return null;
    }

    return {
        authToken: storedToken,
        expiration: remainingTime,
    };
};
