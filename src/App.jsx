import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./components/Home";
import CreateUser from "./components/CreateUser";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import UpdateUser from "./components/UpdateUser";
function App() {
  return (
    <BrowserRouter>
      <ToastContainer />
      <Routes>
        <Route path="/" element={<CreateUser />} />
        <Route path="/create-user" element={<CreateUser />} />
        <Route path="/update-user" element={<UpdateUser />} />
        {/* <Route path="/read-user" element={<ReadUser />} /> */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
