<template>
    <div class="anakolom">
                <div class="container-done">
                    <div >
                        <p class="backlog" >Done</p>
                    </div>
                    <div class="ini">
                        <!-- INI BUAT DI LOOP -->
                        <div class="isi" v-for="i in doneData" v-bind:key="i.id" >  
                            <div class="pContent">
                                <span > {{i.description}}</span>
                                <div style="display: flex; justify-content: flex-end;">
                                    <img src="../style/png/garbage-1.png" @click="deleteData(`${i.id}`)" style="height: 25px; width: 25px;">
                                </div>
                            </div>
                        </div>
                        <!-- END  LOOP  -->
                    </div>
                </div>
        </div>
        
</template>

<script>
const localhost='http://localhost:3000/'
import axios from 'axios'
export default {
    props:['maindata'],
    computed:{
        doneData(){
            return this.maindata.filter(filter=> filter.category==="done")
        }
    },
     methods:{
        deleteData(id){
            console.log(id)
            axios({
                method:'DELETE',
                url:`${localhost}task/${id}`,
                headers:{"token":localStorage.getItem("token")}
            }).then(data=>{
                this.$emit("axiosGet")
            }).catch(err=>{
                console.log(err)
            })
        }
    },
}
</script>