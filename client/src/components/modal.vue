<template>
    <div>

        <transition name="fade" appear>
            <div class="modal-overlay" v-if="showModal" @click="$emit('toggleModal')"></div>
        </transition>
        <transition name="slide" appear>
            <div class="modal" v-if="showModal">
                <h1 class="">Add something kantan!</h1>
                    <div class="form-modal">
                        <form >
                        
                        <div class="email-container">
                            <label class="backlog" style="font-size: 15px;">Description:</label><br>
                            <textarea class="kanbanDesc" type="text" placeholder="e.g. Doing something" v-model="description" ></textarea>
                        </div>
                        <br>
                        <div style="display:flex; justify-content:center; margin-bottom:3%">
                            <select class="select-opt" id="Category" style="" v-model="category">
                                <option disabled value=""> Select Category </option>
                                <option value="backlog">backlog</option>
                                <option value="product">product</option>
                                <option value="development">development</option>
                                <option value="done">done</option>
                            </select>
                        </div>  
                        
                    </form>

                    </div>
                <div class="form-modal">
                    <button class="buttonModalBlue" @click="createKanban" >
                        New Kanban!
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
    props:['showModal'],
    data:function(){
        return{
            description:'',
            category:''
        }
    },
    methods:{
        createKanban(){
            console.log('masuk kanban')
            let data={
                description:this.description,
                category:this.category
            }
            this.$emit("axiosCreate",data)
            this.description=''
            this.category=''
            this.$emit('toggleModal')
        }
    }
}
</script>