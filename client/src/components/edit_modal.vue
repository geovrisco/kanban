<template>
    <div>

        <transition name="fade" appear>
            <div class="modal-overlay" v-if="showModal" @click="$emit('toggleModal')"></div>
        </transition>
        <transition name="slide" appear>
            <div class="modal" v-if="showModal">
                <span class="backlog">edit this task</span>
                    <div class="form-modal">
                        <form >
                        
                        <div class="email-container">
                            <label class="backlog" style="font-size: 15px;">Description:</label><br>
                            <textarea class="kanbanDesc" type="text" v-model="description" >  </textarea>
                            
                        </div>
                        <br>
                        <div style="display:flex; justify-content:center; margin-bottom:3%">
                            <select class="select-opt" id="Category" style="" v-model="category">
                                <option disabled value=""> Select Category </option>
                                <option value="backlog"  >backlog</option>
                                <option value="product"  >product</option>
                                <option value="development"  >development</option>
                                <option value="done"  >done</option>
                            </select>
                        </div>  
                        
                    </form>
                    </div>
                <div class="form-modal">
                    <button class="buttonModalBlue" @click="axiosGetTrigger(`${id}`,`${description}`,`${category}`)" >
                        Edit Kanban!
                    </button>
                    <button class="buttonModalRed" @click="$emit('toggleModal')" >
                        Cancel
                    </button>
                </div>
                <br><br>
            </div>
        </transition>

    </div>
</template>
<script>
export default {
    props:['showModal','dataEdit'],
    data:function(){
        return{
            description:'',
            category:'',
            id:''
        }
    },
    methods:{
        
    },
    watch :{
        dataEdit(){
            this.description =  this.dataEdit.description
            this.category = this.dataEdit.category
            this.id = this.dataEdit.id
            console.log("watch")
        }
    },
    computed:{
        selectBL(){
            if(this.data.category==="backlog"){
                let a ="selected"
                return a
            }
        },
        selectPr(){
            if(this.data.category==="product"){
                let a ="selected"
                return a
            }
        },
        selectDe(){
            if(this.data.category==="development"){
               let a ="selected"
                return a
            }
        },
        selectDn(){
            if(this.data.category==="done"){
                let a ="selected"
                return a
            }
        }
    },
    methods:{
        axiosGetTrigger(id,description,category){
            console.log(`${id} ${description}  ${category}`)
            let updateData={
                id:Number(id),
                description:description,
                category:category
            }
            this.$emit("axiosPut",updateData)
        }
    }
}
</script>