import { useState, useEffect } from 'react'
import { LabelI } from '../types/task-label.type'
import { useApi } from './useApi'

export interface UseLabelsReturnI {
    labels: {
        assignedLabels: LabelI[]
        setAssignedLabels: any
    }
    labelsApi: {
        labelsData: LabelI[]
        labelsLoading: boolean
        resetLabels: () => void
        refetchLabels: () => void
    }
}

export const useLabelsInput = (active?: LabelI[]): UseLabelsReturnI => {
    const [assignedLabels, setAssignedLabels] = useState<LabelI[]>([])
    const {
        data: labelsData,
        loading: labelsLoading,
        reset: resetLabels,
        executeFetch: refetchLabels,
    } = useApi('companies/labels', 'GET')

    useEffect(() => {
        if (labelsData && active) {
            setAssignedLabels(active)
        }
    }, [labelsData, active])

    return {
        labels: {
            assignedLabels,
            setAssignedLabels,
        },
        labelsApi: {
            labelsData,
            labelsLoading,
            resetLabels,
            refetchLabels,
        },
    }
}
