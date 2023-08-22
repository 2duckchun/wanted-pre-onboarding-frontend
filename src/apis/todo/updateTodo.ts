import { API_PATH } from "../../constants/apiPath";
import axios from "axios";
import getAccessToken from "../../utils/getAccessToken";
import { updateTodoDTO, updateTodoResult } from "../../types/todo.js";

const updateTodo = async (todo: string, isCompleted: boolean, id: number) => {
  const url = `/todos/${id}`;
  const updateTodoDTO: updateTodoDTO = await updateTodoInstance({
    method: "PUT",
    url: url,
    data: {
      todo,
      isCompleted,
    },
  });

  const updateTodoResult: updateTodoResult = {
    data: null,
    message: "",
    isSuccess: false,
  };

  if (updateTodoDTO?.status === 200) {
    updateTodoResult.data = updateTodoDTO.data;
    updateTodoResult.message = "200 OK";
    updateTodoResult.isSuccess = true;
  } else {
    updateTodoResult.message = "통신 도중 에러가 발생했습니다.";
    updateTodoResult.isSuccess = false;
  }

  return updateTodoResult;
};

const updateTodoInstance = axios.create({
  baseURL: API_PATH,
  headers: {
    "Content-type": "application/json",
  },
  timeout: 5000,
});

updateTodoInstance.interceptors.request.use(
  config => {
    config.headers["Authorization"] = `Bearer ${getAccessToken()}`;
    return config;
  },
  error => {
    return error;
  },
);

updateTodoInstance.interceptors.response.use(
  response => {
    const res = response;
    return res;
  },
  error => {
    return error;
  },
);

export default updateTodo;
