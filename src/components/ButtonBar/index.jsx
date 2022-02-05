import React from 'react';

 const ButtonBar = ({deleteTask, editTask, changeStatus}) => {
  return (
    <>
      <div  className="botonera">
        <button onClick={(e) => deleteTask(iD)}>❌</button> 
        <button onClick={(e) => editTask(task)}>✏️</button>
        <button onClick={(e) => changeStatus(task)}>⟲</button>
      </div>
    </>
  )
}

export default ButtonBar;



