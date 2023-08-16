//  todo-list-done/

import CompletedToDoTask from "@/components/ToDo/CompletedToDoTask";
import React from "react";

const DoneTodoList = () => {
  return (
    <div>
      <h1>Completed Todo List</h1>
      <CompletedToDoTask />
    </div>
  );
};

export default DoneTodoList;
