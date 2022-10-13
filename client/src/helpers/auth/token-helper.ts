export const storeTokens = (tokens: any): void => {
    localStorage.setItem('authToken', tokens.authToken)
    localStorage.setItem('refreshToken', tokens.refreshToken)
}

export const removeTokens = (): void => {
    localStorage.removeItem('authToken')
    localStorage.removeItem('refreshToken')
}

export const retrieveStoredTokens = async () => {
    const authToken = await localStorage.getItem('authToken')
    const refreshToken = await localStorage.getItem('refreshToken')

    return {
        authToken,
        refreshToken,
    }
}
