import React from "react";

const ToDoContext = React.createContext({
  toDoList: [],

  todoAddHandler: (todo) => {},

  removetoDoList: (todo) => {},
});

export default ToDoContext;
