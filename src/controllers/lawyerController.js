const { Lawyer, User } = require('../models');

// Crear abogado
exports.createLawyer = async (req, res) => {
  const { nombre, apellido, especializacion, telefono, direccion, numero_matricula, correo } = req.body;

  try {
    // Buscar el usuario por correo
    const user = await User.findOne({ where: { correo, rol: 'abogado' } });
    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado o no tiene rol de abogado' });
    }

    // Crear el abogado
    const newLawyer = await Lawyer.create({
      nombre,
      apellido,
      especializacion,
      telefono,
      direccion,
      numero_matricula,
    });

    // Actualizar el id_abogado en la tabla de usuarios
    await user.update({ id_abogado: newLawyer.id_abogado });

    res.status(201).json({ message: 'Abogado creado exitosamente', lawyer: newLawyer });
  } catch (error) {
    res.status(500).json({ message: 'Error al crear el abogado', error });
  }
};

// Obtener todos los abogados
exports.getAllLawyers = async (req, res) => {
  try {
    const lawyers = await Lawyer.findAll({
      where: { borrado_logico: false },
      include: [{
        model: User,
        attributes: ['correo']
      }]
    });
    res.status(200).json(lawyers);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener los abogados', error });
  }
};

// Obtener un abogado por ID
exports.getLawyerById = async (req, res) => {
  const { id } = req.params;

  try {
    const lawyer = await Lawyer.findByPk(id, {
      include: [{
        model: User,
        attributes: ['correo']
      }]
    });
    if (!lawyer || lawyer.borrado_logico) {
      return res.status(404).json({ message: 'Abogado no encontrado' });
    }
    res.status(200).json(lawyer);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener el abogado', error });
  }
};

// Actualizar un abogado
exports.updateLawyer = async (req, res) => {
  const { id } = req.params;
  const { nombre, apellido, especializacion, telefono, direccion, numero_matricula } = req.body;

  try {
    const lawyer = await Lawyer.findByPk(id);
    if (!lawyer || lawyer.borrado_logico) {
      return res.status(404).json({ message: 'Abogado no encontrado' });
    }

    await lawyer.update({
      nombre,
      apellido,
      especializacion,
      telefono,
      direccion,
      numero_matricula,
    });

    res.status(200).json({ message: 'Abogado actualizado exitosamente', lawyer });
  } catch (error) {
    res.status(500).json({ message: 'Error al actualizar el abogado', error });
  }
};

// Eliminar un abogado
exports.deleteLawyer = async (req, res) => {
  const { id } = req.params;

  try {
    const lawyer = await Lawyer.findByPk(id);
    if (!lawyer || lawyer.borrado_logico) {
      return res.status(404).json({ message: 'Abogado no encontrado' });
    }

    await lawyer.update({ borrado_logico: true });

    res.status(200).json({ message: 'Abogado eliminado exitosamente' });
  } catch (error) {
    res.status(500).json({ message: 'Error al eliminar el abogado', error });
  }
};
