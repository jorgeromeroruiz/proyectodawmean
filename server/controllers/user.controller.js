const User = require('../models/user');

const userController = {};

//SIGNUP, LOGIN & LOGOUT
userController.signupUser = async (req, res) => {
    try {
        const user = new User(req.body);
        await user.save();
        res.json({
            _id: user._id,
            name: user.name,
            surname: user.surname,
            email: user.email,
            phone: user.phone
        });
    } catch (e) {
        res.json({status: e});
    }
}

userController.loginUser = async (req, res) => {
    const user = await User.findOne({email: req.body.email, pwd: req.body.pwd});
    if (user !== null){
        res.json({
            _id: user._id,
            name: user.name,
            surname: user.surname,
            email: user.email,
            phone: user.phone,
            admin: user.admin
        });
    } else {
        res.json({error: "0"});
    }
}

//CRUD
userController.getUsers = async (req, res) => {
    const users = await User.find();
    res.json(users);
}

userController.createUser = async (req, res) => {
    const user = new User(req.body);
    await user.save();
    res.json({
        status: "Usuario creado"
    });
}

userController.getUser = async (req, res) => {
    const user = await User.findById(req.params.id);
    if (user !== null){
        res.json(user);
    } else {
        res.json({status: "0"});
    }
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
    res.json({status: "1"});
}

userController.deleteUser = async (req, res) =>{
    await User.findByIdAndRemove(req.params.id);
    res.json({status: "Usuario borrado"});
}

module.exports = userController;
