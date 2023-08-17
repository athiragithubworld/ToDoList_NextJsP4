import React, { useContext, useEffect, useState } from "react";
import Card from "../UI/Card";
import classes from "./TodoList.module.css";
import { AiFillCloseCircle } from "react-icons/ai";
import ToDoContext from "../store/ToDoContext";

const TodoList = (props) => {
  const todocntx = useContext(ToDoContext);

  console.log("propstodo", props.todoList);

  const [todoList, setTodoList] = useState(props.todoList);

  useEffect(() => {
    setTodoList(props.todoList);
    // show not completed task
    setTodoList((prevData) =>
      prevData.filter((item) => item.doneTask === false)
    );
  }, [props.todoList]);

  const onDeleteHandler = async (item) => {
    const delTodo = todoList.filter((todoItem) => todoItem.id !== item.id);
    setTodoList(delTodo);
    todocntx.removetoDoList(item);

    // delete from backend

    try {
      const response = await fetch("/api/delete-todo", {
        method: "DELETE",
        body: JSON.stringify(item),
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.log("Error in delete", error);
    }
  };

  const handleCheckboxChange = async (item) => {
    setTodoList((prevData) =>
      prevData.map((row) =>
        row.id === item.id ? { ...row, doneTask: !row.doneTask } : row
      )
    );
    todocntx.todoTaskDone(item.id);

    // Update todo in backend
    try {
      const response = await fetch("/api/update-todo", {
        method: "PUT",
        body: JSON.stringify({
          id: item.id,
          todoContent: item.todoContent,
          date: item.date,
          doneTask: !item.doneTask,
          key: item.key,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();
      console.log(data);

      // show not completed task
      setTodoList((prevData) =>
        prevData.filter((item) => item.doneTask === false)
      );
    } catch (error) {
      console.log("error in update todo ", error);
    }
  };

  return (
    <Card>
      <div className={classes.control}>
        <h1>Today's Todo List</h1>
      </div>
      <div>
        <table className={classes.table}>
          <tbody>
            {todoList &&
              todoList.map((item) => {
                return (
                  <tr className={classes.tr} key={item.id}>
                    <td>
                      <input
                        type="checkbox"
                        checked={item.doneTask}
                        onChange={(e) => {
                          e.stopPropagation();
                          handleCheckboxChange(item);
                        }}
                      ></input>
                    </td>
                    <td className={classes.td}>{item.todoContent}</td>

                    <td>
                      <AiFillCloseCircle
                        onClick={(e) => {
                          e.stopPropagation();
                          onDeleteHandler(item);
                        }}
                      />
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
    </Card>
  );
};

export default TodoList;
