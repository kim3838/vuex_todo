<template>
    <div class="col-span-4">
        <div class="w-full p-2 border rounded border-gray-200 bg-white shadow-sm hover:bg-gray-100">
            <div class="flex justify-between items-center">
                <label class="inline-flex items-center cursor-pointer w-full">
                    <input
                        type="checkbox"
                        class="form-checkbox text-gray-600 rounded"
                        :checked="todo.done"
                        @change="toggleTodo(todo)">
                    <span
                        v-show="!editing"
                        class="ml-1 font-sans text-base text-gray-500"
                        :class="{ done : todo.done}"
                        v-text="todo.label"></span>
                    <input
                        class="ml-1 outline-none font-sans text-base text-gray-500"
                        v-show="editing"
                        v-focus="editing"
                        :value="todo.label"
                        @keyup.enter="doneEditing"
                        @keyup.esc="cancelEdit"
                        @blur="doneEditing"
                        />
                </label>
                <div class="px-2 text-gray-500 flex justify-between">
                    <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" :d="todo.done ? 'M5 13l4 4L19 7' : 'M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z'"></path>
                    </svg>

                    <svg v-show="!editing" @click="editing = true" class="ml-4 w-6 h-6 cursor-pointer" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path>
                    </svg>

                    <svg @click="removeTodo(todo)" class="ml-1 w-6 h-6 cursor-pointer" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                    </svg>
                </div>
            </div>
            <div class="hidden mt-4 font-sans text-sm text-gray-500" v-text=""></div>
        </div>
    </div>
</template>

<script>
import {mapState, mapGetters, mapMutations, mapActions} from "vuex";

export default {
    name: "TodoItem",

    props : ['todo'],

    data : function() {
        return {
            editing : false
        }
    },

    directives: {
        focus (el, { value }, { context }) {
            if (value) {

                el.setSelectionRange(0, el.value.trim().length);

                el.focus();
            }
        }
    },

    methods : {
        ...mapActions([
            'toggleTodo',
            'editTodo',
            'removeTodo'
        ]),

        doneEditing(event){

            let that = this;

            const label = event.target.value.trim();

            const {todo} = that; //same as this.todo or that.todo

            if (!label) {

                this.removeTodo(todo);

            } else if (that.editing){

                that.editTodo({todo, label});

                this.editing = false
            }

        },

        cancelEdit(event){

            event.target.value = this.todo.label;

            this.editing = false;
        }
    }
}
</script>

<style scoped>
.done {
    text-decoration: line-through;
}
</style>
