import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "../components/layout/Header";
import Home from "../pages/home/Home";
import SignUp from "../pages/signup/SignUp";
import SignIn from "../pages/signin/SignIn";
import Todo from "../pages/todo/Todo";
import NotFound from "../pages/error/NotFound";

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path='/' element={<Home />} />
          <Route path='/signup' element={<SignUp />} />
          <Route path='/signin' element={<SignIn />} />
          <Route path='/todo' element={<Todo />} />
          <Route path='*' element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
