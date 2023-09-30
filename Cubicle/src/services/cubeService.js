const Cube = require('../models/Cube');


exports.create = async (cube)=>{
    const result = await Cube.create(cube);

    return result;
}

exports.getAll = async (search, from , to) =>{
    let filteredCubes = await Cube.find().lean();
 
    if(search){
        filteredCubes = filteredCubes.filter(cube => cube.name.toLocaleLowerCase().includes(search.toLocaleLowerCase()));
    }
    if(from){
        filteredCubes = filteredCubes.filter(cube => cube.difficultyLevel >= Number(from));
    }
    if(to){
        filteredCubes = filteredCubes.filter(cube => cube.difficultyLevel <= Number(to));
    }

    return filteredCubes;
}

exports.getById = (id) => Cube.findById(id).lean();




