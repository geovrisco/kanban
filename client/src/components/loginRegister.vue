<template>
<div>

 <!-- SHOW NAVBAR -->
        <div class="nav" style="display: flex; justify-content: center;" v-if="!isLogin" >
            <div class="marginH3">
                <h2 style="padding-top:10%; font-family: 'itu';" @click="$emit('showLogin')">Sign-In</h2>
            </div>
            <div class="marginH3">
                <span class="navTitle">KanTan</span>
            </div>
            <div class="marginH3"  >
                <h2 style="padding-top: 10%;font-family: itu;" @click="$emit('showRegister')">Register</h2>
            </div>
        </div>

        <div class="nav" style="display: flex; justify-content: center;" v-if="isLogin" >
            <div class="marginH3">
                <h2 style="padding-top:10%; font-family: 'itu';">its</h2>
            </div>
            <div class="marginH3">
                <span class="navTitle">KanTan</span>
            </div>
            <div class="marginH3"  >
                <h2 style="padding-top: 10%;font-family: itu;" @click="$emit('logout')" >logOut</h2>
            </div>
        </div>
        <!-- END NAVBAR -->

    <!-- LOGIN AND REGISTER -->
     <div class="containerLoginRegister" v-if="!isLogin">
            <div style=" display: flex; justify-content: space-around; padding-bottom: 30px;">
                <div class='login-register' >
                    <!-- LOGIN FORM -->
                    <form class="frm-login" v-if="loginPage">
                        <span class="backlog" style="font-size: 33;"> Sign in!</span>
                        
                        <div class="email-container">
                            <label class="backlog" style="font-size: 22px;">Email:</label><br>
                            <input class="email" type="email" v-model="email">
                        </div><br>
                        <div>
                            <label class="backlog" style="font-size: 22px;">Password:</label><br>
                            <input class="password" type="password" v-model="password">
                        </div>
                        <div>
                            <p>Dont have account? <a style="font-family: ini;" class="hovr" @click=" $emit('showRegister') ">Sign Up!</a></p>
                        </div>
                        <div> <a class=button @click="submitlogin"> Login </a> </div>
                    </form>
                    <!-- END LOGIN FORM -->

                    <!-- REGISTER -->
                    <form class="frm-login"  v-if="!loginPage">
                        <span class="backlog"> Register</span>
                        <div class="email-container">
                            <label class="backlog" style="font-size: 15px;">Name:</label><br>
                            <input class="email" type="text" placeholder="Your name here" v-model="registerName">
                        </div>
                        <div class="email-container">
                            <label class="backlog" style="font-size: 15px;">Email:</label><br>
                            <input class="email" type="email" placeholder="Your email here" v-model="registerEmail">
                        </div>  
                        
                        <div class="email-container">
                            <label class="backlog" style="font-size: 15px;">Password:</label><br>
                            <input class="password" type="password" placeholder="Your password here" v-model="registerPassword">
                        </div>
                        <br><br>
                        <div> <a class=button @click="submitRegister"> Register </a> </div>
                    </form>
                    <div class='login-register'>
                        
                    </div>
                </div>
                <div class=imgcontainer style="text-align: center">
                    <span style="background-color: white;padding-left: 10px; padding-right: 10px;border-radius: 20px; font-family: itz; font-size: 80px; color:rgb(70, 135, 165);" > Kantan Kanban</span>
                   
                    <div>
                        <img src="/style/Logo.png" style="width: 400px;height: 300px;">
                    </div>
                </div>
                
            </div>
        </div>
    <!-- END LOGIN REGISTer -->
</div>
</template>

<script>
export default {
    props:['isLogin','loginPage'],
    methods:{
        
        submitlogin(){
            let data={
                email:this.email,
                password:this.password
            }
            console.log(data)
            this.$emit(`axiosLogin`,data)
        },
        submitRegister(){
            let data = {
                email:this.registerEmail,
                password:this.registerPassword,
                name:this.registerName
            }
            console.log(data)
            this.$emit("axiosRegister",data)
        }
    },
    data(){
        return{
            email:'',
            password:'',
            registerEmail:'',
            registerPassword:'',
            registerName:''
        }
    }
}
</script>