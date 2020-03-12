const {Task} = require('../models/index')

function Authorize(request,response,next){
    console.log('masuk sini')
    // console.log(request.userDecoded)
    Task.findOne({where:{
        id:request.params.id
    }})
    .then(data=>{
        // console.log(data)
        if(!data){
            console.log('data dak ketemu')
            throw ({status:400 , msg:'data not found'})
        }else{
            console.log(data)
            if (data.UserId===request.userDecoded.id){
                next()
            }else{
                throw ({status:401,msg:'User Not Authorized'})
            }
        }
    })
    .catch(err=>{
        next(err)
    })
}

module.exports = Authorize