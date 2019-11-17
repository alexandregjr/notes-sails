Vue.component("Note", {
    props:  ["id", "name", "type", "data"],
    methods: {
        emitEditNote() {
            this.$emit('edit-note', this.id)
        },
        emitRemoveNote() {
            this.$emit('remove-note', this.id)
        },
        timeLeft(end) {
            let now = Date.now()

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
                        <span class="w-full bg-transparent placeholder-yellow-700 focus:shadow-outline focus:outline-none p-2 px-4 pl-0 text-yellow-900 rounded appearance-none">{{ name }}</span>
                        <span class="font-bold  appearance-none focus:outline-none focus:shadow-outline bg-transparent px-4 text-yellow-900 rounded">{{ type }}</span>
                        <button v-on:click="emitRemoveNote" class="hover:text-yellow-600 focus:text-yellow-600 text-lg px-2 font-bold text-yellow-900 focus:outline-none focus:shadow-outline rounded">X</button>
                    </div>
                    <span v-if="type === 'nota'" class="break-all text-yellow-900 my-3">{{ data[0] ? data[0].description : '' }}</span>
                    <ul v-if="type !== 'nota'" class="flex flex-col w-full my-3 list-disc list-inside px-4">
                        <li
                            v-for="item in data"
                            :key="item.id"
                            :class="{'end text-yellow-700 line-through break-all': item.checked, 'text-yellow-900 break-all' : !item.checked}"
                        > {{ item.description }} <i class="float-right" v-if="type === 'tarefas'">{{ timeLeft(item.ends) }}</i></li>
                    </ul>   
                    <span v-on:click="emitEditNote" class="w-full text-center font-bold text-yellow-900 cursor-pointer">expandir</span>        
                </div>`
})