import { useState } from "react";
import usePwdValidation from "../../hooks/usePwdValidation";
import useEmailValidation from "../../hooks/useEmailValidation";
import postSignUp from "../../apis/postSignUp";
import { useNavigate } from "react-router-dom";

export default function SignUp() {
  const navigator = useNavigate();
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

  const handleSubmit = async (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    const signUpResult = await postSignUp(input.email, input.password);

    if (signUpResult.isSuccess) {
      alert(signUpResult.message);
      navigator("/signin");
    } else {
      alert(signUpResult.message);
    }
  };

  return (
    <main>
      <h1>회원가입</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor='email'>이메일</label>
          <input
            id='email'
            name='email'
            type='email'
            data-testid='email-input'
            onChange={handleInput}
          />
        </div>
        <div>
          <label htmlFor='password'>패스워드</label>
          <input
            id='password'
            name='password'
            type='password'
            data-testid='password-input'
            onChange={handleInput}
          />
        </div>
        <button
          data-testid='signup-button'
          disabled={isEmailValid && isPwdValid ? false : true}
        >
          회원가입
        </button>
      </form>
    </main>
  );
}
