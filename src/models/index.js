const Sequelize = require('sequelize');
const sequelize = require('../config/database');

const User = require('./User');
const Lawyer = require('./Lawyer');
const Case = require('./Case');
const CaseFollowUp = require('./CaseFollowUp');

// Definir relaciones
User.belongsTo(Lawyer, { foreignKey: 'id_abogado', targetKey: 'id_abogado' });
Lawyer.hasOne(User, { foreignKey: 'id_abogado', sourceKey: 'id_abogado' });

Case.belongsTo(User, { foreignKey: 'id_cliente', targetKey: 'id_usuario' });
User.hasMany(Case, { foreignKey: 'id_cliente', sourceKey: 'id_usuario' });

CaseFollowUp.belongsTo(Case, { foreignKey: 'id_caso', targetKey: 'id_caso' });
Case.hasMany(CaseFollowUp, { foreignKey: 'id_caso', sourceKey: 'id_caso' });

const db = {
  sequelize,
  Sequelize,
  User,
  Lawyer,
  Case,
  CaseFollowUp,
};

module.exports = db;
