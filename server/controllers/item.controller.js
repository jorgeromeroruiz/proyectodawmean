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
        date:req.body.date,
        owner:req.body.owner
    });
    var dateCreated = item.date.getFullYear()+"_"+item.date.getMonth()+1+"_"+item.date.getDate()+"_"+item.date.getHours()+"_"+item.date.getMinutes()+"_"+item.date.getSeconds();
    console.log(dateCreated);

    await item.save();
    res.json({item});
}

itemController.getItem = async (req, res) => {
    const item = await Item.findById(req.params.id);
    res.json(item);
}

itemController.editItem = async (req, res) => {
    const { id } = req.params;
    const item = {
        title: req.body.title,
        category: req.body.category,
        description: req.body.description,
        photo: req.body.photo
    };
    await Item.findByIdAndUpdate(id, {$set: item}, {new: true});
    res.json({status: "1"});
}

itemController.myItems = async (req, res) =>{
    const item = await Item.find({owner: req.params.id});
    if (item !== null){
        res.json({item});
    } else {
        res.json({error: "0"});
    }
}

itemController.deleteItem = async (req, res) =>{
    await Item.findByIdAndRemove(req.params.id);
    res.json({status: "Item borrado"});
}

module.exports = itemController;
