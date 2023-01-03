import logo from "./logo.svg";
import "./App.css";
import {
  BrowserRouter,
  Route,
  Routes,
  Switch,
  Link,
  NavLink,
  redirect,
  useNavigate,
} from "react-router-dom";
import Login from "./pages/login/Login";
import SignUp from "./pages/signup/SignUp";
import Home from "./components/Home/Home";
import Tools from "./pages/tools/Tools";
import Logout from "./pages/logout/Logout";
import Results from "./pages/tools/Results";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/tools" element={<Tools />} />
          <Route path="/tools/:name" element={<Results />} />


        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
