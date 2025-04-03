import {configureStore} from '@reduxjs/toolkit'
import todoSlice from './slices/todoSlice'

const store = configureStore({
    reducer: {
        todoApp: todoSlice
    }
})

export default store
