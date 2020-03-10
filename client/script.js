$("#btn").on("click",function(){
    getHelloWorld()
})


function getHelloWorld(){
    $.ajax({
        type: "GET",
        contentType: "application/json",
        url: "Http://localhost:3000/",
        success: function (response) {
            console.log(response)
            $("#hello").text(response.msg)
        },
        error: function(err){
            $("#hello").val(err)
        }
    });
}