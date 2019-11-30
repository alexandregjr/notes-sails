Vue.component("Note", {
    props:  ["id", "name", "type", "data", "tags"],
    methods: {
        emitEditNote() {
            this.$emit('edit-note', this.id)
        },
        emitRemoveNote() {
            this.$emit('remove-note', this.id)
        },
        timeLeft(end) {
            let now = Date.now()

            if (end < 0)
                return "acabou"
            
            let remain = end - now
            
            if (remain < 0) 
                return "acabou"

            let secs = remain / 1000
            let mins = secs / 60
            let hours = mins / 60
            let days = hours / 24
            let years = days / 365

            if (years > 1)
                return Math.floor(years) + ' anos restantes'

            if (days > 1)
                return Math.floor(days) + ' dias restantes'

            if (hours > 1)
                return Math.floor(hours) + ' horas restantes'

            if (mins > 1)
                return Math.floor(mins) + ' minutos restantes'

            if (secs > 1)
                return Math.floor(secs) + ' segundos restantes'
        }
    },
    template:  `<div class="w-full mb-5 bg-yellow-400 p-5 flex justify-between flex-wrap rounded">
                    <div class="relative w-full flex items-center">
                        <span class="w-full bg-transparent placeholder-yellow-700 focus:shadow-outline focus:outline-none p-2 px-4 pl-0 rounded appearance-none" :class="name.trim() === '' ? 'text-yellow-700 italic' : 'text-yellow-900'">{{ name.trim() === '' ? 'sem titulo' : name}}</span>
                        <span class="font-bold  appearance-none focus:outline-none focus:shadow-outline bg-transparent px-4 text-yellow-900 rounded">{{ type }}</span>
                        <button v-on:click="emitRemoveNote" class="hover:text-yellow-600 focus:text-yellow-600 text-lg px-2 font-bold text-yellow-900 focus:outline-none focus:shadow-outline rounded">X</button>
                    </div>
                    <div v-if="type === 'nota'" class="w-full flex">
                        <span class="break-all my-3" :class="data[0] && data[0].description.trim() ? 'text-yellow-900' : 'text-yellow-700 italic'">{{ data[0] && data[0].description.trim() ? data[0].description : 'sem conteudo' }}</span>
                    </div>
                    <ul v-if="type !== 'nota' && data.length > 0" class="flex flex-col w-full my-3 list-disc list-inside px-4">
                        <li
                            v-for="item in data"
                            :key="item.id"
                            :class="{'end text-yellow-700 line-through break-all': item.checked, 'text-yellow-900 break-all' : !item.checked}"
                        > {{ item.description }} <i class="float-right" v-if="type === 'tarefas'">{{ timeLeft(item.ends) }}</i></li>
                    </ul>
                    <div v-if="type !== 'nota' && data.length === 0" class="w-full flex">
                        <span class="break-all text-yellow-700 italic my-3" >sem conteudo</span>
                    </div>
                    <div v-if="tags.length > 0" class="flex flex-wrap">
                        <span v-for="(tag, index) in tags" v-if="3 > index" class="break-all px-2 bg-yellow-500 text-yellow-900 mr-2 mb-2" :class="tag.name && tag.name.length > 28 ? 'rounded-lg' : 'rounded-full'">{{ tag.name }}</span>
                        <span v-if="tags && tags.length > 3" class="text-yellow-700">...</span>
                    </div>
                    <button v-on:click="emitEditNote" class="w-full text-center font-bold text-yellow-900 cursor-pointer focus:outline-none focus:shadow-outline py-2 mt-2 bg-yellow-500 rounded hover:bg-yellow-600">expandir</button>        
                </div>`
})