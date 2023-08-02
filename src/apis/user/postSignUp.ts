import { API_PATH } from "../../constants/apiPath";
import axios from "axios";

const postSignUp = async (email: string, password: string) => {
  const url = "/auth/signup";
  const data: any = await signUpInstance({
    method: "post",
    url: url,
    data: {
      email: email,
      password: password,
    },
  });

  const signUpResult = {
    message: "",
    isSuccess: false,
  };

  if (data?.status === 201) {
    signUpResult.message = "회원가입에 성공하셨습니다.";
    signUpResult.isSuccess = true;
  } else {
    signUpResult.message = data?.response?.data?.message;
    signUpResult.isSuccess = false;
  }

  return signUpResult;
};

const signUpInstance = axios.create({
  baseURL: API_PATH,
  headers: {
    "Content-type": "application/json",
  },
  timeout: 5000,
});

signUpInstance.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    console.log(error);
    return null;
  }
);

signUpInstance.interceptors.response.use(
  (response) => {
    const res = response;
    return res;
  },
  (error) => {
    console.log(error);
    return error;
  }
);

export default postSignUp;
