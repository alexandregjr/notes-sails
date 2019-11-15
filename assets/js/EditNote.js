Vue.component("EditNote", {
    props: ["listId"],
    data() {
        return {
            data            :   [],
            count           :   0,
            newItemDesc     :   "",
            newItemDay      :   "",
            newItemHour     :   "",
            name            :   "",
            type            :   "lista",
            id              :   this.listId
        }
    },
    methods: {
        async newItem() {
            if(!this.newItemDesc || this.newItemDesc.length < 0) 
                return
            
            if (this.type === 'tarefas' && (this.newItemDay === '' || this.newItemHour === ''))
                return
            
            let res
            if (this.type !== 'tarefas')
                try {
                    res = await axios.post('/addItem', {
                        description: this.newItemDesc,
                        note: this.id
                    })
                } catch (err) {
                    this.newItemDesc = ""
                    return
                }
            else 
                try {
                    res = await axios.post('/addItem', {
                        description: this.newItemDesc,
                        note: this.id,
                        ends: Date.parse(this.newItemDay + ' ' + this.newItemHour)
                    })
                } catch (err) {
                    this.newItemDesc = ''
                    this.newItemDay = ''
                    this.newItemHour = ''
                    return
                }
            
            this.newItemDesc = ""
            this.newItemDay = ''
            this.newItemHour = ''
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
            
            if (this.type === 'nota') 
                await axios.post('/addOrUpdateItem', {
                    description: this.newItemDesc,
                    note: this.id
                })

            this.$emit("save-list")
        },
        async handleRemove(id){
            await axios.delete('/removeItem?id=' + id)
            this.data = this.data.filter((item) => item.id !== id)
        },
        async changeType() {
            let res = await axios.post('/updateNoteType', {
                id:     this.id,
                type:   this.type
            })

            let { data } = res
            // just res.ok()
            if (data === null) 
                return
            
            this.type = data.type
            this.data = data.items
        }
    },
    async beforeMount() {
        let res = await axios.get('/getNote?id=' + this.id)
        let { data } = res
        
        this.name = data.title
        this.type = data.type
        this.data = data.items

        if (this.type === 'nota' && this.data[0])
            this.newItemDesc = this.data[0].description
    },
    template:  `<div class="flex items-center justify-center w-full h-screen z-10 fixed cover top-0 left-0">
                    <div  class="w-1/3 h-1/2 bg-yellow-400 p-5 flex justify-between flex-wrap rounded">
                        <input class="w-1/2 bg-transparent placeholder-yellow-700 focus:shadow-outline focus:outline-none p-2 px-4 text-yellow-900 rounded appearance-none" type="text" placeholder="title" v-model="name"></input>
                        <div class="relative w-1/3">
                            <select v-on:change="changeType" v-model="type" class="w-full h-full appearance-none focus:outline-none focus:shadow-outline bg-transparent px-4 text-yellow-900 rounded">
                                <option value="lista">lista</option>
                                <option value="tarefas">tarefas</option>
                                <option value="nota">nota</option>
                            </select>
                            <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-yellow-800">
                                    <svg class="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                            </div>
                        </div>
                        <button v-on:click="emitSaveList" class="hover:text-yellow-600 focus:text-yellow-600 text-lg px-4 font-bold text-yellow-900 focus:outline-none focus:shadow-outline rounded">X</button>
                        <div v-if="type !== 'nota'" class="flex flex-col w-full my-3">
                            <item 
                                v-for="item in data"
                                :key="item.id"
                                :itemData="item"
                                :type="type"
                                @remove-item="handleRemove"
                            ></item>
                        </div>
                        <form v-on:submit.prevent="newItem" class="flex items-center justify-between w-full mt-3 flex-wrap">
                            <input v-if="type !== 'nota'" v-model="newItemDesc" class="w-1/2 bg-transparent placeholder-yellow-700 focus:shadow-outline focus:outline-none p-2 px-4 text-yellow-900 rounded appearance-none" placeholder="nome do item"></input>
                            <input class="w-1/2 bg-transparent placeholder-yellow-700 focus:shadow-outline focus:outline-none p-2 px-4 text-yellow-900 rounded appearance-none" v-if="type === 'tarefas'" type="date" v-model="newItemDay" placeholder="Vencimento da tarefa"></input>
                            <input class="w-1/2 bg-transparent placeholder-yellow-700 focus:shadow-outline focus:outline-none p-2 px-4 text-yellow-900 rounded appearance-none" v-if="type === 'tarefas'" type="time" v-model="newItemHour" placeholder="Vencimento da tarefa"></input>
                            <button v-if="type !== 'nota'" class="w-1/2 flex-grow hover:text-yellow-600 focus:text-yellow-600 text-yellow-800 focus:shadow-outline focus:outline-none font-bold py-2 px-4 rounded">adicionar item</button> 
                            <textarea v-if="type === 'nota'" rows="4" v-model="newItemDesc" class="w-full resize-none rounded focus:shadow-outline focus:outline-none bg-transparent text-yellow-900"></textarea>
                        </form>           
                    </div>
                </div>`


})