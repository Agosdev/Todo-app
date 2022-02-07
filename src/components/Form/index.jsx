import React, { useState, useEffect } from "react";
import { nanoid } from "nanoid";
import "./index.css";

const Form = () => {
  const [todo, setTodo] = useState([]);
  const [task, setTask] = useState("");
  const [editing, setEditing] = useState(null);
  const [edit, setEdit] = useState("");
  const date = new Date();

  useEffect(() => {
    const todoStorage = localStorage.getItem("todo");
    const loadStorage = JSON.parse(todoStorage);
    if (loadStorage) {
      setTodo(loadStorage);
    }
  }, []);

  useEffect(() => {
    const todoStorage = JSON.stringify(todo);
    localStorage.setItem("todo", todoStorage);
  }, [todo]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newTask = {
      taskName: task,
      isComplete: false,
      createdAt: `${date.getDate()} / ${
        date.getMonth() + 1
      } / ${date.getFullYear()}`,
      id: nanoid(),
    };
    setTodo((todo) => [...todo, newTask]);
    setTask("");
  };

  const handleChangeInput = (e) => {
    setTask(e.target.value);
  };

  const deleteTask = (id) => {
    const updateTodo = todo.filter((to) => id !== to.id);
    setTodo(updateTodo);
  };

  const changeStatus = (id) => {
    const updateTodo = todo.map((to) => {
      if (to.id === id) {
        to.isComplete = !to.isComplete;
      }
      return to;
    });
    setTodo(updateTodo);
  };

  const saveEdit = (id) => {
    const updateTodo = todo.map((to) => {
      if (to.id === id) {
        to.taskName = edit;
      }
      return to;
    });
    setTodo(updateTodo);
    setEdit("");
    setEditing(null);
  };

  return (
    <div>
      <h2>Mis tareas</h2>
      <form className="taskForm" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Tarea"
          value={task}
          onChange={handleChangeInput}
        />
        <button className="addBtn" type="submit">
          ➕
        </button>
      </form>
      {todo.map(({ taskName, isComplete, createdAt, id }) => {
        console.log(todo);
        return (
          <div
            key={id}
            className={isComplete ? "task complete" : "task pending"}
          >
            <form onSubmit={() => saveEdit(id)}>
              {editing === id ? (
                <input
                  type="text"
                  value={edit}
                  onChange={(e) => setEdit(e.target.value)}
                  autoFocus
                />
              ) : (
                <>
                  <h3>{taskName}</h3>
                  <i>{createdAt}</i>
                </>
              )}
              {editing === id ? (
                <button type="submit" className="saveEdit">
                  Guardar
                </button>
              ) : null}
            </form>
            <div className="botonera">
              <input
                type="checkbox"
                onChange={() => changeStatus(id)}
                checked={isComplete}
              />
              <button onClick={() => deleteTask(id)}>❌</button>
              <button onClick={() => setEditing(id)}>✏️</button>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Form;
