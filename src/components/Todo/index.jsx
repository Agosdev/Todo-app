import React, {useEffect, useState} from 'react';
import ButtonBar from '../ButtonBar';
import Task from '../Task';

const Todo = () => {

 

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
          </>
            )
           
            })
          }

    </div>
    )
}

export default Todo;