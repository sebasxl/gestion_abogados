const express = require('express');
const router = express.Router();
const organizationController = require('../controllers/organizationController');
const auth = require('../middleware/auth');
const authorize = require('../middleware/authorize');

router.post('/', auth, authorize(['administrador_total']), organizationController.createOrganization);
router.get('/', auth, authorize(['administrador_total', 'administrador_organizacion', 'abogado', 'cliente']), organizationController.getAllOrganizations);
router.get('/:id', auth, authorize(['administrador_total', 'administrador_organizacion', 'abogado', 'cliente']), organizationController.getOrganizationById);
router.put('/:id', auth, authorize(['administrador_total', 'administrador_organizacion']), organizationController.updateOrganization);
router.delete('/:id', auth, authorize(['administrador_total', 'administrador_organizacion']), organizationController.deleteOrganization);

module.exports = router;
