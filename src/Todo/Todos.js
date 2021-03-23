import { IconButton } from "@material-ui/core";
import React, { forwardRef, useState, useEffect } from "react";
import AddIcon from "@material-ui/icons/Add";
import DeleteOutlineOutlinedIcon from "@material-ui/icons/DeleteOutlineOutlined";
import DoneOutlineOutlinedIcon from "@material-ui/icons/DoneOutlineOutlined";
import EditOutlinedIcon from "@material-ui/icons/EditOutlined";
import "./Todos.css";
import { v4 } from "uuid";
import FlipMove from "react-flip-move";
import useLocalStorage from "../useLocalStorage";

const Todos = forwardRef(() => {
  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useLocalStorage("todos", []);

  useEffect(() => {
    const addLocal = () => {
      if (todos.length > 0) {
        localStorage.setItem("todos", JSON.stringify(todos));
      }
    };
    addLocal();
  }, [todos]);
  const handelSubmit = (e) => {
    e.preventDefault();
    if (todo.length === 0) return;
    setTodos([...todos, { text: todo, key: v4(), complete: false }]);
    setTodo("");
  };
  const deleteTodo = (e, key) => {
    e.preventDefault();
    let newTodos = todos.filter((todo) => todo.key !== key);
    setTodos(newTodos);
  };
  const editTodo = (e, key) => {
    e.preventDefault();
    todos.forEach((todo) => {
      if (todo.key === key) {
        setTodo(todo.text);
      }
    });
    let newTodos = todos.filter((todo) => todo.key !== key);
    setTodos(newTodos);
  };
  const completeTodo = (e, key) => {
    e.preventDefault();
    todos.forEach((todo) => {
      if (todo.key === key) {
        todo.complete = true;
      }
    });
    setTodos([...todos]);
  };

  return (
    <div className="todos">
      <form>
        <input
          value={todo}
          onChange={(e) => setTodo(e.target.value)}
          type="text"
          className="todos__input"
          placeholder="Enter Todo"
        />
        <IconButton
          aria-label="add"
          type="submit"
          className="todos__button"
          onClick={handelSubmit}
        >
          <AddIcon />
        </IconButton>
        <h2 className="todos__listHeader">
          <center>Todos</center>
          </h2>
      </form>

      <div className="todos__list">
        <FlipMove>
          {todos.map((todo) => (
            <div className="todo">
              {todo.complete === true ? (
                <div className="todo__complete">
                  <h3 className="todo__title--complete">{todo.text}</h3>
                  <IconButton
                    aria-label="add"
                    type="submit"
                    onClick={(e) => deleteTodo(e, todo.key)}
                  >
                    <DeleteOutlineOutlinedIcon className="todo__completeDelete" />
                  </IconButton>
                </div>
              ) : (
                <>
                  <h3 className="todo__title">{todo.text}</h3>

                  <div className="todos__icons">
                    <IconButton
                      aria-label="add"
                      type="submit"
                      onClick={(e) => completeTodo(e, todo.key)}
                    >
                      <DoneOutlineOutlinedIcon />
                    </IconButton>
                    <IconButton
                      aria-label="edit"
                      type="button"
                      onClick={(e) => editTodo(e, todo.key)}
                    >
                      <EditOutlinedIcon />
                    </IconButton>
                    <IconButton
                      aria-label="add"
                      type="submit"
                      onClick={(e) => deleteTodo(e, todo.key)}
                    >
                      <DeleteOutlineOutlinedIcon />
                    </IconButton>
                  </div>
                </>
              )}
            </div>
          ))}
        </FlipMove>
      </div>
    </div>
  );
});

export default Todos;
