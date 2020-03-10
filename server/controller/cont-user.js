const {User}=require('../models/index')
const comparePw = require('../helper/comparePW')
const jwt = require('jsonwebtoken')


class Controller {
    static register (request,response,next){
        let create={
            name:request.body.name,
            email:request.body.email,
            password:request.body.password
        }
        if(!request.body.name||!request.body.email||request.body.password){
            next( {status:400,msg:'please fill all required form'})
        }else{
            User.create(create)
            .then(data=>{
                response.json(data)
            })
            .catch(err=>{
                next({status:500,msg:'BAD REQUEST'})
            })
        }
    }
    static login (request,response,next){
        const user = null
        User.findOne({where:{email:request.body.email}})
        .then(data=>{
            if(data){
                user=data
                return comparePw(request.body.email,data.password)
            }else{
                next({status:404,msg:'not Found'})
            }
        })
        .then(data=>{
            let token = jwt.sign({email:user.email,id:user.id,name:user.name})
            
        })
    }
}


module.exports=Controller