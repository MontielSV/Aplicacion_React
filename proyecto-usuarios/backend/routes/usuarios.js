const express = require("express");
const router = express.Router();
const connection = require("../config/database");
const bcrypt = require("bcrypt");

// ----------------------------------------------------
// LISTAR TODOS LOS USUARIOS
// ----------------------------------------------------
router.get("/", (req, res) => {
    connection.query("SELECT * FROM usuarios", (err, rows) => {
        if (err) {
            console.log(err);
            res.status(500).json({ error: 'Error consultando usuarios' });
            return;
        }
        res.json(rows);
    });
});

// ----------------------------------------------------
// CREAR USUARIO (con password en HASH)
// ----------------------------------------------------
router.post("/", async (req, res) => {
    const { nombre, email, telefono, password } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);

    const sql = "INSERT INTO usuarios (nombre, email, telefono, password) VALUES (?, ?, ?, ?)";
    connection.query(sql, [nombre, email, telefono, hashedPassword], (err, result) => {
        if (err) {
            console.log(err);
            res.status(500).json({ error: "Error insertando usuario" });
            return;
        }
        res.json({ message: "Usuario creado correctamente", id: result.insertId });
    });
});

// ----------------------------------------------------
// ACTUALIZAR USUARIO
// ----------------------------------------------------
router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const { nombre, email, telefono, password } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);

    const sql = `UPDATE usuarios SET nombre=?, email=?, telefono=?, password=? WHERE id=?`;
    connection.query(sql, [nombre, email, telefono, hashedPassword, id], (err, result) => {
        if (err) {
            console.log(err);
            res.status(500).json({ error: "Error actualizando usuario" });
            return;
        }
        res.json({ message: "Usuario actualizado correctamente" });
    });
});

// ----------------------------------------------------
// ELIMINAR USUARIO
// ----------------------------------------------------
router.delete('/:id', (req, res) => {
    const { id } = req.params;

    const sql = `DELETE FROM usuarios WHERE id=?`;
    connection.query(sql, [id], (err, result) => {
        if (err) {
            console.log(err);
            res.status(500).json({ error: "Error eliminando usuario" });
            return;
        }
        res.json({ message: "Usuario eliminado correctamente" });
    });
});

// ----------------------------------------------------
// LOGIN USUARIO
// ----------------------------------------------------
router.post('/login', (req, res) => {
    const { email, password } = req.body;

    const sql = "SELECT * FROM usuarios WHERE email = ?";
    connection.query(sql, [email], async (err, rows) => {
        if (err) {
            console.log(err);
            return res.status(500).json({ error: "Error en consulta" });
        }

        if (rows.length === 0) {
            return res.status(401).json({ error: "Usuario no existe" });
        }

        const user = rows[0];

        const match = await bcrypt.compare(password, user.password);
        if (!match) {
            return res.status(401).json({ error: "Credenciales incorrectas" });
        }

        return res.json({ message: "Login correcto", user });
    });
});

module.exports = router;
