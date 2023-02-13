import React from 'react'
import { Typography } from '@mui/material'
import { useApi } from '../../hooks/useApi'
import LabelsManager from '../../components/Labels/LabelsManager'
import LoadingPage from './LoadingPage'

const LabelsPage = () => {
    // const { taskId } = useParams()
    const { data, loading } = useApi(`tasks/all`, 'GET')

    return (
        <>
            {!loading && (
                <>
                    {data ? (
                        <LabelsManager />
                    ) : (
                        <Typography
                            align='center'
                            variant='h4'
                        >
                            No labels found!
                        </Typography>
                    )}
                </>
            )}
            {loading && <LoadingPage />}
        </>
    )
}

export default LabelsPage
