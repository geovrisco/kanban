const localhost='http://localhost:3000/'





var app = new Vue({
    el:"#app",
    data:{
        message:'hello vue',
        isLogin:false,
        token:localStorage.getItem("token"),
        loginPage:true,
        email:'',
        password:'',
        maindata:[],
        showModal:false
    },
    methods:{
        showRegisterHideLogin(){
            console.log('hide login show register')
            this.loginPage=false
        },
        showLoginHideRegister(){
            console.log('hide register show login')
            this.loginPage=true
        },
        toggleIsLogin(){
                this.isLogin=true
                
        },
        axiosLogin(){  
            axios({
                method:'POST',
                url:`${localhost}user/login`,
                data:{
                    email:this.email,
                    password:this.password
                }
            })
            .then(data=>{
                console.log(data.data.token)
                localStorage.setItem("token",data.data.token)
                console.log(localStorage.getItem("token"))
                this.toggleIsLogin()
                this.axiosGet()
            })
            .catch(err=>{
                console.log(err)
            })
        },
        
        axiosGet(){
            console.log("masukkk")
            axios({
                method:'GET',
                url:`${localhost}task`,
                headers:{"token":localStorage.getItem("token")}
            })
            .then(data=>{
                data.data.forEach(ele=>{
                    this.maindata.push(ele)
                    this.toggleIsLogin()
                })
                console.log(this.maindata)
            })
        },
        logout(){
            localStorage.removeItem("token")
            this.isLogin=false
        },
        toggleModal(){
            this.showModal= !this.showModal
        }  
    },
    created:function(){
        if(localStorage.getItem("token")){
            this.toggleIsLogin()
            this.axiosGet()
        }
    },
    Mount:()=>{
        this.axiosGet()
    },
    computed:{
        backlogData(){
            return this.maindata.filter(filter=> filter.category =="backlog")
        },
        productData(){
            return this.maindata.filter(filter=> filter.category =="product")
        },
        developmentData(){
            return this.maindata.filter(filter=> filter.category =="development")
        },
        doneData(){
            return this.maindata.filter(filter=> filter.category =="done")
        }
    },
   

})


