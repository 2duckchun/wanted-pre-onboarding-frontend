import { useState } from "react";

type PropsType = {
  id: number;
  todo: string;
  isCompleted: boolean;
  updateTodoFn: (todoText: string, checkYn: boolean, id: number) => void;
  deleteTodoFn: (id: number) => void;
};

export default function TodoListCard({
  id,
  todo,
  isCompleted,
  updateTodoFn,
  deleteTodoFn,
}: PropsType) {
  const [isModifyMode, setIsModifyMode] = useState(false);
  const [isChecked, setIsChecked] = useState(isCompleted);
  const [todoInput, setTodoInput] = useState(todo);

  const handleTodoInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTodoInput(e.target.value);
  };

  // 수정 상태가 아닐 때 체크박스를 누르면 체크박스의 업데이트만 진행되도록 함
  const handleOnlyUpdateCheckbox = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setIsChecked(() => e.target.checked);
    if (!isModifyMode) updateTodoFn(todoInput, e.target.checked, id);
  };

  // 수정 버튼을 클릭하면 ModifyMode가 켜짐.
  // 취소 버튼을 클릭하면 ModifyMode가 꺼지고, 기존 상태로 리셋
  const handleModifying = (flag: boolean) => {
    if (flag) {
      setIsModifyMode(flag);
      return;
    }
    setIsModifyMode(flag);
    setTodoInput(todo);
    setIsChecked(isCompleted);
  };

  // ModifyMode에서 수정을 한 후 제출을 클릭하면 API통신을 보낸 뒤 ModifyMode를 끔.
  const handleUpdateTodo = (
    todoInput: string,
    isChecked: boolean,
    id: number
  ) => {
    updateTodoFn(todoInput, isChecked, id);
    setIsModifyMode(false);
  };

  const handleDeleteTodo = (id: number) => {
    deleteTodoFn(id);
  };

  return (
    <li>
      <label>
        <input
          type='checkbox'
          checked={isChecked}
          onChange={handleOnlyUpdateCheckbox}
        />
        {isModifyMode ? (
          <input type='text' value={todoInput} onChange={handleTodoInput} />
        ) : (
          <span>{todoInput}</span>
        )}
      </label>
      {isModifyMode ? (
        <button onClick={() => handleUpdateTodo(todoInput, isChecked, id)}>
          제출
        </button>
      ) : (
        <button
          data-testid='modify-button'
          onClick={() => handleModifying(true)}
        >
          수정
        </button>
      )}

      {isModifyMode ? (
        <button
          data-testid='delete-button'
          onClick={() => handleModifying(false)}
        >
          취소
        </button>
      ) : (
        <button
          data-testid='delete-button'
          onClick={() => handleDeleteTodo(id)}
        >
          삭제
        </button>
      )}
    </li>
  );
}
