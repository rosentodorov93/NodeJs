const Accesory = require('../models/Accesory');

exports.create = async (accesoryData) =>{
    const accesory = await Accesory.create(accesoryData);

    return accesory;
}

exports.getAll = ()=> Accesory.find();

exports.getAvaliableAccesories = (accesoryIds) =>{
    return Accesory.find({_id: {$nin: accesoryIds}});
}