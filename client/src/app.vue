<template>
       <div>
        <loginRegister 
        :isLogin="isLogin" 
        :loginPage="loginPage" 
        @showLogin="showLogin" 
        @axiosLogin="axiosLogin" 
        @showRegister="showRegister"
        @logout="logout"
        >
        </loginRegister>
        <div class="content"  v-if="isLogin">
            <backlog :maindata="maindata"  @axiosGet="axiosGet" ></backlog>
            <product :maindata="maindata" @axiosGet="axiosGet"> </product>
            <development :maindata="maindata" @axiosGet="axiosGet" > </development>
            <done :maindata="maindata" @axiosGet="axiosGet" > </done>
        <modal :showModal="showModal" @toggleModal="toggleModal" @axiosCreate="axiosCreate" ></modal >

        <div style="display:flex; justify-content:center">
            <button class="button" @click="toggleModal" >
           Add Data
           </button>
        </div>
        </div>

    </div>
</template>

<script>
import loginRegister from './components/loginRegister'
const localhost='http://localhost:3000/'
import axios from 'axios'
import backlog from './components/backlog'
import product from './components/product'
import development from './components/development'
import done from './components/done'
import modal from './components/modal'

export default {
    components:{
        loginRegister,
        backlog,
        product,
        development,
        done,
        modal
        
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
                console.log(data.data.token)
                localStorage.setItem("token",data.data.token)
                this.axiosGet()
                this.token=localStorage.getItem("token")
                console.log(this.token)
                this.isLogin=true
            })
            .catch(err=>{
                console.log(err)
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
                console.log(this.maindata)
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
            })

        },
         toggleModal(){
            this.showModal=!this.showModal
        },
        logout(){
            console.log("trigger dong")
            localStorage.removeItem("token")
            this.isLogin=false
            this.loginPage=true
        }



    },watch:{
        
    }
    
}
</script>