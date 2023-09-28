const uniqid = require('uniqid');
let cubes = [{
    id: 'hrunib02ncln2rtxti',
    name: "Rubik's Cube",
    description: 'classic',
    imageUrl: 'https://i.ebayimg.com/images/g/i5IAAOSwgyxWVOIQ/s-l1200.webp',
    difficultyLevel: 3
  },
  {
    id: 'hrunib02ncln2ry4xb',
    name: 'GAN 356',
    description: 'Best cube',
    imageUrl: 'https://rubik.bg/6022-large_default/kub-za-skorostno-narezhdane-gancube-gan356-x-v2-3x3x3-56mm-magnetic-stickerless.jpg',
    difficultyLevel: 3
  },
  {
    id: 'hrunib02ncln2rzvwt',
    name: 'Mirror Cube',
    description: 'Shapeshift',
    imageUrl: 'https://m.media-amazon.com/images/I/51-fF5yxWjL._AC_UF1000,1000_QL80_.jpg',
    difficultyLevel: 5
  }
];

exports.create = (cube)=>{
    const newCube = {
        id: uniqid(),
        ...cube,
    };
    console.log(newCube);
    cubes.push(newCube);
    return newCube;
}

exports.getAll = () =>{
    const result = cubes.slice();
    return result;
}

exports.getById = (id) =>{
    const targetCube = cubes.find(x => x.id === id);
    return targetCube;
}



