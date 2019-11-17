Vue.component("Item", {
    props:  ["itemData", "type"],
    methods: {
        async toggleChecked() {
            await axios.post('/toggleItem', {
                id: this.itemData.id,
                value: this.itemData.checked
            })
        },
        timeLeft() {
            let end = this.itemData.ends
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
    template: `<div v-bind:class="{end: itemData.checked}" class="flex justify-between">
                    <div class="flex w-full items-center justify-between">
                        <div>
                            <input
                                type="checkbox" 
                                v-model="itemData.checked"
                                v-on:change="toggleChecked()"
                            ></input>
                            <span class="text-yellow-900">{{ itemData.description }}</span>
                        </div>
                        <span v-if="type === 'tarefas'" class="text-yellow-900 italic">{{ timeLeft() }}</span>
                    </div>
                    <button class="hover:text-yellow-600 focus:text-yellow-600 text-sm px-4 font-bold text-yellow-900 focus:outline-none focus:shadow-outline rounded" v-on:click="$emit('remove-item', itemData.id)"><strong>X</strong></button>
                </div>`
})