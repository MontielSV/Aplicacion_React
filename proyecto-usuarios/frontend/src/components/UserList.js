import React, { useEffect, useState } from "react";
import axios from "axios";

function UserList() {

  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios.get("https://solid-space-guide-jj97w477j96r2pwqq-5001.app.github.dev/api/usuarios")
      .then(res => {
        setUsers(res.data);
      })
      .catch(err => {
        console.log("Error axios:", err);
      });
  }, []);

  return (
    <div>
      <h2>Lista de Usuarios</h2>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Email</th>
          </tr>
        </thead>
        <tbody>
          {users.map(u => (
            <tr key={u.id}>
              <td>{u.id}</td>
              <td>{u.nombre}</td>
              <td>{u.email}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default UserList;
