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
  }, [props.todoList]);

  const onDeleteHandler = (item) => {
    const delTodo = todoList.filter((todoItem) => todoItem.id !== item.id);
    setTodoList(delTodo);
    todocntx.removetoDoList(item);
  };

  const handleCheckboxChange = (id) => {
    setTodoList((prevData) =>
      prevData.map((row) =>
        row.id === id ? { ...row, doneTask: !row.doneTask } : row
      )
    );
    todocntx.todoTaskDone(id);
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
                          handleCheckboxChange(item.id);
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
