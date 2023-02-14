import React from 'react'
import { useApi } from '../../hooks/useApi'
import LabelsManager from '../../components/Labels/LabelsManager'
import LoadingPage from './LoadingPage'

const LabelsPage: React.FC = () => {
    const { data, loading } = useApi(`companies/labels`, 'GET')

    return (
        <>
            {!loading && data && <LabelsManager data={data} />}
            {loading && <LoadingPage />}
        </>
    )
}

export default LabelsPage
