const jwt= require('jsonwebtoken')
require('dotenv').config()
function authenticator(request,response,next){
    try{
        var decoded = jwt.verify(request.headers.token,process.env.SECRET)
        request.userDecoded=decoded
        next()
    }
    catch(err){
        next({status:401,msg:'Invalid Credentials'})
    }
}

module.exports = authenticator