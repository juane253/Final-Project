const express = require('express');
const router = express.Router();
const statesController = require('/Users/juanenriquez/Desktop/Back End Final Project/Controllers/statesController');

router.route('/')
  .get(statesController.getAllStates);

router.route('/:state')
  .get(statesController.getState);

router.route('/:state/funfact')
  .get(statesController.getFunFact)
  .post(statesController.createFunFact)
  .patch(statesController.updateFunFact)
  .delete(statesController.deleteFunFact);

router.get('/:state/capital', statesController.getCapital);
router.get('/:state/nickname', statesController.getNickname);
router.get('/:state/population', statesController.getPopulation);
router.get('/:state/admission', statesController.getAdmission);

module.exports = router;