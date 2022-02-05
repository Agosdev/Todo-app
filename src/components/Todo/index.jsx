import React, {useEffect, useState} from 'react';
import ButtonBar from '../ButtonBar';
import Task from '../Task';

const Todo = () => {

  
const [taskStatus, setTaskStatus] = useState(false)
const [todo, setTodo] = useState([])


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
 
console.log(task)
console.log(todo)

   return (
     <div className='todo'>
          {todo.map((task, index)=> {
           let { taskName, isComplete, createdAt, iD } = task 
            return (
              <>
              <Task 
                key={index}
                isComplete={isComplete}
                taskName={taskName}
                createdAt={createdAt}
                iD={iD}
            />
            <ButtonBar 
            deleteTask={deleteTask(iD)}
            editTask={editTask(task)}
            changeStatus={changeStatus(task)}
            />
          </>
            )
           
            })
          }

    </div>
    )
}

export default Todo;