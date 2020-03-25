<template>
       <div>
        <loginRegister 
        :isLogin="isLogin" 
        :loginPage="loginPage" 
        @showLogin="showLogin" 
        @axiosLogin="axiosLogin" 
        @showRegister="showRegister"
        @logout="logout"
        @axiosRegister="axiosRegister"
        @googleLogin="googleLogin"
        >
        </loginRegister>
        <div class="content"  v-if="isLogin">
        <category :data="alldata"> </category>
        <modal :showModal="showModal" @toggleModal="toggleModal" @axiosCreate="axiosCreate" ></modal >

        </div>
        <div style="display:flex; justify-content:center">
            <button class="button" @click="toggleModal" >
           Add Data
           </button>
        </div>

    </div>
</template>

<script>
import loginRegister from './components/loginRegister'
const localhost='http://localhost:3000/'
import axios from 'axios'
import modal from './components/modal'
import category from './components/category'

export default {
    components:{
        loginRegister,
        category
        
    },
    computed: {
        alldata(){
          return {
            backlog:{
              data:this.backlogData,
              name:'Backlog',
              class:'container-backlog'
              },
            development:{
              data:this.developmentData,
              name:'Development',
              class:'container-development'
              
            },
            done:{
              data:this.doneData,
              name:'Done',
              class:'container-done'
            },
            product:{
               data:this.productData,
              name:'Product',
              class:'container-product'
            }
          }
        },
        backlogData(){
            return this.maindata.filter(filter=> filter.category =="backlog")
        },
        developmentData(){
            return this.maindata.filter(filter=> filter.category =="development")
        },
        doneData(){
            return this.maindata.filter(filter=> filter.category =="done")
        },
        productData(){
            return this.maindata.filter(filter=> filter.category =="product")
        }
    },
    
    data(){
    return{
        message:'hello vue',
        isLogin:false,
        token:localStorage.getItem("token"),
        loginPage:true,
        email:'',
        password:'',
        maindata:[],
        showModal:false
        } 
    },created(){
        if(localStorage.getItem("token")){
            this.isLogin=true
            this.axiosGet()
        }
    },
    methods:{
        toggle(){
            this.loginPage=!this.loginPage
            console.log(this.loginPage,'ini login page')
        },
         axiosLogin(data){  
            axios({
                method:'POST',
                url:`${localhost}user/login`,
                data:{
                    email:data.email,
                    password:data.password
                }
            })
            .then(data=>{
                console.log('masuk login')
                localStorage.setItem("token",data.data.token)
                this.axiosGet()
                this.token=localStorage.getItem("token")
                console.log(this.token)
                this.isLogin=true
            })
            .catch(err=>{
                let errorArray=[]
                if(data.email==''){
                    errorArray.push('Email Cannot Be Empty')
                }
                if(data.password==''){
                    errorArray.push('Password Cannot Be Empty')
                }
               
                if(errorArray.length>0){
                    Swal.fire({
                        title: 'Error!',
                        html:`${(errorArray[0]) ? errorArray[0]:''} <br> ${ (errorArray[1]) ? errorArray[1]:''}`,
                        icon: 'error',
                        confirmButtonText: 'Ok'
                        })
                }else{
                     Swal.fire({
                        title: 'Error!',
                        html:`Please enter Valid Email / Password`,
                        icon: 'error',
                        confirmButtonText: 'Ok'
                        })
                }
            })
        },showLogin(){
            this.loginPage=true
            console.log(this.loginPage)
        },showRegister(){
            this.loginPage=false
            console.log(this.loginPage)
        },
        axiosGet(){   
            this.maindata=[]                  //axios gettt
            console.log("masukkk")
            axios({
                method:'GET',
                url:`${localhost}task`,
                headers:{"token":localStorage.getItem("token")}
            })
            .then(data=>{
                data.data.forEach(ele=>{
                    this.maindata.push(ele)
                })
                // console.log(this.maindata)
            })
        },
        deleteThisArray(id){
            console.log('delete this array triggered',id)
            let array=[]
            this.maindata.forEach(i=>{
                if(i.id!==id){
                    array.push(i)
                }
            })
            console.log(array)
            this.maindata=array
        }, axiosCreate(data){
            axios({
                method:"POST",
                url:`${localhost}task`,
                headers:{"token":localStorage.getItem("token")},
                data:{
                    category:data.category,
                    description:data.description
                }
            })
            .then(data=>{
                this.axiosGet()
            })
            .catch(err=>{
                console.log(err)
                let errorArray=[]
                if(data.category==''){
                    errorArray.push('Please select category')
                }
                if(data.description==''){
                    errorArray.push('please input description')
                }
               
                if(errorArray.length>0){
                    Swal.fire({
                        title: 'Error!',
                        html:`${(errorArray[0]) ? errorArray[0]:''} <br> ${ (errorArray[1]) ? errorArray[1]:''}`,
                        icon: 'error',
                        confirmButtonText: 'Ok'
                        })
                }
                
            })

        },
        googleLogin(){
                 console.log('masuk login')
                
                this.axiosGet()
                this.token=localStorage.getItem("token")
                console.log(this.token)
                this.isLogin=true
        },
         toggleModal(){
            this.showModal=!this.showModal
        },
        logout(){
            console.log("trigger dong")
            localStorage.removeItem("token")
            this.isLogin=false
            this.loginPage=true
            this.signOut()
        },
         signOut() {
    var auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function () {
      console.log('User signed out.');
    });
  },
        axiosRegister(loginData){
            console.log(loginData,'ini masuk ke register dulu')
            axios({
                method:"POST",
                url:`${localhost}user/register`,
                data:{
                    name:loginData.name,
                    email:loginData.email,
                    password:loginData.password
                }
            })
            .then(res=>{
                console.log(res,"ini res")
                let loginCredential={
                    email:loginData.email,
                    password:loginData.password
                }

                return this.axiosLogin(loginCredential )
            })
            .catch(err=>{
                console.log(err)
                let errorArray=[]
                if(loginData.email==''){
                    errorArray.push('Email Cannot Be Empty')
                }
                if(loginData.password==''){
                    errorArray.push('Password Cannot Be Empty')
                }
                if(loginData.name==''){
                    errorArray.push('Name Cannot Be Empty')
                }
                console.log('disini')
                console.log(errorArray)
                if(errorArray.length>0){
                    Swal.fire({
                        title: 'Error!',
                        html:`${(errorArray[0]) ? errorArray[0]:''} <br> ${ (errorArray[1]) ? errorArray[1]:''} <br>${(errorArray[2]) ? errorArray[2]:''}`,
                        icon: 'error',
                        confirmButtonText: 'Ok'
                        })
                }else{
                     Swal.fire({
                        title: 'Error!',
                        html:`Email already Used`,
                        icon: 'error',
                        confirmButtonText: 'Ok'
                        })
                }
            })
        }



    },watch:{
        
    }
    
}
</script>