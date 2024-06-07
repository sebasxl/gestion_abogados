const { CaseFollowUp, Case } = require('../models');

// Crear una nueva entrada de seguimiento
exports.createCaseFollowUp = async (req, res) => {
  const { id_caso, fecha, resumen, descripcion, observaciones, categoria } = req.body;

  try {
    const newFollowUp = await CaseFollowUp.create({
      id_caso,
      fecha,
      resumen,
      descripcion,
      observaciones,
      categoria,
    });

    res.status(201).json({ message: 'Entrada de seguimiento creada exitosamente', followUp: newFollowUp });
  } catch (error) {
    res.status(500).json({ message: 'Error al crear la entrada de seguimiento', error });
  }
};

// Obtener todas las entradas de seguimiento de un caso
exports.getCaseFollowUps = async (req, res) => {
  const { id_caso } = req.params;

  try {
    const followUps = await CaseFollowUp.findAll({
      where: { id_caso, borrado_logico: false }
    });
    res.status(200).json(followUps);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener las entradas de seguimiento', error });
  }
};

// Actualizar una entrada de seguimiento
exports.updateCaseFollowUp = async (req, res) => {
  const { id } = req.params;
  const { resumen, descripcion, observaciones, categoria } = req.body;

  try {
    const followUp = await CaseFollowUp.findByPk(id);
    if (!followUp || followUp.borrado_logico) {
      return res.status(404).json({ message: 'Entrada de seguimiento no encontrada' });
    }

    await followUp.update({
      resumen,
      descripcion,
      observaciones,
      categoria,
    });

    res.status(200).json({ message: 'Entrada de seguimiento actualizada exitosamente', followUp });
  } catch (error) {
    res.status(500).json({ message: 'Error al actualizar la entrada de seguimiento', error });
  }
};

// Eliminar una entrada de seguimiento
exports.deleteCaseFollowUp = async (req, res) => {
  const { id } = req.params;

  try {
    const followUp = await CaseFollowUp.findByPk(id);
    if (!followUp || followUp.borrado_logico) {
      return res.status(404).json({ message: 'Entrada de seguimiento no encontrada' });
    }

    await followUp.update({ borrado_logico: true });

    res.status(200).json({ message: 'Entrada de seguimiento eliminada exitosamente' });
  } catch (error) {
    res.status(500).json({ message: 'Error al eliminar la entrada de seguimiento', error });
  }
};
