//  todo-list-done/

import CompletedToDoTask from "@/components/ToDo/CompletedToDoTask";
import { MongoClient } from "mongodb";
import React from "react";

const DoneTodoList = (props) => {
  return (
    <div>
      <h1>Completed Todo List</h1>
      <CompletedToDoTask todoList={props.todoList} />
    </div>
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
        // status: item.status,
      })),
    },
    revalidate: 1,
  };
}

export default DoneTodoList;
