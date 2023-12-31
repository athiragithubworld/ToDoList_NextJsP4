import React, { useContext, useEffect, useState } from "react";
// import ToDoContext from "../store/ToDoContext";
import Card from "../UI/Card";
import classes from "./CompletedToDoTask.module.css";
import { AiFillCloseCircle } from "react-icons/ai";

const CompletedToDoTask = (props) => {
  // const todocntx = useContext(ToDoContext);
  const [todoList, settodoListDone] = useState(props.todoList);
  // console.log("done todo", props.todoList);

  useEffect(() => {
    if (props.todoList) {
      settodoListDone(props.todoList);
    }
  }, [props.todoList]);

  let todoListDone = todoList.filter((item) => item.doneTask === true);

  return (
    <Card>
      <div className={classes.control}>{/* <h1>Todo List</h1> */}</div>
      <div>
        <table className={classes.table}>
          <tbody>
            {todoListDone &&
              todoListDone.map((item) => {
                return (
                  <tr className={classes.tr} key={item.id}>
                    <td>
                      <input
                        type="checkbox"
                        checked={item.doneTask}
                        // onChange={() => handleCheckboxChange(item.id)}
                      ></input>
                    </td>
                    <td className={classes.td}>{item.todoContent}</td>

                    <td>
                      <AiFillCloseCircle
                      // onClick={(e) => {
                      //   e.stopPropagation();
                      //   onDeleteHandler(item);
                      // }}
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

export default CompletedToDoTask;
