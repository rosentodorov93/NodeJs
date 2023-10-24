const {promisify} = require('util');
const jsonWebToken = require('jsonwebtoken');

const jwt = {
    sign: promisify(jsonWebToken.sign),
    verify: promisify(jsonWebToken.verify),
}

module.exports = jwt;