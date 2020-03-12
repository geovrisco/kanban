<template>
    <div class="anakolom">
                <div class="container-backlog">
                    <div >
                        <p class="backlog" >BackLog</p>
                    </div>
                    <div class="ini">
                        <!-- INI BUAT DI LOOP -->
                        <div class="isi" v-for="i in backlogData" :key="i.id">  
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
import axios from 'axios'
const localhost='http://localhost:3000/'
export default {
    props:['maindata'],
    computed:{
        backlogData(){
            return this.maindata.filter(filter=> filter.category =="backlog")
        }
    },
    methods:{
        deleteData(id){
            axios({
                method:'DELETE',
                url:`${localhost}task/${id}`,
                headers:{"token":localStorage.getItem("token")}
            }).then(data=>{
            console.log(id)
                this.$emit(`deleteThisArray`,id)
            }).catch(err=>{
                console.log(err)
            })
        }
    },
    data(){
        return{
            
        }
    }
}
</script>