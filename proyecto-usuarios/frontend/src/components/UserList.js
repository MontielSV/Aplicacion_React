import React, { useEffect, useState } from "react";
import axios from "axios";

function UserList() {

  const API = "https://solid-space-guide-jj97w477j96r2pwqq-5001.app.github.dev/api/usuarios";

  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  // PAGINACIÓN
  const [pagina, setPagina] = useState(1);
  const usuariosPorPagina = 5;

  const indexInicio = (pagina - 1) * usuariosPorPagina;
  const indexFinal = pagina * usuariosPorPagina;
  const usuariosPag = users.slice(indexInicio, indexFinal);

  const totalPaginas = Math.ceil(users.length / usuariosPorPagina);

  // modal
  const [showModal, setShowModal] = useState(false);
  const [editingUser, setEditingUser] = useState(null);

  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [telefono, setTelefono] = useState("");
  const [password, setPassword] = useState("");

  const cargarUsuarios = async () => {
    setLoading(true);
    try {
      const res = await axios.get(API);
      setUsers(res.data);
    } catch (err) {
      alert("Error cargando usuarios");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    cargarUsuarios();
  }, []);

  const eliminarUsuario = async (id) => {
    if (!window.confirm("¿Seguro que quieres eliminar este usuario?")) return;
    try {
      await axios.delete(`${API}/${id}`);
      alert("Usuario eliminado ✅");
      cargarUsuarios();
    } catch (err) {
      alert("Error eliminando usuario");
    }
  };

  const abrirModalEditar = (user) => {
    setEditingUser(user);
    setNombre(user.nombre);
    setEmail(user.email);
    setTelefono(user.telefono);
    setPassword("");
    setShowModal(true);
  };

  const cerrarModal = () => {
    setShowModal(false);
    setEditingUser(null);
    setNombre("");
    setEmail("");
    setTelefono("");
    setPassword("");
  };

  const guardarCambios = async (e) => {
    e.preventDefault();
    if (!editingUser) return;

    const payload = { nombre, email, telefono, password };

    try {
      await axios.put(`${API}/${editingUser.id}`, payload);
      alert("Usuario actualizado ✅");
      cerrarModal();
      cargarUsuarios();
    } catch {
      alert("Error actualizando usuario");
    }
  };

  return (
    <div className="container mt-4">

      <h2 className="mb-4">Lista de Usuarios</h2>

      {!loading ? (
        <>
          <div className="table-responsive">
            <table className="table table-bordered table-hover">
              <thead className="table-dark">
                <tr>
                  <th>ID</th>
                  <th>Nombre</th>
                  <th>Email</th>
                  <th>Teléfono</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {usuariosPag.length === 0 ? (
                  <tr><td colSpan="5" className="text-center">No hay usuarios</td></tr>
                ) : (
                  usuariosPag.map(u => (
                    <tr key={u.id}>
                      <td>{u.id}</td>
                      <td>{u.nombre}</td>
                      <td>{u.email}</td>
                      <td>{u.telefono}</td>
                      <td>
                        <button className="btn btn-sm btn-primary me-2" onClick={() => abrirModalEditar(u)}>Editar ✏️</button>
                        <button className="btn btn-sm btn-danger" onClick={() => eliminarUsuario(u.id)}>Eliminar 🗑️</button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* CONTROLES PAGINACIÓN */}
          {users.length > usuariosPorPagina && (
            <div className="d-flex justify-content-center gap-2 mt-3">
              <button className="btn btn-dark" disabled={pagina === 1} onClick={() => setPagina(pagina - 1)}>Anterior</button>
              <span>Página {pagina} de {totalPaginas}</span>
              <button className="btn btn-dark" disabled={pagina === totalPaginas} onClick={() => setPagina(pagina + 1)}>Siguiente</button>
            </div>
          )}
        </>
      ) : (
        <div className="alert alert-info text-center">Cargando usuarios...</div>
      )}

      {/* MODAL CODE same as was */}
      {showModal && (
        <div className="modal fade show" style={{ display: "block", backgroundColor: "rgba(0,0,0,0.5)" }} >
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <form onSubmit={guardarCambios}>
                <div className="modal-header">
                  <h5 className="modal-title">Editar Usuario — ID {editingUser?.id}</h5>
                  <button type="button" className="btn-close" onClick={cerrarModal}></button>
                </div>

                <div className="modal-body">
                  <div className="mb-3">
                    <label className="form-label">Nombre</label>
                    <input className="form-control" value={nombre} onChange={e => setNombre(e.target.value)} required />
                  </div>

                  <div className="mb-3">
                    <label className="form-label">Email</label>
                    <input type="email" className="form-control" value={email} onChange={e => setEmail(e.target.value)} required />
                  </div>

                  <div className="mb-3">
                    <label className="form-label">Teléfono</label>
                    <input className="form-control" value={telefono} onChange={e => setTelefono(e.target.value)} />
                  </div>

                  <div className="mb-3">
                    <label className="form-label">Password</label>
                    <input type="password" className="form-control" value={password} onChange={e => setPassword(e.target.value)} required />
                  </div>
                </div>

                <div className="modal-footer">
                  <button type="button" className="btn btn-secondary" onClick={cerrarModal}>Cancelar</button>
                  <button type="submit" className="btn btn-primary">Guardar cambios</button>
                </div>

              </form>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}

export default UserList;
