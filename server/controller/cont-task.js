const {Task}=require('../models/index')


class Controller {
    static getTask (request,response,text){
        Task.findAll({where:{UserId:request.userDecoded.id}})
        .then(data=>{
            response.json(data)
        })
        .catch(err=>{
            next(err)
        })
    }
    static createTask (request,response,next){
        let obj={
            description:request.body.description,
            category:request.body.category,
            UserId:request.userDecoded.id
        }
        if (!request.body.description||!request.body.category){
            let err={
                status:400,msg:'please fill all required field'
            }
        }else{
            console.log(obj)
            Task.create(obj)
            .then(data=>{
                response.json(data)
            })
            .catch(err=>{
                next(err)
            })
        }
    }

    static update (request,response,next){
        Task.update({
            description:request.body.description,
            category:request.body.category
        }, {where:{id:request.params.id}})
        .then(data=>{
            response.json(data)
        })
        .catch(err=>{
            next(err)
        })
    }

    static delete (request,response,next){
        Task.destroy({where:{id:request.params.id}})
        .then(data=>{
            response.json(data)
        })
        .catch(err=>{
            next(err)
        })
    }
}


module.exports=Controller