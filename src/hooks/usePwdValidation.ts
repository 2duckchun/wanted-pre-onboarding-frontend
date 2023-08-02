import { useEffect, useState } from "react";
import { pwdRegex } from "../constants/validationRegex";

export default function usePwdValidation(password: string) {
  const [isValid, setIsValid] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    if (pwdRegex.test(password)) {
      setIsValid(true);
      setErrorMessage("유효한 비밀번호 입니다.");
    } else {
      setIsValid(false);
      setErrorMessage("비밀번호를 8자리 이상 입력해주세요.");
    }
  }, [password]);

  return [isValid, errorMessage];
}
