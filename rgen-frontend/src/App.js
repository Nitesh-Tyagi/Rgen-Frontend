// App.js
import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";

// COMPONENTS
import Navbar from "./components/Navbar/navbar";
import Sidebar from "./components/Sidebar/sidebar";

// PAGES
import Analytics from "./pages/Analytics/analytics";
import Dashboard from "./pages/Dashboard/dashboard";
import History from "./pages/History/history";
import Login from "./pages/Login/login";
import Pricing from "./pages/Pricing/pricing";
import Settings from "./pages/Settings/settings";

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [userId, setUserId] = useState("");
  const [vidId, setVidId] = useState("");

  const handleLogin = (userId) => {
    setUserId(userId);
    setLoggedIn(true);
  };

  const handleLogout = () => {
    setLoggedIn(false);
    setUserId("");
    setVidId("");
  };

  return (
    <div>
      <Router>
        {loggedIn && (
          <>
            <Navbar onLogout={handleLogout} userId={userId} />
            <Sidebar userId={userId} setVidId={setVidId} />
            <div className="absolute w-3/5 bottom-16 left-1/3 top-32 bg-lime-600 rounded-3xl">
              <Routes>
                <Route
                  path="/dashboard"
                  element={<Dashboard userId={userId} vidId={vidId} />}
                />
                <Route path="/analytics" element={<Analytics />} />
                <Route path="/history" element={<History />} />
                <Route path="/pricing" element={<Pricing />} />
                <Route path="/settings" element={<Settings userId={userId} />} />
              </Routes>
            </div>
          </>
        )}

        <Routes>
          <Route
            path="/"
            element={loggedIn ? <Navigate to="/dashboard" /> : <Login onLogin={handleLogin} />}
          />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
