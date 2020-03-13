const Router = require('express').Router()
const Controller = require('../controller/cont-user')

Router.post('/register',Controller.register)
Router.post('/login',Controller.login)
Router.post('/glSign',Controller.googleSign)

module.exports = Router