import { API_PATH } from "../../constants/apiPath.ts";
import axios from "axios";
import getAccessToken from "../../utils/getAccessToken";
import { deleteTodoDTO, deleteTodoResult } from "../../types/todo.js";

const deleteTodo = async (id: number) => {
  const url = `/todos/${id}`;
  const deleteTodoDTO: deleteTodoDTO = await deleteTodoInstance({
    method: "DELETE",
    url: url,
  });

  console.log(deleteTodoDTO);

  const deleteTodoResult: deleteTodoResult = {
    deletedId: null,
    message: "",
    isSuccess: false,
  };

  if (deleteTodoDTO?.status === 204) {
    deleteTodoResult.deletedId = id;
    deleteTodoResult.message = "204 OK";
    deleteTodoResult.isSuccess = true;
  } else {
    deleteTodoResult.message = "통신 도중 에러가 발생했습니다.";
    deleteTodoResult.isSuccess = false;
  }

  return deleteTodoResult;
};

const deleteTodoInstance = axios.create({
  baseURL: API_PATH,
  headers: {
    Authorization: `Bearer ${getAccessToken()}`,
  },
  timeout: 5000,
});

deleteTodoInstance.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    return error;
  }
);

deleteTodoInstance.interceptors.response.use(
  (response) => {
    const res = response;
    return res;
  },
  (error) => {
    return error;
  }
);

export default deleteTodo;
