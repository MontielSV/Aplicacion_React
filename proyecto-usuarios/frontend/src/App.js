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

        {/* ruta login */}
        <Route path="/login" element={<Login />} />

        {/* rutas protegidas */}
        <Route
          path="/usuarios"
          element={
            <ProtectedRoute>
              <div>
                {/* NAVBAR SANMIT */}
                <nav className="navbar navbar-dark" style={{ backgroundColor: "red" }}>
                  <div className="container">
                    <span className="navbar-brand mb-0 h1">SANMIT</span>

                    <button
                      className="btn btn-light btn-sm"
                      onClick={() => {
                        localStorage.removeItem("user");
                        window.location.href = "/login";
                      }}
                    >
                      Cerrar Sesión
                    </button>
                  </div>
                </nav>

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

        {/* redireccion raiz */}
        <Route path="/" element={<Navigate to="/login" />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
