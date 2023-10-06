import React, { Fragment, useRef, useContext } from "react";
import Card from "../UI/Card";
import classes from "./NewTodo.module.css";
import { useRouter } from "next/router";
// import ToDoContext from "../store/ToDoContext";
// import TodoList from "./TodoList";

const NewTodo = (props) => {
  // const todocxt = useContext(ToDoContext);
  const todoInputRef = useRef();
  const router = useRouter();

  const addTodoListHandler = async (addedTodoList) => {
    console.log("todolist", addedTodoList);

    const response = await fetch("/api/new-todo", {
      method: "POST",
      body: JSON.stringify(addedTodoList),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();
    console.log(data);
    router.replace("/");
  };

  const submitHandler = (event) => {
    event.preventDefault();

    const enteredTodo = todoInputRef.current.value;

    if (enteredTodo) {
      const todoData = {
        id: Math.random().toString(),
        todoContent: enteredTodo,
        date: new Date(),
        doneTask: false,
        // status: "incomplete",
      };
      addTodoListHandler(todoData);
      // props.onTodoList(todoData);
    } else {
      return alert("Please enter the todo ");
    }

    // router.replace("/");
    // todocxt.todoAddHandler(todoData);
    todoInputRef.current.value = "";
  };

  return (
    <Fragment>
      <Card>
        <form className={classes.form} onSubmit={submitHandler}>
          <div className={classes.control}>
            <label htmlFor="todo">ToDo</label>
            <textarea id="todo" required rows="5" ref={todoInputRef}></textarea>
          </div>
          <div className={classes.actions}>
            <button>Add</button>
          </div>
        </form>
      </Card>
    </Fragment>
  );
};

export default NewTodo;
