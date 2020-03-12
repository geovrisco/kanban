<template>
    <div>

        <transition name="fade" appear>
            <div class="modal-overlay" v-if="showModal" @click="$emit('toggleModal')"></div>
        </transition>
        <transition name="slide" appear>
            <div class="modal" v-if="showModal">
                <h1>Add something kantan!</h1>
                    <div class="form-modal">
                        <form >
                        
                        <div class="email-container">
                            <label class="backlog" style="font-size: 15px;">Description:</label><br>
                            <input class="email" type="text" placeholder="e.g. Doing something">
                        </div>
                        <br>
                        <div >
                            <select class="select-opt" id="Category" style="">
                                <option value="backlog">backlog</option>
                                <option value="development">development</option>
                                <option value="production">production</option>
                                <option value="done">done</option>
                            </select>
                        </div>  
                        
                    </form>

                    </div>
                <div class="form-modal">
                    <button class="buttonModalBlue" @click="$emit('toggleModal')" >
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
    props:['showModal']
}
</script>