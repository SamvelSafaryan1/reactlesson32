import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import API from "../../api/api"

const todoSlice = createSlice({
    name: 'todoSlice',
    initialState: {
        text: '',
        todos: []
    },
    reducers: {
        changeText(state, action){
            state.text = action.payload
        },
        add(state){
            state.todos = [...state.todos, {id: Date.now(), title: state.text, completed: false}]
        },
        get(state, action){
            state.todos = action.payload
        },
        update(state, action){
            const {id, update} = action.payload
            state.todos = state.todos.map((todo) => {
                todo.id === id ? {...todo, ...update} : todo
            })
        },
        delTodo(state, action){
            state.todos = state.todos.filter((todo) => todo.id !== action.payload)
        }
    }
})

export const getAsyncTodo = createAsyncThunk(
    'getAsyncTodo',
    async (_, {dispatch}) => {
        const res = await API.getTodo()
        dispatch(get(res.data))
    }
)

export const postAsyncTodo = createAsyncThunk(
    'postAsyncTodo',
    async (newTodo, {dispatch}) => {
        const RES = await API.postTodo(newTodo)
        dispatch(add(RES.data))
    }
)

export const editAsyncTodo = createAsyncThunk(
    'editAsyncTodo',
    async ({id, update}, {dispatch}) => {
        const Res = await API.editText(id, update)
        dispatch(update({id, update: Res.data}))
    }
)

export const delAsyncTodo = createAsyncThunk(
    'delAsyncTodo',
    async (id, {dispatch}) => {
        await API.delTodo(id)
        dispatch(delTodo(id))
    }
)

export const {changeText, add, get, update, delTodo} = todoSlice.actions
export default todoSlice.reducer
