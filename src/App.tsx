import { Routes, Route, Navigate } from "react-router-dom";
import { Register } from "./pages/Register";
import { Login } from "./pages/Login";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" />} />
      <Route path="/connexion" element={<Login />} />
      <Route path="/inscription" element={<Register />} />
    </Routes>
  );
}

export default App;
