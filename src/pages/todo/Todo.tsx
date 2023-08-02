import { useEffect } from "react";
import hasAccessToken from "../../utils/hasAccessToken";
import { useNavigate } from "react-router-dom";

export default function Todo() {
  const navigate = useNavigate();

  useEffect(() => {
    !hasAccessToken() && navigate("/signin", { replace: true });
  });

  return <h1>투두페이지입니다.</h1>;
}
