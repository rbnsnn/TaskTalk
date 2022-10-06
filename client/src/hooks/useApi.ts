import { useEffect, useState, useCallback } from 'react'
import { authActions } from '../components/Auth/authSlice'
import { axiosApi } from '../helpers/axios/axios-api-helper'
import { useAppDispatch } from './redux-hooks'

type Arguments = (
    url: string,
    method: string,
    immediate?: boolean,
    payload?: any
) => { data: any; error: string; loading: boolean; executeFetch: (payload?: any) => void }

export const useApi: Arguments = (url, method, immediate = true) => {
    const [data, setData] = useState<any>(null)
    const [error, setError] = useState<string>('')
    const [loading, setLoading] = useState<boolean>(false)

    const dispatch = useAppDispatch()

    const executeFetch = useCallback(
        async (payload = {}) => {
            const config = {
                url,
                method,
                data: payload,
            }
            console.log(config)
            setLoading(true)
            try {
                const response = await axiosApi(config)
                setData(response.data)
            } catch (error: any) {
                if (error.response.status === 403) {
                    dispatch(authActions.logout())
                }
                if (error.response && error.response.data.message) {
                    setError(error.response.data.message)
                } else {
                    setError(error.message)
                }
            } finally {
                setLoading(false)
            }
        },
        [dispatch, method, url]
    )

    useEffect(() => {
        if (immediate) {
            executeFetch()
        }
    }, [executeFetch, immediate])

    return { data, error, loading, executeFetch }
}
