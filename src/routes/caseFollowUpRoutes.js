const express = require('express');
const caseFollowUpController = require('../controllers/caseFollowUpController');
const auth = require('../middleware/auth');

const router = express.Router();

router.post('/', auth, caseFollowUpController.createCaseFollowUp);
router.get('/:id_caso', auth, caseFollowUpController.getCaseFollowUps);
router.put('/:id', auth, caseFollowUpController.updateCaseFollowUp);
router.delete('/:id', auth, caseFollowUpController.deleteCaseFollowUp);

module.exports = router;
