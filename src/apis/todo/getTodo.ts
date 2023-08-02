import { API_PATH } from "../../constants/apiPath";
import axios from "axios";
import getAccessToken from "../../utils/getAccessToken";
import { getTodoDTO, getTodoResult } from "../../types/todo.js";

const getTodo = async () => {
  const url = "/todos";
  const getTodoDTO: getTodoDTO = await getTodoInstance({
    method: "get",
    url: url,
  });

  console.log(getTodoDTO);

  const getTodoResult: getTodoResult = {
    data: [],
    message: "",
    isSuccess: false,
  };

  if (getTodoDTO?.status === 200) {
    getTodoResult.data = getTodoDTO?.data;
    getTodoResult.message = "200 OK";
    getTodoResult.isSuccess = true;
  } else {
    getTodoResult.message = "통신 도중 에러가 발생했습니다.";
    getTodoResult.isSuccess = false;
  }

  return getTodoResult;
};

const getTodoInstance = axios.create({
  baseURL: API_PATH,
  headers: {
    Authorization: `Bearer ${getAccessToken()}`,
  },
  timeout: 5000,
});

getTodoInstance.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    return null;
  }
);

getTodoInstance.interceptors.response.use(
  (response) => {
    const res = response;
    return res;
  },
  (error) => {
    return error;
  }
);

export default getTodo;
