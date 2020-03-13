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
                                    <img class='toggleImg' src="../style/png/zoom-in.png" @click="updateTrigger(i.id,`${i.description}`,`${i.category}`)" >
                                    <img class='toggleImg' src="../style/png/garbage-1.png" @click="deleteData(`${i.id}`)" >
                                </div>
                            </div>
                        </div>
                        <!-- END  LOOP  -->
                    </div>
                </div>
                 <editmodal :showModal="showModal" @toggleModal="toggleModal"  :dataEdit="dataEdit" @axiosPut="axiosPut"></editmodal >
        </div>
        
</template>

<script>
import axios from 'axios'
import editmodal from './edit_modal'
const localhost='http://localhost:3000/'
export default {
    props:['maindata'],
    components:{
        editmodal
    },
    computed:{
        doneData(){
            return this.maindata.filter(filter=> filter.category =="done")
        }
    },
    methods:{
        deleteData(id){
           Swal.fire({
                    title: 'Are you sure?',
                    text: "You won't be able to revert this!",
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonText: 'Yes, delete it!',
                    cancelButtonText: 'No, cancel!',
                    reverseButtons: true
                    }).then((result) => {
                        if (result.value) {

                                axios({
                method:'DELETE',
                url:`${localhost}task/${id}`,
                headers:{"token":localStorage.getItem("token")}
            }).then(data=>{
            console.log(id)
                this.$emit(`axiosGet`,id)
            }).catch(err=>{
                console.log(err)
            })

                            Swal.fire(
                            'Kanban Deleted!',
                            'Sweet, now lets do another task.',
                            'success'
                            )
                            } else if (
        /* Read more about handling dismissals below */
        result.dismiss === Swal.DismissReason.cancel
    ) {
        Swal.fire(
        'Cancelled',
        'Take a rest if you click the button by mistake >.<',
        'error'
        )
    }
    })
        },
        updateTrigger(id,description,category){
            // alert(` ini pencetan ${id}`)
            this.dataEdit={
                id:id,
                description:description,
                category:category
            }
            this.showModal=true
            console.log(this.dataEdit,'siap oper bouusss')

        }, 
        toggleModal(){
            this.showModal=!this.showModal
        },
        axiosPut(updateData){
            console.log(updateData,"ini update data")
            console.log('masuk update data')
            axios({
                url:`${localhost}task/${updateData.id}`,
                method:'PUT',
                headers:{"token":localStorage.getItem("token")},
                data:{
                    description:updateData.description,
                    category:updateData.category
                }
            }).then(res=>{
                // console.log(res)
                console.log("sukses update data")
                this.toggleModal()
                this.$emit("axiosGet")
            }).catch(err=>{
                Swal.fire({
                        title: 'Error!',
                        html:`Please Fill the Description`,
                        icon: 'error',
                        confirmButtonText: 'Ok'
                        })
                console.log(err)
            })
        }
        
    },
    data(){
        return{
            showModal:false,
            dataEdit:null
        }
    }
}
</script>