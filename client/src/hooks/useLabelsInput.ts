import { useState } from 'react'
import { LabelI } from '../types/task-label.type'
import { useApi } from './useApi'

export interface UseLabelsReturnI {
    labels: {
        assignedLabels: LabelI[]
        setAssignedLabels: any
    }
    labelsApi: {
        labelsData: LabelI[]
        resetLabels: () => void
        refetchLabels: () => void
    }
}

export const useLabelsInput = (): UseLabelsReturnI => {
    const [assignedLabels, setAssignedLabels] = useState<LabelI[]>([])
    const {
        data: labelsData,
        reset: resetLabels,
        executeFetch: refetchLabels,
    } = useApi('companies/labels', 'GET', false)

    return {
        labels: {
            assignedLabels,
            setAssignedLabels,
        },
        labelsApi: {
            labelsData,
            resetLabels,
            refetchLabels,
        },
    }
}
