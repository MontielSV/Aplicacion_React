const express = require('express');
const router = express.Router();
const connection = require('../config/database');

router.get('/', (req, res) => {
  connection.query('SELECT * FROM usuarios', (err, rows) => {
    if (err) {
      console.log(err);
      res.status(500).json({ error: 'Error consultando usuarios' });
      return;
    }
    res.json(rows);
  });
});

module.exports = router;
