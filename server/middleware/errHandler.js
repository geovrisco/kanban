


function errorHandler(err,request,response,next){
    if(err){
        response.status(err.status).json(err)
    }
}


module.exports=errorHandler