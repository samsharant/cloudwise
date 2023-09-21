import "./App.css";
import { useState } from "react";
import Dashboard from "./Components/Dashboard/Dashboard";
import Inventory from "./Components/Inventory/Inventory";

//routes
import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./Components/LoginPage/Login";
import ErrorBoundary from "./Components/ErrorBoundary/ErrorBoundary";
import LandingPage from "./Components/LandingPage/LandingPage";
import SignUpPage from "./Components/SignUpPage/SignUpPage";

function App() {
  const [loggedIn, setLoggedIn] = useState(true);

  return (
    <ErrorBoundary>
      <div data-testid="app-component" className="App">
        <Routes>
          <Route path="/login" element={<Login updateLogin={setLoggedIn} />} />
          <Route
            path="/dashboard"
            element={loggedIn ? <Dashboard /> : <Navigate to="/login" />}
          />
          <Route
            path="/inventory"
            element={loggedIn ? <Inventory /> : <Navigate to="/login" />}
          />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="*" element={<LandingPage isLoggedIn={loggedIn} />} />
        </Routes>
      </div>
    </ErrorBoundary>
  );
}

export default App;
