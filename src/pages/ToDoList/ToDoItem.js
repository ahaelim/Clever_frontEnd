import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import add from "../../image/add.png";
import "./ToDoDetail.scss";
import "./ToDoList.scss";

const ToDoItem = () => {
  const [todoList, setTodoList] = useState([]);

  const navigate = useNavigate();

  const gotoToDoCreate = () => {
    navigate("/todolistcreate");
  };

  // 할 일 리스트 불러오기
  useEffect(() => {
    axios
      .post("/todolist/todolist")
      .then((res) => {
        // const newData = res.data.map((i) => ({
        //   id: i.todo_seq,
        //   text: i.todo_title,
        //   done: false,
        // }));
        // dispatch({
        //   type: "CREATE",
        //   todo: newData,
        // });
        console.log("res", res.data);
        setTodoList(res.data);
      })
      .catch((err) => {
        console.log("리스트 실패함", err);
      });
  }, []);

  // 할 일 상세보기
  const [todoDetail, setTodoDetail] = useState([]);
  // const [todoTitle, setTodoTitle] = useState("");
  // const [toDoDone, setToDoDone] = useState("미완료");

  const onDetail = (item, e) => {
    console.log("item", item);
    // setTodoDetail(item);
    const { detailId } = item.todo_seq;
  };

  // const changeDone = (value) => {
  //   setToDoDone(value);
  // };

  // 완료된 할 일 불러오기
  const today = new Date();

  const [detailId, setDetailId] = useState([]);
  const [toDoDone, setToDoDone] = useState();
  const [doneMem, setDoneMem] = useState();
  const [doneDate, setDoneDate] = useState();

  useEffect(() => {
    // setDetailId(item.todo_seq);

    axios
      .post("/todolist/tododetail", {
        todo_seq: detailId,
      })
      .then((res) => {
        console.log("완료", res.data);
        // if (res.data.length >= 1) {
        //   // console.log("detailId", detailId);
        //   setDoneMem(item.mem_id);
        //   setDoneDate(item.todo_dt);
        //   // changeDone("완료");
        //   // console.log(detailId);
        // } else if (res.data.length === 0) {
        //   alert("미완료된 할 일 입니다.");
        // }
      })
      .catch((err) => {
        console.log("실패함11", err);
      });
  });

  return (
    <div>
      <div>
        <div className="todo-list">
          {todoList
            .filter((item, idx) => idx <= 6)
            .map((item) => (
              <div className="todo-item">
                <div>
                  <div
                    className="todo-title"
                    key={item.todo_title}
                    onClick={(e) => {
                      onDetail(item, e);
                    }}
                  >
                    {item.todo_title}
                  </div>
                  <div
                    className="todo-content"
                    key={item.todo_content}
                    onClick={(e) => {
                      onDetail(item, e);
                    }}
                  >
                    {item.todo_content}
                  </div>
                </div>
                <div className="todo-complete">{toDoDone}</div>
              </div>
            ))}
        </div>
        <div className="todoCreate-Img">
          <img
            src={add}
            className="todoCreateImg"
            onClick={gotoToDoCreate}
          ></img>
        </div>
      </div>

      <div>
        <div className="todoDetail">
          <div className="todoCom-mem">{doneMem} 완료</div>
          <div className="todoCom-img">{detailId}</div>
          <div className="todoCom-time">완료 : {doneDate}</div>
          <div className="todoCom-memo"> 메모</div>
        </div>
      </div>
    </div>
  );
};

export default ToDoItem;
