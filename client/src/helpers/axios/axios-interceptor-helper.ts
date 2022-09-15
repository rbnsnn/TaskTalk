import axios from "axios";
import { retrieveStoredTokens, storeTokens } from "../auth/token-helper";

const baseURL = (process.env.REACT_APP_API_URL as string)

const axiosInstance = axios.create({
    baseURL,
    headers: {
        "Content-Type": "application/json",
    },
});

const refreshTokens = (refreshToken: string) => {
    return axiosInstance.post('/auth/refresh', {
        "refreshToken": refreshToken
    })
}

axiosInstance.interceptors.request.use(
    async (config) => {
        const { authToken, refreshToken } = await retrieveStoredTokens()
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

axiosInstance.interceptors.response.use(
    (response) => {
        return response;
    },
    async (error) => {
        const originalConfig = error.config;

        if (error.response.status === 401 && !originalConfig._retry) {
            originalConfig._retry = true;
            const { authToken, refreshToken } = await retrieveStoredTokens()
            console.log(refreshToken)
            const newTokens = await refreshTokens(refreshToken!)
            await storeTokens(newTokens)
            return axiosInstance(originalConfig);
        }

        //     if (error.response.status === 403) {
        //         return Promise.reject(error.response.data);
        //     }


        return Promise.reject(error);
    }
);

export { axiosInstance }