const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Lawyer = require('./Lawyer');

const User = sequelize.define('User', {
  id_usuario: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  correo: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false,
  },
  contrasena: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  rol: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  id_abogado: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: Lawyer, // Reference to Lawyer model
      key: 'id_abogado',
    },
  },
  fecha_creacion: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
  fecha_actualizacion: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
  borrado_logico: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  }
}, {
  tableName: 'usuarios',
  timestamps: false,
});

module.exports = User;
