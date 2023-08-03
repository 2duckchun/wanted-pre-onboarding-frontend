import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import postSignIn from "../../apis/user/postSignIn";
import saveAccessToken from "../../utils/saveAccessToken";
import useEmailValidation from "../../hooks/useEmailValidation";
import usePwdValidation from "../../hooks/usePwdValidation";
import CustomButton from "../../components/common/CustomButton";
import CustomInput from "../../components/common/CustomInput";
import hasAccessToken from "../../utils/hasAccessToken";
import styles from "./SignIn.module.css";

export default function SignIn() {
  const navigate = useNavigate();
  const [input, setInput] = useState({
    email: "",
    password: "",
  });
  const [isEmailValid] = useEmailValidation(input.email);
  const [isPwdValid] = usePwdValidation(input.password);

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
  };

  // 로그인이 성공하면 access token을 localStorage에 저장하고 /todo로 이동
  const handleSubmit = async (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    const signInResult = await postSignIn(input.email, input.password);
    if (signInResult.isSuccess) {
      alert(signInResult.message);
      saveAccessToken(signInResult.accessToken);
      navigate("/todo");
    } else {
      alert(signInResult.message);
    }
  };

  useEffect(() => {
    hasAccessToken() && navigate("/todo", { replace: true });
  }, [navigate]);

  return (
    <main>
      <h1 className={styles.page_title}>로그인</h1>
      <form onSubmit={handleSubmit}>
        <CustomInput
          labelFor='email'
          labelText='email'
          id='email'
          name='email'
          type='email'
          value={input.email}
          testid='email-input'
          onChangeHandler={handleInput}
        />
        <CustomInput
          labelFor='password'
          labelText='password'
          id='password'
          name='password'
          type='password'
          value={input.password}
          testid='password-input'
          onChangeHandler={handleInput}
        />
        <CustomButton
          testid='signin-button'
          buttonText={"로그인"}
          isDisabled={isEmailValid && isPwdValid ? false : true}
        />
      </form>
    </main>
  );
}
