require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const sequelize = require('./src/config/database');
const userRoutes = require('./src/routes/userRoutes');
const lawyerRoutes = require('./src/routes/lawyerRoutes');
const caseRoutes = require('./src/routes/caseRoutes');
const caseFollowUpRoutes = require('./src/routes/caseFollowUpRoutes');
const organizationRoutes = require('./src/routes/organizationRoutes');
const testRoutes = require('./src/routes/testRoutes');
const auth = require('./src/middleware/auth');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());

// Configurar CORS
const corsOptions = {
  origin: 'http://localhost:5173',
  optionsSuccessStatus: 200,
};
app.use(cors(corsOptions));

// Rutas
app.use('/api/users', userRoutes);
app.use('/api/lawyers', auth, lawyerRoutes);
app.use('/api/cases', auth, caseRoutes);
app.use('/api/case-followups', auth, caseFollowUpRoutes);
app.use('/api/organizations', organizationRoutes);
app.use('/api', testRoutes); // Añadir esta línea

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
