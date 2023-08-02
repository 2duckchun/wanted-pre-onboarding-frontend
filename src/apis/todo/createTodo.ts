import { API_PATH } from "../../constants/apiPath";
import axios from "axios";
import getAccessToken from "../../utils/getAccessToken";
import { createTodoDTO, createTodoResult } from "../../types/todo.js";

const createTodo = async (todo: string) => {
  const url = "/todos";
  const createTodoDTO: createTodoDTO = await createTodoInstance({
    method: "post",
    url: url,
    data: {
      todo: todo,
    },
  });

  const createTodoResult: createTodoResult = {
    data: null,
    message: "",
    isSuccess: false,
  };

  if (createTodoDTO?.status === 201) {
    createTodoResult.data = createTodoDTO.data;
    createTodoResult.message = "201 OK";
    createTodoResult.isSuccess = true;
  } else {
    createTodoResult.message = "통신 도중 에러가 발생했습니다.";
    createTodoResult.isSuccess = false;
  }

  return createTodoResult;
};

const createTodoInstance = axios.create({
  baseURL: API_PATH,
  headers: {
    "Content-type": "application/json",
    Authorization: `Bearer ${getAccessToken()}`,
  },
  timeout: 5000,
});

createTodoInstance.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    return error;
  }
);

createTodoInstance.interceptors.response.use(
  (response) => {
    const res = response;
    return res;
  },
  (error) => {
    return error;
  }
);

export default createTodo;
