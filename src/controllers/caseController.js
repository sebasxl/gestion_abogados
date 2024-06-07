const { Case, CaseFollowUp, User } = require('../models');

// Crear un nuevo caso
exports.createCase = async (req, res) => {
  const { id_cliente, numero_caso, estado, tipo_caso } = req.body;

  try {
    const newCase = await Case.create({
      id_cliente,
      numero_caso,
      estado,
      tipo_caso,
    });

    res.status(201).json({ message: 'Caso creado exitosamente', case: newCase });
  } catch (error) {
    res.status(500).json({ message: 'Error al crear el caso', error });
  }
};

// Obtener todos los casos
exports.getAllCases = async (req, res) => {
  try {
    const cases = await Case.findAll({
      where: { borrado_logico: false },
      include: [{
        model: User,
        attributes: ['correo']
      }]
    });
    res.status(200).json(cases);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener los casos', error });
  }
};

// Obtener un caso por ID
exports.getCaseById = async (req, res) => {
  const { id } = req.params;

  try {
    const caseItem = await Case.findByPk(id, {
      include: [{
        model: User,
        attributes: ['correo']
      }]
    });
    if (!caseItem || caseItem.borrado_logico) {
      return res.status(404).json({ message: 'Caso no encontrado' });
    }
    res.status(200).json(caseItem);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener el caso', error });
  }
};

// Actualizar un caso
exports.updateCase = async (req, res) => {
  const { id } = req.params;
  const { estado, tipo_caso } = req.body;

  try {
    const caseItem = await Case.findByPk(id);
    if (!caseItem || caseItem.borrado_logico) {
      return res.status(404).json({ message: 'Caso no encontrado' });
    }

    await caseItem.update({
      estado,
      tipo_caso,
    });

    res.status(200).json({ message: 'Caso actualizado exitosamente', case: caseItem });
  } catch (error) {
    res.status(500).json({ message: 'Error al actualizar el caso', error });
  }
};

// Eliminar un caso
exports.deleteCase = async (req, res) => {
  const { id } = req.params;

  try {
    const caseItem = await Case.findByPk(id);
    if (!caseItem || caseItem.borrado_logico) {
      return res.status(404).json({ message: 'Caso no encontrado' });
    }

    await caseItem.update({ borrado_logico: true });

    res.status(200).json({ message: 'Caso eliminado exitosamente' });
  } catch (error) {
    res.status(500).json({ message: 'Error al eliminar el caso', error });
  }
};
