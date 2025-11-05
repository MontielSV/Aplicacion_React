import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const API_LOGIN = "https://solid-space-guide-jj97w477j96r2pwqq-5001.app.github.dev/api/usuarios/login";

  const handleLogin = async (e) => {
    e.preventDefault();
    setErrorMsg("");

    try {
      const res = await axios.post(API_LOGIN, { email, password });

      // guardar usuario en localStorage
      localStorage.setItem("user", JSON.stringify({
        id: res.data.user.id,
        email: res.data.user.email
      }));

      navigate("/usuarios"); // redirige al CRUD
    } catch (err) {
      console.log(err);
      setErrorMsg("Credenciales incorrectas ❌");
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
      <div className="card shadow p-4" style={{ width: "360px", borderTop: "4px solid red" }}>
        <h2 className="text-center" style={{ color: "red", fontWeight: "bold" }}>SANMIT</h2>
        <h5 className="text-center mb-4">Iniciar Sesión</h5>

        {errorMsg && <div className="alert alert-danger text-center">{errorMsg}</div>}

        <form onSubmit={handleLogin}>
          <div className="mb-3">
            <label>Email</label>
            <input type="email" className="form-control"
              value={email} onChange={e => setEmail(e.target.value)} required />
          </div>

          <div className="mb-3">
            <label>Contraseña</label>
            <input type="password" className="form-control"
              value={password} onChange={e => setPassword(e.target.value)} required />
          </div>

          <button type="submit" className="btn w-100" style={{ background: "red", color: "white" }}>
            Ingresar
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
