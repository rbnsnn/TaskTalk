import React from 'react'
import { useAppSelector } from '../../hooks/redux-hooks'
import { RootState } from '../../store/store'

const DashBoardPage: React.FC = () => {
    const { username } = useAppSelector((state: RootState) => state.auth.user)

    return <div>Welcome {username}</div>
}

export default DashBoardPage
