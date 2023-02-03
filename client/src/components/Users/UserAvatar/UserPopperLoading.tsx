import React from 'react'
import { CardHeader, CardContent, Skeleton } from '@mui/material'

const UserPopperLoading: React.FC = () => {
    return (
        <>
            <CardHeader
                avatar={
                    <Skeleton
                        variant='circular'
                        width={45}
                        height={45}
                    />
                }
                title={
                    <Skeleton
                        variant='text'
                        sx={{ fontSize: '1rem' }}
                    />
                }
            />

            <CardContent>
                <Skeleton
                    variant='rectangular'
                    width={210}
                    height={60}
                />
            </CardContent>
        </>
    )
}

export default UserPopperLoading
