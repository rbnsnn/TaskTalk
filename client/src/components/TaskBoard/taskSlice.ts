import { createSlice } from '@reduxjs/toolkit'

interface TasksInterface {
    tasks: any[]
}

const initialAuthState: TasksInterface = {
    tasks: [],
}

const tasksSlice = createSlice({
    name: 'tasks',
    initialState: initialAuthState,
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
