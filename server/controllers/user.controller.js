const User = require('../models/user');

const userController = {};

userController.getUsers = async (req, res) => {
    const users = await User.find();
    res.json(users);
}

userController.createUser = async (req, res) => {
    const user = new User(req.body);
    console.log(user)
    await user.save();
    res.json({
        status: "Usuario creado"
    });
}

userController.getUser = async (req, res) => {
    const user = await User.findById(req.params.id);
    res.json(user);
}

userController.editUser = async (req, res) => {
    const { id } = req.params;
    const user = {
        name: req.body.name,
        surname: req.body.surname,
        email: req.body.email,
        phone: req.body.phone
    };
    await User.findByIdAndUpdate(id, {$set: user}, {new: true});
    res.json({status: "Usuario actualizado"});
}

userController.deleteUser = async (req, res) =>{
    await User.findByIdAndRemove(req.params.id);
    res.json({status: "Usuario borrado"});
}

module.exports = userController;
