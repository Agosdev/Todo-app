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
    const updatedTodo = todo.map((to) => {
      if (to.id === id) {
        const updatedTask = {
          ...to,
          isComplete: !to.isComplete,
        };
        return updatedTask;
      } else {
        return to;
      }
    });
    console.log(updatedTodo);
    setTodo(updatedTodo);
  };

  const saveEdit = (id) => {
    const updateTodo = todo.map((to) => {
      if (to.id === id) {
        const updatedTask = {
          ...to,
          taskName: edit
        };
        return updatedTask;
      } 
      else {
        return to;
      }
    });
    setTodo(updateTodo);
    setEdit("");
    setEditing(null);
  };

  return (
    <div>
      <h2 className="title">Mis tareas</h2>
      <form className="form" onSubmit={handleSubmit}>
        <input
          className="form__input"
          type="text"
          placeholder="Tarea"
          value={task}
          onChange={handleChangeInput}
        />
        <button className="form__btn" type="submit">
          ➕
        </button>
      </form>
      {todo.map(({ taskName, isComplete, createdAt, id }) => {
        return (
          <div
            key={id}
            className={isComplete ? "task complete" : "task pending"}
          >
            <form onSubmit={() => saveEdit(id)}>
              {editing === id ? (
                <input
                  className="form__input"
                  type="text"
                  value={edit}
                  onChange={(e) => setEdit(e.target.value)}
                  autoFocus
                />
              ) : (
                <>
                  <h3>{taskName}</h3>
                  <span>{createdAt}</span>
                </>
              )}
              {editing === id ? (
                <button type="submit" className="btn task__saveEdit-btn">
                  Guardar
                </button>
              ) : null}
            </form>
            <div className="task__btn-bar">
              <input
                className="form__input-check"
                type="checkbox"
                onChange={() => changeStatus(id)}
                checked={isComplete}
              />
              <button className="btn" onClick={() => deleteTask(id)}>
                ❌
              </button>
              <button className="btn" onClick={() => setEditing(id)}>
                ✏️
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Form;
