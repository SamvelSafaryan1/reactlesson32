import axios from "axios"

const instance = axios.create({
    baseURL: 'https://jsonplaceholder.typicode.com'
})

const API = {
    getTodo(){
        return instance.get('/todos?_limit=15')
    },
    postTodo(newTodo){
        return instance.post('/todos', newTodo)
    },
    editText(id, update){
        return instance.patch(`/todos/${id}`, update)
    },
    delTodo(id){
        return instance.delete(`/todos/${id}`)
    }
}

export default API
