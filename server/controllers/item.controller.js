const Item = require('../models/item');

const itemController = {};

itemController.getitems = async (req, res) => {
    const items = await Item.find();
    res.json(items);
}

itemController.createitem = async (req, res) => {
    console.log(req.photo);
    const item = new Item({
        title:req.body.title,
        category: req.body.category,
        description:req.body.description,
        photo:req.body.photo
    });
   
    await item.save();
    res.json({
        status: "Item creado"
    });
}

itemController.getitem = async (req, res) => {
    const item = await Item.findById(req.params.id);
    res.json(item);
}

itemController.edititem = async (req, res) => {
    const { id } = req.params;
    const item = {
        name: req.body.name,
        surname: req.body.surname,
        email: req.body.email,
        phone: req.body.phone
    };
    await Item.findByIdAndUpdate(id, {$set: item}, {new: true});
    res.json({status: "Usuario actualizado"});
}

itemController.deleteitem = async (req, res) =>{
    await Item.findByIdAndRemove(req.params.id);
    res.json({status: "Usuario borrado"});
}

module.exports = itemController;
