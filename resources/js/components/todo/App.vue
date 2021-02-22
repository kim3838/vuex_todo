<template>
    <div class="mt-36 max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8 border border-gray-300 p-6 rounded-md tracking-wide shadow-lg bg-gradient-to-r from-white-100 to-gray-100">
        <!-- HEADER -->
        <h1 class="text-2xl font-bold">
            <span class="bg-clip-text text-transparent bg-gradient-to-r from-gray-500 to-gray-400">
                Todo App
            </span>
        </h1>
        <div class="mt-4 mb-3 relative flex w-full flex-wrap">
            <span class="z-10 h-full leading-snug font-normal absolute text-gray-400 absolute bg-transparent flex items-center">
                <svg class="ml-3 w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                          :d="todos.length
                          ? 'M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01'
                          : 'M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2'">
                    </path>
                </svg>
            </span>
            <input
                autofocus
                autocomplete="off"
                @keyup.enter="addTodo"
                type="text"
                placeholder="What are you up to?"
                class="pl-12 pr-3 py-3 border border-gray-200 placeholder-gray-400 text-gray-700 relative bg-white rounded text-lg shadow outline-none focus:outline-none focus:shadow-outline w-full"/>
        </div>

        <!-- CONTENT -->
        <div v-show="todos.length">
            <div class="mt-4">
                <label class="inline-flex items-center cursor-pointer">
                    <input
                        :checked="allChecked"
                        @change="toggleAll(!allChecked)"
                        type="checkbox"
                        class="h-8 w-8 form-checkbox text-gray-600 rounded">
                </label>
            </div>

            <div class="mt-2 grid grid-cols-12 gap-2">
                <todo-item v-for="(todo, index) in filteredTodos"
                   :todo="todo"
                   :key="index" />
            </div>
        </div>

        <!-- FOOTER -->
        <div class="mt-4 p-2 flex justify-around items-baseline" v-show="todos.length">
            <div class="">
                <strong>{{ remaining }}</strong> {{ remaining | pluralize('item') }} left
            </div>

            <div class="">
                <span class="ml-2" v-for="(val, key) in filters">
                    <a :href="'#/' + key"
                       class="px-2 py-1 rounded"
                       :class="{ 'border': visibility === key }"
                       @click="visibility = key">{{ key | capitalize }}</a>
                </span>
            </div>

            <div class="">
                <button class="px-2 py-1 outline-none focus:outline-none border rounded hover:underline"
                    v-show="todos.length > remaining"
                    @click="clearCompleted">
                    <span>Clear completed</span>
                </button>
            </div>
        </div>
    </div>
</template>

<script>
import {mapState, mapGetters, mapMutations, mapActions} from "vuex";
import TodoItem from "./TodoItem";

const filters = {
    all: todos => todos,
    active: todos => todos.filter(todo => !todo.done),
    completed: todos => todos.filter(todo => todo.done)
}

export default {
    name : "App",

    components : {
        TodoItem
    },

    mounted() {
    },

    data : function() {
        return {
            visibility: 'all',
            filters: filters
        }
    },

    computed : {
        todos () {
            return this.$store.state.todos;
        },
        allChecked () {
            return this.todos.every(todo => todo.done);
        },
        filteredTodos () {
            return filters[this.visibility](this.todos);
        },
        remaining() {
            return this.todos.filter(todo => !todo.done).length;
        }
    },

    filters : {
        pluralize: (n, w) => n === 1 ? w : (w + 's'),

        capitalize: s => s.charAt(0).toUpperCase() + s.slice(1)
    },

    methods : {
        ...mapActions([
            'toggleAll',
            'clearCompleted'
        ]),
        addTodo(event){
            const todo = event.target.value;

            if (todo.trim()) {
                this.$store.dispatch('addTodo', todo);
            }

            event.target.value = '';
        }
    }
}
</script>

<style scoped>

</style>