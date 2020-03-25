<template>
          <div class="anakolom2">
          <div class="anakolom" v-for="(dat,i) in data" :key="i">
                <div :class="dat.class">
                    <div >
                        <p class="backlog" >{{dat.name}}</p>
                    </div>
                    <div class="ini">
                        <!-- INI BUAT DI LOOP -->
                        <Task v-for="(data,i) in dat.data" :key="i" :data="data">

                        </Task>
                        <!-- <div class="isi" v-for="i in dat.data" :key="i.id" >  
                            <div class="pContent" >
                                <span > {{i.description}}</span>
                                <div style="display: flex; justify-content: flex-end;">
                                    <img class='toggleImg' src="../style/png/zoom-in.png" @click="updateTrigger(i.id,`${i.description}`,`${i.category}`)" >
                                    <img class='toggleImg' src="../style/png/garbage-1.png" @click="deleteData(`${i.id}`)" >
                                </div>
                            </div>
                        </div> -->
                        <!-- END  LOOP  -->
                    </div>
                </div>
            <editmodal :showModal="showModal" @toggleModal="toggleModal"  :dataEdit="dataEdit" @axiosPut="axiosPut"></editmodal >
            </div>
          </div>
</template>
<script>
import axios from 'axios'
import editmodal from './edit_modal'
import Task from './task'
const localhost='http://localhost:3000/'
export default {
    props:['data'],
    components:{
        editmodal,
        Task
    },

}
</script>