import { useState, useEffect } from 'react'
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
        statusLoading: boolean
        resetStatus: () => void
        refetchStatus: () => void
    }
}

export const useStatusInput = (active?: string): UseStatusReturnI => {
    const [assignedStatus, setAssignedStatus] = useState<ColumnData | null>(null)
    const [assignedStatusHasError, setAssignedStatusHasError] = useState<boolean>(false)
    const [assignedStatusTouched, setAssignedStatusTouched] = useState<boolean>(false)
    const {
        data: statusData,
        reset: resetStatus,
        loading: statusLoading,
        executeFetch: refetchStatus,
    } = useApi('companies/names', 'GET')

    useEffect(() => {
        if (statusData && active) {
            const activeStatus = statusData.find(
                (column: ColumnData) => column.name === active
            )

            setAssignedStatus(activeStatus)
        }
    }, [statusLoading, active, statusData])

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
            statusLoading,
            resetStatus,
            refetchStatus,
        },
    }
}
