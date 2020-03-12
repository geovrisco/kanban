


function errorHandler(err,request,response,next){
    // console.log('masuk')
    // console.log(err)
    if(err){
        // console.log('if')
        response.status(err.status).json({message: err.msg})
    }
}


module.exports=errorHandler