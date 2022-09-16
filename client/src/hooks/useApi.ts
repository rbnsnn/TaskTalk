import { useState } from "react"
import { axiosApi } from "../helpers/axios/axios-api-helper"
import { useAppDispatch } from "./redux-hooks"

type Arguments = (
    url: string,
    method: string,
    payload?: any
) => void

export const useApi: Arguments = async (url, method, payload = null) => {
    const dispatch = useAppDispatch()

    const config = {
        url,
        method,
        data: payload
    }

    const response = await axiosApi(config)

    return response.data
}