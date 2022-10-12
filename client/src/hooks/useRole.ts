import { useEffect } from 'react'
import { RootState } from '../store/store'
import { Role } from '../types/roles-enum.type'
import { useAppSelector } from './redux-hooks'

export const useRole = (role: Role): boolean => {
    const { roles } = useAppSelector((state: RootState) => state.auth.user)

    useEffect(() => {}, [roles])

    if (roles.includes(role)) {
        return true
    } else {
        return false
    }
}
