import { useState } from "react";
import useEmailValidation from "../../hooks/useEmailValidation";
import usePwdValidation from "../../hooks/usePwdValidation";
import postSignIn from "../../apis/postSignIn";
import { useNavigate } from "react-router-dom";
import saveAccessToken from "../../utils/saveAccessToken";

export default function SignIn() {
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
    const signInResult = await postSignIn(input.email, input.password);
    console.log(signInResult);
    if (signInResult.isSuccess) {
      alert(signInResult.message);
      saveAccessToken(signInResult.accessToken);
      navigator("/todo");
    } else {
      alert(signInResult.message);
    }
  };

  return (
    <main>
      <h1>로그인</h1>
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
          data-testid='signin-button'
          disabled={isEmailValid && isPwdValid ? false : true}
        >
          로그인
        </button>
      </form>
    </main>
  );
}
