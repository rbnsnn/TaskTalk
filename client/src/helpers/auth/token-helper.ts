
export const storeTokens = (tokens: any): void => {
    localStorage.setItem('authToken', tokens.authToken)
    localStorage.setItem('refreshToken', tokens.refreshToken)
}

export const removeTokens = (): void => {
    localStorage.removeItem('authToken')
    localStorage.removeItem('refreshToken')
}

export const retrieveStoredTokens = () => {
    const authToken = localStorage.getItem('authToken')
    const refreshToken = localStorage.getItem('refreshToken')

    return {
        authToken,
        refreshToken
    }
}