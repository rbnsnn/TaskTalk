import React from 'react'
import { useApi } from '../../hooks/useApi'
import LabelsTable from '../../components/Labels/LabelsTable/LabelsTable'
import LoadingPage from './LoadingPage'

const LabelsPage: React.FC = () => {
    const { data, loading, executeFetch } = useApi(`companies/labels`, 'GET')

    const handleUpdate = (): void => {
        executeFetch()
    }

    return (
        <>
            {data && (
                <LabelsTable
                    data={data}
                    handleUpdate={handleUpdate}
                />
            )}
            {loading && <LoadingPage />}
        </>
    )
}

export default LabelsPage
