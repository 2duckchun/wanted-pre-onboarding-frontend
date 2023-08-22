import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import postSignUp from "../../apis/user/postSignUp";
import usePwdValidation from "../../hooks/usePwdValidation";
import useEmailValidation from "../../hooks/useEmailValidation";
import CustomInput from "../../components/common/CustomInput";
import CustomButton from "../../components/common/CustomButton";
import hasAccessToken from "../../utils/hasAccessToken";
import styles from "./SignUp.module.css";

export default function SignUp() {
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

  // 회원가입이 성공하면 /signin 페이지로 이동
  const handleSubmit = async (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    const signUpResult = await postSignUp(input.email, input.password);

    if (signUpResult.isSuccess) {
      alert(signUpResult.message);
      navigate("/signin");
    } else {
      alert(signUpResult.message);
    }
  };

  useEffect(() => {
    if (hasAccessToken()) {
      navigate("/todo", { replace: true });
    }
  }, [navigate]);

  return (
    <main>
      <h1 className={styles.page_title}>회원가입</h1>
      <form onSubmit={handleSubmit}>
        <CustomInput
          labelFor="email"
          labelText="email"
          id="email"
          name="email"
          type="email"
          value={input.email}
          testid="email-input"
          onChangeHandler={handleInput}
        />
        <CustomInput
          labelFor="password"
          labelText="password"
          id="password"
          name="password"
          type="password"
          value={input.password}
          testid="password-input"
          onChangeHandler={handleInput}
        />
        <CustomButton
          testid="signup-button"
          isDisabled={isEmailValid && isPwdValid ? false : true}
          buttonText="회원가입"
        />
      </form>
    </main>
  );
}
