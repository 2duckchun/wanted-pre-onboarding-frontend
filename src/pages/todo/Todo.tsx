import { useEffect, useState } from "react";
import hasAccessToken from "../../utils/hasAccessToken";
import { useNavigate } from "react-router-dom";
import getTodo from "../../apis/todo/getTodo";
import createTodo from "../../apis/todo/createTodo";
import TodoListCard from "../../components/todo/TodoListCard";
import updateTodo from "../../apis/todo/updateTodo";
import { Todo } from "../../types/todo";
import deleteTodo from "../../apis/todo/deleteTodo";

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

  const handleUpdateTodo = async (
    todoText: string,
    checkYn: boolean,
    id: number
  ) => {
    const updatedTodo = await updateTodo(todoText, checkYn, id);

    if (updatedTodo.isSuccess) {
      const { todo, isCompleted }: changedTodo = updatedTodo.data as Todo;
      todoArray.map((el) => {
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

  const handleDeleteTodo = async (id: number) => {
    const deletedTodo = await deleteTodo(id);
    console.log(deletedTodo);
    if (deletedTodo.isSuccess) {
      const deletedId: number = deletedTodo.deletedId as number;
      setTodoArray(todoArray.filter((el) => el.id !== deletedId));
    } else {
      alert("통신에 문제가 발생했습니다.");
    }
  };

  const handleCreateTodo = async (input: string) => {
    const createTodoResult = await createTodo(input);
    if (createTodoResult.data !== null) {
      setTodoArray([...todoArray, createTodoResult.data]);
    }
  };

  const initTodoList = async () => {
    const getTodoResult = await getTodo();
    setTodoArray([...getTodoResult.data]);
  };

  useEffect(() => {
    !hasAccessToken() && navigate("/signin", { replace: true });
  });

  useEffect(() => {
    initTodoList();
  }, []);

  return (
    <h1>
      투두페이지입니다.
      <input type='text' name='todo' value={input} onChange={handleInput} />
      <button onClick={() => handleCreateTodo(input)}>테스트 버튼</button>
      <ul>
        {todoArray.map((el) => (
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
    </h1>
  );
}
