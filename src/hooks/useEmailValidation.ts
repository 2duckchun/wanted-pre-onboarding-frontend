import { useEffect, useState } from "react";
import { emailRegex } from "../constants/validationRegex";

export default function useEmailValidation(email: string) {
  const [isValid, setIsValid] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    if (emailRegex.test(email)) {
      setIsValid(true);
      setErrorMessage("유효한 이메일입니다.");
    } else {
      setIsValid(false);
      setErrorMessage("이메일에 @를 꼭 포함해주세요.");
    }
  }, [email]);

  return [isValid, errorMessage];
}
