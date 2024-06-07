const express = require('express');
const bodyParser = require('body-parser');
const sequelize = require('./src/config/database');
const userRoutes = require('./src/routes/userRoutes');
const lawyerRoutes = require('./src/routes/lawyerRoutes');
const caseRoutes = require('./src/routes/caseRoutes');
const caseFollowUpRoutes = require('./src/routes/caseFollowUpRoutes');
const auth = require('./src/middleware/auth');

require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());

// Rutas
app.use('/api/users', userRoutes);
app.use('/api/lawyers', auth, lawyerRoutes); // Protegemos las rutas de abogados con autenticación
app.use('/api/cases', auth, caseRoutes); // Protegemos las rutas de casos con autenticación
app.use('/api/case-followups', auth, caseFollowUpRoutes); // Protegemos las rutas de seguimientos con autenticación

// Ruta protegida de ejemplo
app.get('/api/protected', auth, (req, res) => {
  res.status(200).json({ message: 'Acceso autorizado', user: req.user });
});

// Conectar a la base de datos y empezar el servidor
sequelize.sync()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Servidor corriendo en el puerto ${PORT}`);
    });
  })
  .catch(err => {
    console.error('Error al conectar a la base de datos:', err);
  });
