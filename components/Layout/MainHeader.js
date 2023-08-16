import classes from "./MainHeader.module.css";
import Link from "next/link";

function MainHeader() {
  return (
    <header className={classes.header}>
      <div className={classes.logo}>My Todo List</div>
      <nav>
        <ul>
          <li>
            <Link href="/">Add Todo </Link>
          </li>
          <li>
            <Link href="/todo-list-done">Completed Todo List </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default MainHeader;
