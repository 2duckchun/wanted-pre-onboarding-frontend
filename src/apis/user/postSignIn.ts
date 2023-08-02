import { API_PATH } from "../../constants/apiPath";
import axios from "axios";

const postSignIn = async (email: string, password: string) => {
  const url = "/auth/signin";
  const data: any = await signInInstance({
    method: "post",
    url: url,
    data: {
      email: email,
      password: password,
    },
  });

  const signInResult = {
    accessToken: null,
    message: "",
    isSuccess: false,
  };

  if (data?.status === 200) {
    signInResult.accessToken = data.data.access_token;
    signInResult.message = "로그인에 성공하셨습니다.";
    signInResult.isSuccess = true;
  } else {
    signInResult.message = "이메일 또는 비밀번호가 틀렸습니다.";
    signInResult.isSuccess = false;
  }

  return signInResult;
};

const signInInstance = axios.create({
  baseURL: API_PATH,
  headers: {
    "Content-type": "application/json",
  },
  timeout: 5000,
});

signInInstance.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    return null;
  }
);

signInInstance.interceptors.response.use(
  (response) => {
    const res = response;
    return res;
  },
  (error) => {
    return error;
  }
);

export default postSignIn;
