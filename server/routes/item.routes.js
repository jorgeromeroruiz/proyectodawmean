const express = require('express');
const router = express.Router();

const itemController = require('../controllers/item.controller');

router.get('/', itemController.getItems);
router.post('/', itemController.createItem);
router.get('/:id', itemController.getItem);
router.put('/:id', itemController.editItem);
router.delete('/:id', itemController.deleteItem);
router.get('/own/:id', itemController.myItems);
router.post('/img', itemController.imgItem);

module.exports = router;
