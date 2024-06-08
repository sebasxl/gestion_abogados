const express = require('express');
const router = express.Router();

router.get('/test', (req, res) => {
  res.status(200).json({ message: 'Conexión con la API exitosa' });
});

module.exports = router;
