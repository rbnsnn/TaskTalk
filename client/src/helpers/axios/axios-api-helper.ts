import axios from 'axios'
import { retrieveStoredTokens, storeTokens } from '../auth/token-helper'


const baseURL = (process.env.REACT_APP_API_URL as string)

const axiosApi = axios.create({
    baseURL,
    headers: {
        'Content-Type': 'application/json',
    },
});

const refreshTokens = (refreshToken: string) => {
    return axios.get(`${baseURL}/auth/refresh`, {
        headers: {
            'Authorization': `Bearer ${refreshToken}`,
            'Content-Type': 'application/json'
        },
    })
}

axiosApi.interceptors.request.use(
    async (config) => {
        const { authToken } = await retrieveStoredTokens()
        if (authToken) {
            config.headers = {
                'Authorization': `Bearer ${authToken}`,
                'Accept': 'application/json',
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        }

        return config
    },
    async (error) => {
        Promise.reject(error)
    }
)

axiosApi.interceptors.response.use(
    (response) => {
        return response;
    },
    async (error) => {
        const originalConfig = error.config;

        if (error.response.status === 401 && !originalConfig._retry) {
            originalConfig._retry = true;
            const { refreshToken } = await retrieveStoredTokens()

            if (refreshToken) {
                const newTokens = await refreshTokens(refreshToken)
                if (newTokens.data) {
                    await storeTokens(newTokens.data)
                }
            }
            return axiosApi(originalConfig);
        }

        if (error.response.status === 403) {
            return Promise.reject(error.response.data);
        }
        return Promise.reject(error);
    }
);

export { axiosApi }