import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "../pages/home/Home";
import SignUp from "../pages/signup/SignUp";
import SignIn from "../pages/signin/SignIn";

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/signup' element={<SignUp />} />
        <Route path='/signin' element={<SignIn />} />
      </Routes>
    </BrowserRouter>
  );
}
