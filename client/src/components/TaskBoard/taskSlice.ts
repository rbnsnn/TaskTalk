import { createSlice } from '@reduxjs/toolkit'

interface TasksInterface {
    tasks: any[]
}

const initialTasksState: TasksInterface = {
    tasks: [
        {
            id: '1',
            name: 'test',
            color: '#f48fb1',
            tasks: [
                {
                    id: 'a',
                    title: 'task1aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',
                    priority: 'high',
                    labels: ['tag1'],
                    assigned: ['user1'],
                },
                {
                    id: 'b',
                    title: 'task2',
                    priority: 'low',
                    labels: ['tag1', 'tag2'],
                    assigned: ['user2'],
                },
            ],
        },
        {
            id: '2',
            name: 'test2',
            color: '#00b0ff',
            tasks: [
                {
                    id: 'c',
                    title: 'task3',
                    priority: 'medium',
                    labels: ['tag1', 'tag2'],
                    assigned: ['user2'],
                },
            ],
        },
        {
            id: '3',
            name: 'test3',
            color: '#ff9100',
            tasks: [],
        },
        {
            id: '4',
            name: 'test4',
            color: '#ff9100',
            tasks: [],
        },
        {
            id: '5',
            name: 'test5',
            color: '#ff9100',
            tasks: [],
        },
    ],
}

const tasksSlice = createSlice({
    name: 'tasks',
    initialState: initialTasksState,
    reducers: {
        // retrieve(state, { payload }: any) {
        //     state.isLoggedIn = true
        //     state.user = {
        //         ...state.user,
        //         ...payload,
        //     }
        // },
        // removeErrAndSucc(state) {
        //     state.success = false
        //     state.error = null
        // },
        // logout: () => initialAuthState,
    },
    extraReducers(builder) {},
})

export const tasksActions = tasksSlice.actions
export default tasksSlice.reducer
