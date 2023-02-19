import { useState } from 'react'
import { ColumnData } from '../types/column-data.type'
import { useApi } from './useApi'

export interface UseStatusReturnI {
    status: {
        assignedStatus: ColumnData | null
        setAssignedStatus: any
        assignedStatusHasError: boolean
        setAssignedStatusHasError: any
        assignedStatusTouched: boolean
        setAssignedStatusTouched: any
    }
    statusApi: {
        statusData: ColumnData[]
        resetStatus: () => void
        refetchStatus: () => void
    }
}

export const useStatusInput = (): UseStatusReturnI => {
    const [assignedStatus, setAssignedStatus] = useState<ColumnData | null>(null)
    const [assignedStatusHasError, setAssignedStatusHasError] = useState<boolean>(false)
    const [assignedStatusTouched, setAssignedStatusTouched] = useState<boolean>(false)
    const {
        data: statusData,
        reset: resetStatus,
        executeFetch: refetchStatus,
    } = useApi('companies/names', 'GET', false)

    return {
        status: {
            assignedStatus,
            setAssignedStatus,
            assignedStatusHasError,
            setAssignedStatusHasError,
            assignedStatusTouched,
            setAssignedStatusTouched,
        },
        statusApi: {
            statusData,
            resetStatus,
            refetchStatus,
        },
    }
}
