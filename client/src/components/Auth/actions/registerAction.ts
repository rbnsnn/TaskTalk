import { createAsyncThunk } from "@reduxjs/toolkit";
import { UserCreate } from "../../../types/user-create.type";
import axios from "axios";

export const authRegister = createAsyncThunk(
    'auth/register',
    async ({ companyName, username, password }: UserCreate, { rejectWithValue }) => {
        const URL: string = `${(process.env.REACT_APP_API_URL as string)}/auth/register`
        try {
            const { data } = await axios.post<boolean>(
                URL,
                { companyName, username, password },
                {
                    headers: {
                        Accept: 'application/json'
                    }
                }
            )
            return data
        } catch (error: any) {
            if (error.response && error.response.data.message) {
                return rejectWithValue(error.response.data.message)
            } else {
                return rejectWithValue(error.message)
            }
        }

    }
)