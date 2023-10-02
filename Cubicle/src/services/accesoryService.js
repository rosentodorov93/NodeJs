const Accesory = require('../models/Accesory');

exports.create = async (accesoryData) =>{
    const accesory = await Accesory.create(accesoryData);

    return accesory;
}