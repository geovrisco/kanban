const bcrypt = require('bcrypt')


function compareBcrypt (password , hash){
    console.log('bekrip')
    return bcrypt.compare(password, hash)
}

module.exports = compareBcrypt