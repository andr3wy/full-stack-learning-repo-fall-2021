import "./style.css";
import { useEffect, useState, Fragment } from "react";


export default function Home() {

  const[taskName, setTaskName] = useState("");
  const[toDo, setToDo] = useState(["drugs"]);
  const[finish, setFinish] = useState([]);
  function finishTask(index) {
    const finishedTask = toDo[index];
    const[temp, setTemp] = useState([]);
    for(let i = 0; i < toDo.length; i++) {
      if(i != index) {
        setTemp(temp.concat(toDo[i]));
      } else{
        setFinish(finish.concat(toDo[i]));
      }
    }
    setToDo(temp);
  }
  function unFinishTask(index) {
    const unfinishedTask = toDo[index];
    const[temp, setTemp] = useState([]);
    for(let i = 0; i < toDo.length; i++) {
      if(i != index) {
        setTemp(temp.concat(toDo[i]));
      } else {
        setToDo(toDo.concat(toDo[i]));
      }
    }
    setFinish(temp);
  }
  function addTask() {
    setToDo(toDo.concat(taskName));
    setTaskName("");

  }
  return (
    <Fragment>
        {toDo.length > 0  &&(
          <h2 class = "numLeft"> 
            You have {toDo.length == 1 ?   toDo.length + " task left " :  toDo.length + " tasks left "}
          </h2>
        )
        }
        <div id="input-container">
          <input type="text" value={taskName} placeHolder="What do you need to do?" onChange={(event) => setTaskName(event.target.value)}>

          </input>
          
          <button class="add" onClick={()=> addTask()}>
          ADD
          </button>
        </div>
        <div class="to-do-container">
          <h2>To Do</h2>
          <ul>
            {toDo.map((task, index) => (
              <ListItem 
                key = {index}
                index ={index}
                task = {task}
                type="todo"
                finishHandler={finishTask}
                undoHandler={undoTask}
                ></ListItem>

            ))}
          </ul>
        </div>


        


    </Fragment>
  );
}
