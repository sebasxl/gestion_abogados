const Organization = require('../models/Organization');

// Crear una organización
exports.createOrganization = async (req, res) => {
  const { nombre, direccion } = req.body;

  try {
    const newOrganization = await Organization.create({ nombre, direccion });
    res.status(201).json({ message: 'Organización creada exitosamente', organization: newOrganization });
  } catch (error) {
    res.status(500).json({ message: 'Error al crear la organización', error });
  }
};

// Obtener todas las organizaciones
exports.getAllOrganizations = async (req, res) => {
  try {
    const organizations = await Organization.findAll({ where: { borrado_logico: false } });
    res.status(200).json(organizations);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener las organizaciones', error });
  }
};

// Obtener una organización por ID
exports.getOrganizationById = async (req, res) => {
  const { id } = req.params;

  try {
    const organization = await Organization.findByPk(id);
    if (!organization) {
      return res.status(404).json({ message: 'Organización no encontrada' });
    }
    res.status(200).json(organization);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener la organización', error });
  }
};

// Actualizar una organización
exports.updateOrganization = async (req, res) => {
  const { id } = req.params;
  const { nombre, direccion } = req.body;

  try {
    const organization = await Organization.findByPk(id);
    if (!organization) {
      return res.status(404).json({ message: 'Organización no encontrada' });
    }

    await organization.update({ nombre, direccion, fecha_actualizacion: new Date() });
    res.status(200).json({ message: 'Organización actualizada exitosamente', organization });
  } catch (error) {
    res.status(500).json({ message: 'Error al actualizar la organización', error });
  }
};

// Eliminar una organización
exports.deleteOrganization = async (req, res) => {
  const { id } = req.params;

  try {
    const organization = await Organization.findByPk(id);
    if (!organization) {
      return res.status(404).json({ message: 'Organización no encontrada' });
    }

    await organization.update({ borrado_logico: true });
    res.status(200).json({ message: 'Organización eliminada exitosamente' });
  } catch (error) {
    res.status(500).json({ message: 'Error al eliminar la organización', error });
  }
};
