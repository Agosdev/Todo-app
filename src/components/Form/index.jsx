import React, { useState, useEffect} from 'react';
// import Todo from '../Todo';
// import './index.css'

const Form = () => {

const date = new Date()

const [name, setName] = useState('')
const [taskStatus, setTaskStatus] = useState(false)
const [todo, setTodo] = useState([])
const [task, setTask] = useState("")
 
const handleSubmit = e => {
    e.preventDefault()
      setTask({
         taskName: name,
         isComplete: taskStatus,
         createdAt: `${date.getDate()} / ${date.getMonth() + 1}`,
         iD: Math.random().toString(36).substring(2, 9)
     }) 
     setName('')
     }

const handleChangeInput = e => {
    setName(e.target.value)
    // console.log(name)
}

useEffect(() => {
  setTodo(todo => [...todo, task])
},[task])


const changeStatus = task => {
  console.log(task)
  // console.log(taskStatus)
     if(task.isComplete === taskStatus) {
       task.isComplete = !taskStatus
    }
      setTaskStatus(!taskStatus)
}

 const editTask = task => {
  console.log(task.taskName)
  const edit = prompt("Cambia la tarea:")
  console.log(edit)
  setName(task.taskName = edit)
}


const deleteTask = iD => {
  const updateTodo = todo.filter(to => iD !== to.iD)
  // console.log(updateTodo)
  setTodo(updateTodo)
 }
//  console.log(task)
//  console.log(todo)

  return (
    <>
    <div >
        <h1>Mis tareas</h1>
        <form className='taskForm' onSubmit={handleSubmit}>
        <input  
                type='text' 
                placeholder='Tarea' 
                value={name}
                onChange={handleChangeInput}/>
        <button type='submit'>➕</button>
        </form>
              {todo.map( (task, index) => {
                console.log(task.index)
                console.log(task.iD)
                      if (task !== "") {
                      let { taskName, isComplete, createdAt, iD} = task
                      return (
                      <div key={index} className={isComplete ? 'task complete' : 'task pending'}>
                          <h2>{taskName}</h2>
                          <i>{createdAt}</i>
                          <div  className="botonera">
                          <button onClick={(e) => deleteTask(iD)}>❌</button> 
                          <button onClick={(e) => editTask(task)}>✏️</button>
                          <button onClick={(e) => changeStatus(task)}>⟲</button>
                          </div>
                      </div>
                      )}
               }
              )}
      </div>
    </>
  )
}

export default Form;








