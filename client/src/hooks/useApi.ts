import { useMemo } from "react"
import { useEffect, useState } from "react"
import { authActions } from "../components/Auth/authSlice"
import { axiosApi } from "../helpers/axios/axios-api-helper"
import { useAppDispatch } from "./redux-hooks"

type Arguments = (
    url: string,
    method: string,
    payload?: any
) => { data: any, error: string, loading: boolean }

export const useApi: Arguments = (url, method, payload = null) => {
    const [data, setData] = useState<any>(null)
    const [error, setError] = useState<string>('')
    const [loading, setLoading] = useState<boolean>(false)

    const dispatch = useAppDispatch()

    const config = useMemo(() => ({
        url,
        method,
        data: payload
    }), [url, method, payload])

    useEffect(() => {
        (async () => {
            setLoading(true)
            try {
                const response = await axiosApi(config);
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
        })();
    }, [config, dispatch]);

    return { data, error, loading }
}