import { createAsyncThunk } from '@reduxjs/toolkit'
import { UserRegister } from '../../../types/user-register.type'
import axios from 'axios'

export const authRegister = createAsyncThunk(
    'auth/register',
    async (
        { companyName, username, email, password, colorMode }: UserRegister,
        { rejectWithValue }
    ) => {
        const URL: string = `${process.env.REACT_APP_API_URL as string}/auth/register`
        try {
            const { data } = await axios.post<boolean>(
                URL,
                { companyName, username, email, password, colorMode },
                {
                    headers: {
                        Accept: 'application/json',
                    },
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
