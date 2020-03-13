const Router = require('express').Router()
const Controller = require('../controller/cont-task')
const authenticate = require('../middleware/authenticator')
const authorize = require('../middleware/authorization')

Router.get('/',authenticate,Controller.getTask)
Router.post('/',authenticate,Controller.createTask)
Router.get('/:id',authenticate,authorize,Controller.getTaskById)
Router.put('/:id',authenticate,authorize,Controller.update)
Router.delete('/:id',authenticate,authorize,Controller.delete)


module.exports=Router
