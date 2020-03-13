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
            let obj={
                status:400,msg:'please fill all required field'
            }
            next(obj)
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

        if (!request.body.description||!request.body.category){
            let obj={
                status:400,msg:'please fill all required field'
            }
            next(obj)
        }

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

    static getTaskById(request,response,next){
        Task.findByPk(request.params.id)
        .then(data=>{
            response.json(data)
        })
        .catch(err=>{
            next({status:404,msg:'data doenst exist'})
        })
    }
}


module.exports=Controller