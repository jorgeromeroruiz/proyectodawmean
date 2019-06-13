const express = require('express');
const router = express.Router();

const userController = require('../controllers/user.controller');

router.get('/', userController.getUsers);
router.post('/', userController.createUser);
router.get('/:id', userController.getUser);
router.put('/:id', userController.editUser);
router.delete('/:id', userController.deleteUser);

router.post('/signup', userController.signupUser);
router.post('/login', userController.loginUser);


module.exports = router;
