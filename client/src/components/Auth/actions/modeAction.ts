import { createAsyncThunk } from '@reduxjs/toolkit'
import { axiosApi } from '../../../helpers/axios/axios-api-helper'

export const modeChange = createAsyncThunk(
    'auth/colormode',
    async (colorMode: 'dark' | 'light', { rejectWithValue }) => {
        const config = {
            url: `${process.env.REACT_APP_API_URL as string}/users/mode`,
            method: 'PATCH',
            data: { colorMode },
        }
        try {
            const { data } = await axiosApi(config)
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
