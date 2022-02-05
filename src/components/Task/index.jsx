import React from 'react';

 const Task = ({isComplete, taskName, createdAt}) => {
 
  return (
    <>
    <div key={index} className={isComplete ? 'task complete' : 'task pending'}>
        <h2>{taskName}</h2>
        <i>{createdAt}</i>
    </div>
    </>
  )
}

export default Task;