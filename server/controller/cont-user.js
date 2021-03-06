const {User}=require('../models/index')
const comparePw = require('../helper/comparePW')
const jwt = require('jsonwebtoken')
require('dotenv').config()
const {OAuth2Client} = require('google-auth-library');
const client = new OAuth2Client(process.env.GCLIENT);


class Controller {

    static googleSign(request,response,next){
        console.log('dapet coy')
        let Gltoken = request.body.token
        let user=null
        client.verifyIdToken({
            idToken:Gltoken,
            audience:process.env.GCLIENT
        })
        .then(ticket=>{
            const payload=ticket.getPayload();
            console.log(payload,'<<<<<<<<<<<<<<< korewa payload')
            user={
                name:payload.name,
                email:payload.email,
                password:'12345'
            }
            return User.findOne({where:{email:user.email}})
        })
        .then(data=>{
            if(data){
                return data
            }else{
                let receipient=user.email
                let nama=user.name
                let msg=`selamat datang ${user.name}, password anda adalah ${user.password}`
                
                return User.create(user)
            }
        })
        .then(data=>{
            let token=jwt.sign({id:data.id,email:data.email},process.env.SECRET)
            response.status(200).json({token})
        })
        .catch(err=>{
            console.log('glsign error')
            next(err)
        })
    }


    static register (request,response,next){
        // console.log(request.body)
        let my_error = new Error()
        let create={
            name:request.body.name,
            email:request.body.email,
            password:request.body.password
        }
        if(!request.body.name||!request.body.email||!request.body.password){
            next( {status:400,msg:'please fill all required form'})
        }else{
            User.findOne({where:{email:request.body.email}})
            .then(data=>{
                if (data){
                    my_error.statusCode = 400
                    my_error.errorMessage = "User exist"
                    throw my_error
                }else{
                    return User.create(create)
                }
            }).then(data=>{
                response.json(data)
            })
            .catch(err=>{
                err.statusCode = err.statusCode || 500
                next({status: err.statusCode, msg: err.errorMessage})
            }) 
        }
        
    }
    static login (request,response,next){
        let dataUser = null
        console.log('login')
        let my_error = new Error()
        User.findOne({where:{email:request.body.email}})
        .then(datax=>{
            dataUser=datax
            if (!dataUser){
                my_error.statusCode=400
                my_error.errorMessage='Invalid User / Password (user doesnot exist)'
                throw my_error
            }else{
                return comparePw(request.body.password,dataUser.password)
            }
        })
        .then(data=>{
            if (data){
                console.log(data)
                let token = jwt.sign({email:dataUser.email,id:dataUser.id,name:dataUser.name},process.env.SECRET)
                response.json({token})
            }
        })
        .catch(err=>{
            next({status:err.statusCode||500,msg: err.errorMessage})
        })
    }
}


module.exports=Controller