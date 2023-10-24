const Electronics = require('../models/Electronics');


exports.create = (electronicsData) => Electronics.create(electronicsData);

exports.getAll = () => Electronics.find();

exports.getById = (id) => Electronics.findById(id).populate("buyingList");

exports.buy = async (id, user) =>{
    const electronics = await this.getById(id);

    if(!electronics){
        throw new Error("Invalid electronicsId");
    }

    const hasBought = electronics.buyingList.some(bl => bl._id == user?._id);

    if(hasBought){
        throw new Error("You have already bought this item");
    }

    electronics.buyingList.push(user);
    return electronics.save();
}

exports.edit = (id, data) => Electronics.findByIdAndUpdate(id,data);

exports.delete = (id) => Electronics.findByIdAndDelete(id)

exports.search = (name, type) =>{

    let options = {};

    if(name){
        options.name = {$regex: name, $options: 'i'};
    }

    if(type){
        options.type = {$regex: type, $options: 'i'};
    }

    return Electronics.find(options);
}