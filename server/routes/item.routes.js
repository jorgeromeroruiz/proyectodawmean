const express = require('express');
const router = express.Router();

const itemController = require('../controllers/item.controller');

router.get('/', itemController.getitems);
router.post('/', itemController.createitem);
router.get('/:id', itemController.getitem);
router.put('/:id', itemController.edititem);
router.delete('/:id', itemController.deleteitem);

module.exports = router;
