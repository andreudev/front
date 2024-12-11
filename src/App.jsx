import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
    import Login from "./components/Login";
    import Register from "./components/Register";
    import Profile from "./components/Profile";
    import { useState, useEffect } from "react";

    function App() {
      const [isLoggedIn, setIsLoggedIn] = useState(false);

      useEffect(() => {
        const token = localStorage.getItem("token");
        setIsLoggedIn(!!token);
      }, []);

      return (
        <BrowserRouter>
          <Routes>
            <Route
              path="/"
              element={<Login setIsLoggedIn={setIsLoggedIn} />}
            />
            <Route
              path="/register"
              element={<Register />}
            />
            <Route
              path="/profile"
              element={isLoggedIn ? <Profile /> : <Login />}
            />
          </Routes>
        </BrowserRouter>
      );
    }

    export default App;
