import { useDispatch, useSelector } from 'react-redux'
import './App.css'
import { changeText, add, delAsyncTodo, editAsyncTodo, getAsyncTodo } from './store/slices/todoSlice'
import { useEffect, useState } from 'react'

function App({todo}){
  const [edit, setEdit] = useState(false)
  const [editText, setEditText] = useState(todo?.title || '')
  const dispatch = useDispatch()
  const {text, todos} = useSelector((state) => state.todoApp)

  useEffect(() => {
    dispatch(getAsyncTodo())
  }, [dispatch])

  const completed = () => {
    if(!todo) return
    dispatch(editAsyncTodo({
      id: todo.id,
      update: {completed: !todo.completed}
    }))
  }

  const save = () => {
    dispatch(editAsyncTodo({
      id: todo.id,
      update: {title: editText}
    }))
    setEdit(false)
  }

  const del = (id) => {
    if(!id) return
    dispatch(delAsyncTodo(id))
  }

  return(
    <div className="app">
      <input value={text} onChange={(e) => dispatch(changeText(e.target.value))} placeholder='Writre your Todo'/>
      <button onClick={() => dispatch(add())}>add</button>
      {
        todos.map((todo) => {
          return <div className="todo" key={todo.id}>
              <input type="checkbox" checked={todo.completed} onChange={() => completed(todo.id)}/>
              {
                edit ? <input value={editText} onChange={(e) => setEditText(e.target.value)}/> : <li>{todo.title}</li>
              }
              <button onClick={edit ? save : () => setEdit(true)}>{edit ? 'save' : 'edit'}</button>
              <button onClick={() => del(todo.id)}>delete</button>
            </div>
        })
      }
    </div>
  )
}

export default App
