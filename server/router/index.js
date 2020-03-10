const Router = require('express').Router()
const TaskRouter = require('./route-task')
const UserRouter = require('./route-user')

Router.get('/',(req,res,next)=>{
    res.status(200).json({msg:'Hello World x.x'})
})


Router.use('/task',TaskRouter)

Router.use('/user',UserRouter)

module.exports=Router
