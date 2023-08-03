import { NavLink, Outlet, useNavigate } from "react-router-dom";
import styles from "./Header.module.css";
import getAccessToken from "../../utils/getAccessToken";

export default function Header() {
  const navigate = useNavigate();

  const setLogout = () => {
    localStorage.removeItem("access_token");
    navigate("/");
  };

  const goToSignInPage = () => {
    navigate("/signin");
  };

  return (
    <>
      <header className={styles.header_container}>
        <p className={styles.header_logo} onClick={() => navigate("/")}>
          FreeOnTodo
        </p>
        <ul className={styles.header_ul}>
          <li>
            <NavLink
              to='/signup'
              className={({ isActive }) =>
                isActive ? styles.header_link_active : styles.header_link
              }
            >
              /signup
            </NavLink>
          </li>

          <li>
            <NavLink
              to='/signin'
              className={({ isActive }) =>
                isActive ? styles.header_link_active : styles.header_link
              }
            >
              /signin
            </NavLink>
          </li>

          <li>
            <NavLink
              to='/todo'
              className={({ isActive }) =>
                isActive ? styles.header_link_active : styles.header_link
              }
            >
              /todo
            </NavLink>
          </li>
        </ul>
        <div className={styles.header_button_container}>
          {getAccessToken() ? (
            <button onClick={setLogout}>로그아웃</button>
          ) : (
            <button onClick={goToSignInPage}>로그인</button>
          )}
        </div>
      </header>
      <Outlet />
    </>
  );
}
