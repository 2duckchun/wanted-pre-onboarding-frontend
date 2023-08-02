import { useState } from "react";
import usePwdValidation from "../../hooks/usePwdValidation";
import useEmailValidation from "../../hooks/useEmailValidation";

export default function SignUp() {
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

  return (
    <main>
      <h1>로그인</h1>
      <form>
        <div>
          <label htmlFor='email'>이메일</label>
          <input
            id='email'
            name='email'
            data-testid='email-input'
            onChange={handleInput}
          />
        </div>
        <div>
          <label htmlFor='password'>패스워드</label>
          <input
            id='password'
            name='password'
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
