import NewTodo from "@/components/ToDo/NewTodo";
import TodoList from "@/components/ToDo/TodoList";
// import TodoList from "@/components/ToDo/TodoList";
import React, { Fragment, useState } from "react";

const index = (props) => {
  const [todoList, setTodoList] = useState([]);
  const addTodoListHandler = (addedTodoList) => {
    console.log(addedTodoList);
    console.log("props", props);
    setTodoList((prevState) => {
      const newTodoList = [...prevState, addedTodoList];
      return newTodoList;
    });
  };

  return (
    <Fragment>
      <div>
        <h1>Add New Todo </h1>
        <NewTodo onTodoList={addTodoListHandler} />
      </div>
      <div>
        <TodoList todoList={todoList} />
      </div>
    </Fragment>
  );
};

export default index;
