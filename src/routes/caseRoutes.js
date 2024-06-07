const express = require('express');
const caseController = require('../controllers/caseController');
const auth = require('../middleware/auth');

const router = express.Router();

router.post('/', auth, caseController.createCase);
router.get('/', auth, caseController.getAllCases);
router.get('/:id', auth, caseController.getCaseById);
router.put('/:id', auth, caseController.updateCase);
router.delete('/:id', auth, caseController.deleteCase);

module.exports = router;
