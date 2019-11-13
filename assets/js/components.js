Vue.component("List", {
    props:  ["id", "name", "type", "data"],
    methods: {
        emitEditList() {
            this.$emit('edit-list', this.id)
        }
    },
    template:  `<div class="w-1/4 m-5 bg-yellow-400 p-5 flex justify-between flex-wrap rounded" v-on:click="emitEditList">
                    <span class="w-1/2 bg-transparent placeholder-yellow-700 focus:shadow-outline focus:outline-none p-2 px-4 text-yellow-900 rounded appearance-none">{{ name }}</span>
                    <div class="relative w-1/3 flex items-center">
                        <span class="w-full font-bold  appearance-none focus:outline-none focus:shadow-outline bg-transparent px-4 text-yellow-900 rounded">{{ type }}</span>
                    </div>
                    <ul class="flex flex-col w-full my-3 list-disc list-inside px-4">
                        <li
                            v-for="item in data"
                            :class="{'end text-yellow-700 line-through': item.checked, 'text-yellow-900' : !item.checked}"
                        > {{ item.description }}</li>
                    </ul>           
                </div>`
})



Vue.component("Item", {
    props:  ["itemData", "type"],
    methods: {
        async toggleChecked() {
            await axios.post('/toggleItem', {
                id: this.itemData.id,
                value: this.itemData.checked
            })
        }
    },
    template: `<div v-bind:class="{end: itemData.checked}" class="flex justify-between">
                    <div>
                        <input
                            type="checkbox" 
                            v-model="itemData.checked"
                            v-on:change="toggleChecked()"
                        ></input>
                        <span class="text-yellow-900">{{ itemData.description }}</span>
                    </div>
                    <button class="hover:text-yellow-600 focus:text-yellow-600 text-sm px-4 font-bold text-yellow-900 focus:outline-none focus:shadow-outline rounded" v-on:click="$emit('remove-item', itemData.id)"><strong>X</strong></button>
                </div>`
})


Vue.component("EditList", {
    props: ["listId"],
    data() {
        return {
            data            :   [],
            count           :   0,
            newItemDesc     :   "",
            newItemDeadline :   "",
            name            :   "",
            type            :   "todo",
            id              :   this.listId
        }
    },
    methods: {
        async newItem() {
            if(!this.newItemDesc || this.newItemDesc.length < 0) 
                return
            
            let res

            try {
                res = await axios.post('/addItem', {
                    description: this.newItemDesc,
                    note: this.id
                })
            } catch (err) {
                this.newItemDesc = ""
                return
            }
            
            this.newItemDesc = ""
            
            // let { data } = res
            // let item = res.data
            // item.id = data.id
            // item.description = data.description

            
            // if(this.type === "tarefas") 
            //     item.deadline = this.newItemDeadline
            
            // item.checked = data.checked

            this.data.push(res.data);
            return
        },
        async emitSaveList(){
            let e = {
                id:     this.id,
                name:   this.name,
                type:   this.type
            }

            await axios.post('/addNote', e)
            
            this.$emit("save-list")
        },
        async handleRemove(e){
            await axios.post('/removeItem', {id: e})
            this.data = this.data.filter((item) => item.id !== e)
        }
    },
    async beforeMount() {
        let res = await axios.get('/getNote?id=' + this.id)
        let { data } = res
        
        this.name = data.title
        this.type = data.type
        this.data = data.items
    },
    template: `<div class="flex items-center justify-center w-full h-screen z-10 fixed cover top-0 left-0">
                <div  class="w-1/3 h-1/2 bg-yellow-400 p-5 flex justify-between flex-wrap rounded">
                    <input class="w-1/2 bg-transparent placeholder-yellow-700 focus:shadow-outline focus:outline-none p-2 px-4 text-yellow-900 rounded appearance-none" type="text" placeholder="title" v-model="name"></input>
                    <div class="relative w-1/3">
                        <select v-model="type" class="w-full h-full appearance-none focus:outline-none focus:shadow-outline bg-transparent px-4 text-yellow-900 rounded">
                            <option selected value="todo">todo</option>
                            <option value="tarefas">tarefas</option>
                            <option value="nota">nota</option>
                        </select>
                        <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-yellow-800">
                                <svg class="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                        </div>
                    </div>
                    <button v-on:click="emitSaveList" class="hover:text-yellow-600 focus:text-yellow-600 text-lg px-4 font-bold text-yellow-900 focus:outline-none focus:shadow-outline rounded">X</button>
                    <div class="flex flex-col w-full my-3">
                        <item 
                            v-for="item in data"
                            :key="item.id"
                            :itemData="item"
                            :type="this.type"
                            @remove-item="handleRemove"
                        ></item>
                    </div>
                    <form v-on:submit.prevent="newItem" class="flex items-center justify-between w-full mt-3 flex-wrap">
                        <input v-model="newItemDesc" class="w-1/2 bg-transparent placeholder-yellow-700 focus:shadow-outline focus:outline-none p-2 px-4 text-yellow-900 rounded appearance-none" placeholder="nome do item"></input>
                        <input class="w-1/2 bg-transparent placeholder-yellow-700 focus:shadow-outline focus:outline-none p-2 px-4 text-yellow-900 rounded appearance-none" v-if="type === 'tarefas'" type="date" v-model="newItemDeadline" placeholder="Vencimento da tarefa"></input>
                        <button class="w-1/2 flex-grow hover:text-yellow-600 focus:text-yellow-600 text-yellow-800 focus:shadow-outline focus:outline-none font-bold py-2 px-4 rounded">adicionar item</button> 
                    </form>           
                </div>
            </div>`


})

new Vue({
    el:     "#root",
    data:   {
        lists           :   [],
        listId          :   0,
        editingList     :   false
    },
    methods:    {
        async newListEdit(){
            let res = await axios.get("/createNote")
            this.listId = res.data.id
            this.editingList = true
        },
        async addList(){
            let res = await axios.get('/getNotes')

            this.lists = res.data
            this.editingList = false
        },
        editList(id) {
            this.listId = id
            this.editingList = true
        }
    },
    async beforeMount() {
        let res = await axios.get('/getNotes')

        this.lists = res.data
    }
})