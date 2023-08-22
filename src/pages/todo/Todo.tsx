import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Todo.module.css";
import getTodo from "../../apis/todo/getTodo";
import createTodo from "../../apis/todo/createTodo";
import updateTodo from "../../apis/todo/updateTodo";
import deleteTodo from "../../apis/todo/deleteTodo";
import hasAccessToken from "../../utils/hasAccessToken";
import { Todo } from "../../types/todo";
import TodoListCard from "../../components/todo/TodoListCard";
import CustomInput from "../../components/common/CustomInput";
import CustomButton from "../../components/common/CustomButton";

type changedTodo = {
  todo: string;
  isCompleted: boolean;
};

export default function TodoPage() {
  const navigate = useNavigate();
  const [input, setInput] = useState("");
  const [todoArray, setTodoArray] = useState<Todo[]>([]);

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  // 개별 Todo 업데이트 시 동작하는 이벤트 핸들러
  // 업데이트 성공시 업데이트가 된 부분의 엘리먼트만 수정함.
  const handleUpdateTodo = async (todoText: string, checkYn: boolean, id: number) => {
    const updatedTodo = await updateTodo(todoText, checkYn, id);

    if (updatedTodo.isSuccess) {
      const { todo, isCompleted }: changedTodo = updatedTodo.data as Todo;
      todoArray.map(el => {
        if (el.id === id) {
          return {
            ...el,
            todo: todo,
            isCompleted: isCompleted,
          };
        }
        return el;
      });
    } else {
      alert("통신 중에 문제가 발생했습니다!");
    }
  };

  // 개별 Todo 삭제시 동작하는 이벤트 핸들러
  // 삭제 성공시 렌더링할 배열의 삭제된 부분의 엘리먼트만 삭제함.
  const handleDeleteTodo = async (id: number) => {
    const deletedTodo = await deleteTodo(id);

    if (deletedTodo.isSuccess) {
      const deletedId: number = deletedTodo.deletedId as number;
      setTodoArray(todoArray.filter(el => el.id !== deletedId));
    } else {
      alert("통신에 문제가 발생했습니다.");
    }
  };

  // Todo 생성시 동작하는 이벤트 핸들러
  // 생성 성공시 렌더링할 배열의 마지막 엘리먼트에 새로 생성된 Todo를 추가
  const handleCreateTodo = async (input: string) => {
    const createTodoResult = await createTodo(input);
    if (createTodoResult.data !== null) {
      setTodoArray([...todoArray, createTodoResult.data]);
    }
  };

  // /todo 링크 초기 접근 시 Effect로 실행될 함수
  // 초기 todoList를 화면에 렌더링
  const initTodoList = async () => {
    const getTodoResult = await getTodo();
    setTodoArray([...getTodoResult.data]);
  };

  // Access Token이 없을 시 /signin으로 강제 이동
  useEffect(() => {
    if (!hasAccessToken()) {
      navigate("/signin", { replace: true });
    }
  }, [navigate]);

  // 초기 화면 렌더링 시 사용할 todolist를 가져옴
  // 마운트될때 한번만 실행됨
  useEffect(() => {
    initTodoList();
  }, []);

  return (
    <main className={styles.todo_main_container}>
      <h1 className={styles.todo_logo}>To Do List</h1>
      <div className={styles.todo_list_container}>
        <div className={styles.todo_enroll_container}>
          <CustomInput
            labelFor="add_todo"
            labelText="Todo 추가!"
            id="add_todo"
            name="add_todo"
            type="text"
            value={input}
            testid="new-todo-input"
            onChangeHandler={handleInput}
          />
          <CustomButton
            testid="new-todo-add-button"
            buttonText="추가"
            propsStyle={styles.button_size}
            onClickHandler={() => handleCreateTodo(input)}
          />
        </div>
        <ul className={styles.todo_ul}>
          {todoArray.map(el => (
            <TodoListCard
              key={el.id}
              id={el.id}
              todo={el.todo}
              isCompleted={el.isCompleted}
              updateTodoFn={handleUpdateTodo}
              deleteTodoFn={handleDeleteTodo}
            />
          ))}
        </ul>
      </div>
    </main>
  );
}
