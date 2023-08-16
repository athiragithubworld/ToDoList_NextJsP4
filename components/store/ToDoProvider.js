import React, { useState } from "react";
import ToDoContext from "./ToDoContext";

const ToDoProvider = (props) => {
  const [todoList, setToDoList] = useState([]);

  const todoAddHandler = (item) => {
    setToDoList((prevState) => {
      const newData = [...prevState, item];

      return newData;
    });
  };

  const removetoDoList = (item) => {
    const delTodo = todoList.filter((todoItem) => todoItem.id !== item.id);
    setToDoList(delTodo);
  };

  const todoTaskDone = (id) => {
    setToDoList((prevData) =>
      prevData.map((row) =>
        row.id === id ? { ...row, doneTask: !row.doneTask } : row
      )
    );
  };

  const cartcnxt = {
    toDoList: todoList,
    todoAddHandler: todoAddHandler,
    removetoDoList: removetoDoList,
    todoTaskDone: todoTaskDone,
  };

  return (
    <ToDoContext.Provider value={cartcnxt}>
      {props.children}
    </ToDoContext.Provider>
  );
};

export default ToDoProvider;
