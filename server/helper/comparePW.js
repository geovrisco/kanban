const bcyrpt = require('bcrypt')

function comparePW(input,hash){
    bcyrpt.compare(input,hash)
}

module.exports=comparePW