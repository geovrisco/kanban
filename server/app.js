const express = require('express')
const app = express()
const PORT = process.env.PORT || 3000
const cors = require('cors')
const route = require('./router/index')
const errhandler = require('./middleware/errHandler')

app.use(cors())
app.use(express.urlencoded({extended:true}))
app.use(express.json())

app.use(route)
app.use(errhandler)


app.listen(PORT ,()=>{
    console.log('kanban running on Port : ',PORT)
})
