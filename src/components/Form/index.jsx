import React, { useState, useEffect} from 'react';
// import Todo from '../Todo';
// import './index.css'

const Form = () => {

  
  const [todo, setTodo] = useState([])
  const [task, setTask] = useState("")
  const [editing, setEditing] = useState(null)
  const [edit, setEdit] = useState("")
  const date = new Date()
 
useEffect(()=> {
  const todoStorage = localStorage.getItem("todo")
  const loadStorage = JSON.parse(todoStorage)
  if (loadStorage) {
      setTodo(loadStorage)
  }
},[])

useEffect(()=> {
  const todoStorage = JSON.stringify(todo)
  localStorage.setItem("todo", todoStorage)
},[todo])

const handleSubmit = e => {
    e.preventDefault()
    const newTask = {
      taskName: task,
      isComplete: false,
      createdAt: `${date.getDate()} / ${date.getMonth() + 1} / ${date.getFullYear()}`,
      iD: Math.random().toString(36).substring(2, 9)
     }
      setTodo(todo => [...todo, newTask]) 
      setTask('')
}

const handleChangeInput = e => {
    setTask(e.target.value)
 }

 const deleteTask = iD => {
  const updateTodo = todo.filter(to => iD !== to.iD)
   setTodo(updateTodo)
 }

 const changeStatus = iD => {
  const updateTodo = todo.filter(to => {
    if (to.iD === iD) {
        to.isComplete = !to.isComplete
    }
    return todo
  })
   setTodo(updateTodo)
 }
 
 const saveEdit = iD => {
  const updateTodo = todo.filter(to => {
    if (to.iD === iD) {
        to.taskName = edit
    }
    return todo
  })
   setTodo(updateTodo)
   setEdit("")
   setEditing(null)
 }
 
  return (
    <>
    <div >
        <h1>Mis tareas</h1>
        <form className='taskForm' onSubmit={handleSubmit}>
        <input  
                type='text' 
                placeholder='Tarea' 
                value={task}
                onChange={handleChangeInput}/>
        <button type='submit'>➕</button>
        </form>
              {todo.map( (todoTask, index) => {
                        let { taskName, isComplete, createdAt, iD} = todoTask
                      return (
                      <div key={index} className={isComplete ? 'task complete' : 'task pending'}>
                        {editing === iD ?                          
                        <input  
                        type='text' 
                        value={edit}
                        onChange={(e) => setEdit(e.target.value)}
                        autoFocus
                        />
                        : <h2>{taskName}</h2>
                        }                       
                          <i>{createdAt}</i>
                          <div className="botonera">
                          <input type='checkbox' onChange={(e) => changeStatus(iD)} checked={isComplete}/>
                          <button onClick={(e) => deleteTask(iD)}>❌</button> 
                          <button onClick={(e) => setEditing(iD)}>✏️</button>
                          {editing === iD ?                          
                          <button className='saveEdit' onClick={(e) => saveEdit(iD)}>Guardar</button>
                          : null
                          }
                          </div>
                      </div>
                      )}
                      )}
      </div>
    </>
  )
}

export default Form;