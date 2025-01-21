import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LoginPage from "./components/Auth/login";
import RegisterPage from "./components/Auth/register";
import ImportUsers from "./components/importuser";
import ExportUsers from "./components/exportuser";
import UserDashboard from "./components/usersDashboard";
import PrivateRoute from "./components/privateroute";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/import-users" element={<PrivateRoute component={ImportUsers} />} />
        <Route path="/export-users" element={<PrivateRoute component={ExportUsers} />} />
        <Route path="/dashboard" element={<PrivateRoute component={UserDashboard} />} />
      </Routes>
    </Router>
  );
}

export default App;
