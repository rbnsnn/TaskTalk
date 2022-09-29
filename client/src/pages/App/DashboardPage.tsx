import React from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '../../store/store'


const DashBoardPage: React.FC = () => {
    const { username } = useSelector((state: RootState) => state.auth.user)

    return (
        <div>
            Welcome {username}
        </div>
    )
}

export default DashBoardPage