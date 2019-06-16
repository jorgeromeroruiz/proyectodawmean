const Item = require('../models/item');
const multer = require('multer');
const itemController = {};

let storage  = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, 'frontend/src/assets/images')
    },
    filename: function(req, file, cb){
        cb(null, file.fieldname+'-'+Date.now()+'.jpg')
    }
});

let upload = multer({ storage: storage }).single('photo');

itemController.getItems = async (req, res) => {
    const items = await Item.find().sort({date: 'desc'});
    res.json(items);
}

itemController.createItem = async (req, res) => {

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

itemController.imgItem = async (req, res) => {
    upload(req, res, function (err) {
        if (err){
            //Error en la subida
            res.json({err});
        } else {
            res.json({status: "Imagen subida", path: req.file.filename});
        }
    });

}

module.exports = itemController;
