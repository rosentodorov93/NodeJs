const jwt = require('jsonwebtoken');

exports.sign = (payload, secret, options) =>{
    const result = new Promise((resoleve,reject) =>{
        jwt.sign(payload, secret, options, (err, res) =>{
            if(err){
                return reject(err)
            }

            return resoleve(res);
        })
    })

    return result;
}

exports.verify = (token, secret) =>{
    const result = new Promise((resoleve,reject) =>{
        jwt.verify(token, secret, (err, res) =>{
            if(err){
                return reject(err)
            }

            return resoleve(res);
        })
    })

    return result;
}