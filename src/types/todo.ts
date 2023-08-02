export type Todo = {
  id: number;
  isCompleted: boolean;
  todo: string;
  userId: number;
};

export type commonTodoDTO = {
  status: number;
  statusText: string;
};

export type commonTodoResult = {
  message: string;
  isSuccess: boolean;
};

export type createTodoDTO = commonTodoDTO & {
  data: Todo | null;
};

export type getTodoDTO = commonTodoDTO & {
  data: Todo[] | [];
};

export type updateTodoDTO = commonTodoDTO & {
  data: Todo | null;
};

export type deleteTodoDTO = commonTodoDTO & {
  deletedId: number | null;
};

export type createTodoResult = commonTodoResult & {
  data: Todo | null;
};

export type getTodoResult = commonTodoResult & {
  data: Todo[] | [];
};

export type updateTodoResult = commonTodoResult & {
  data: Todo | null;
};

export type deleteTodoResult = commonTodoResult & {
  deletedId: number | null;
};

export {};
