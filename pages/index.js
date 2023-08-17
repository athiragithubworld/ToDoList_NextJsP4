import NewTodo from "@/components/ToDo/NewTodo";
import TodoList from "@/components/ToDo/TodoList";
// import TodoList from "@/components/ToDo/TodoList";
import React, { Fragment, useState } from "react";
import { MongoClient } from "mongodb";

const index = (props) => {
  // const [todoList, setTodoList] = useState([]);

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
  };

  return (
    <Fragment>
      <div>
        <h1>Add New Todo </h1>
        <NewTodo onTodoList={addTodoListHandler} />
      </div>
      <div>
        <TodoList todoList={props.todoList} />
      </div>
    </Fragment>
  );
};

export async function getStaticProps() {
  // fetch data from api

  const client = await MongoClient.connect(
    "mongodb+srv://Athipython:twmE5fn6eWqn6gYx@cluster0.jnw4ana.mongodb.net/todoLists?retryWrites=true&w=majority"
  );

  const db = client.db();

  const todoCollections = db.collection("todoLists");
  const todoLists = await todoCollections.find().toArray();

  return {
    props: {
      todoList: todoLists.map((item) => ({
        id: item.id,
        todoContent: item.todoContent,
        date: item.date,
        doneTask: item.doneTask,
        key: item._id.toString(),
        status: item.status,
      })),
    },
    revalidate: 1,
  };
}

export default index;
