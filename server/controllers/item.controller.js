const Item = require('../models/item');

const itemController = {};

itemController.getItems = async (req, res) => {
    const items = await Item.find();
    res.json(items);
}

itemController.createItem = async (req, res) => {
    console.log(req.photo);
    const item = new Item({
        title:req.body.title,
        category: req.body.category,
        description:req.body.description,
        photo:req.body.photo,
        date:req.body.date
    });
    var dateCreated = item.date.getFullYear()+"_"+item.date.getMonth()+1+"_"+item.date.getDate()+"_"+item.date.getHours()+"_"+item.date.getMinutes()+"_"+item.date.getSeconds();
    console.log(dateCreated);

    await item.save();
    res.json({
        status: "Item creado"
    });
}

itemController.getItem = async (req, res) => {
    const item = await Item.findById(req.params.id);
    res.json(item);
}

//TODO
itemController.editItem = async (req, res) => {
    const { id } = req.params;
    const item = {
        name: req.body.name,
        surname: req.body.surname,
        email: req.body.email,
        phone: req.body.phone
    };
    await Item.findByIdAndUpdate(id, {$set: item}, {new: true});
    res.json({status: "Item actualizado"});
}

itemController.deleteItem = async (req, res) =>{
    await Item.findByIdAndRemove(req.params.id);
    res.json({status: "Item borrado"});
}

module.exports = itemController;
