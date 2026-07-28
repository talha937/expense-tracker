import { BrowserRouter, Routes, Route } from "react-router-dom";
import AuthForm from "./components/AuthForm";
import NavBar from "./components/NavBar";
import Dashboard from "./pages/Dashboard";
import Budgets from "./pages/Budgets";
import { useAuth } from "./context/AuthContext";

function App() {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <AuthForm />;
  }

  return (
    <BrowserRouter>
      <div className="min-h-screen py-12 px-4">
        <NavBar />
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/budgets" element={<Budgets />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;