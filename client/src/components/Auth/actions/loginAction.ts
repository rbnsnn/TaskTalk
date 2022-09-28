import { createAsyncThunk } from '@reduxjs/toolkit'
import { UserAuth } from '../../../types/user-auth.type'
import axios from 'axios'


export const authLogin = createAsyncThunk(
    'auth/login',
    async ({ username, password }: UserAuth, { rejectWithValue }) => {
        const URL: string = `${(process.env.REACT_APP_API_URL as string)}/auth/login`
        try {
            const { data } = await axios.post<object>(
                URL,
                { username, password },
                {
                    headers: {
                        Accept: 'application/json'
                    }
                }
            )
            return data
        } catch (error: any) {
            if (error.response.data) {
                return rejectWithValue(error.response.data.message)
            } else {
                return rejectWithValue(error.message)
            }
        }

    }
)