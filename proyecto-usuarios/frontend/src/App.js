import './App.css';
import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./components/Login";
import UserList from "./components/UserList";
import CreateUser from "./components/CreateUser";
import ProtectedRoute from "./ProtectedRoute";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* 🔐 Ruta de Login */}
        <Route path="/login" element={<Login />} />

        {/* 🔒 Rutas protegidas */}
        <Route
          path="/usuarios"
          element={
            <ProtectedRoute>
              <div>

                {/* 🔺 NAVBAR SANMIT */}
                <nav className="navbar-sanmit">
                  <div className="d-flex align-items-center">
                    <img src="/images/logo-sanmit.png" alt="SANMIT" />
                    <span className="fw-bold fs-4">SANMIT</span>
                  </div>
                  <button
                    className="btn-sanmit"
                    onClick={() => {
                      localStorage.removeItem("user");
                      window.location.href = "/login";
                    }}
                  >
                    Cerrar Sesión
                  </button>
                </nav>

                {/* 🔹 Panel principal */}
                <h1 className="text-center mt-4">Panel de Usuarios SANMIT</h1>

                <div className="container mt-4">
                  <CreateUser />
                  <hr />
                  <UserList />
                </div>
              </div>
            </ProtectedRoute>
          }
        />

        {/* 🏠 Redirección raíz */}
        <Route path="/" element={<Navigate to="/login" />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
