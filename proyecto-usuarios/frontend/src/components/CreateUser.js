import React, { useState } from "react";
import axios from "axios";

function CreateUser() {
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [telefono, setTelefono] = useState("");
  const [password, setPassword] = useState("");

  const crearUsuario = async (e) => {
    e.preventDefault();
    try {
      await axios.post("https://solid-space-guide-jj97w477j96r2pwqq-5001.app.github.dev/api/usuarios", {
        nombre,
        email,
        telefono,
        password,
      });

      alert("Usuario creado correctamente ✅");
      
      setNombre("");
      setEmail("");
      setTelefono("");
      setPassword("");

    } catch (error) {
      console.log(error);
      alert("Error creando el usuario ❌");
    }
  };

  return (
    <div>
      <h2>Crear Usuario</h2>
      <form onSubmit={crearUsuario}>

        <input 
          type="text" 
          placeholder="Nombre" 
          value={nombre} 
          onChange={(e) => setNombre(e.target.value)} 
          required
        /><br/><br/>

        <input 
          type="email" 
          placeholder="Email" 
          value={email} 
          onChange={(e) => setEmail(e.target.value)} 
          required
        /><br/><br/>

        <input 
          type="text" 
          placeholder="Teléfono" 
          value={telefono} 
          onChange={(e) => setTelefono(e.target.value)} 
        /><br/><br/>

        <input 
          type="password" 
          placeholder="Password" 
          value={password} 
          onChange={(e) => setPassword(e.target.value)} 
          required
        /><br/><br/>

        <button type="submit">Guardar Usuario</button>
      </form>
    </div>
  );
}

export default CreateUser;