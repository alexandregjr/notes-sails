Vue.component("Tag", {
    props: ["id", 'name'],
    methods: {
        emitRemoveTag(){
            this.$emit("remove-tag", this.id)
        }
    },
    template:  `<div class="flex bg-yellow-500 rounded-full px-4 mr-2 mt-2">
                    <span class="text-yellow-900"> {{ this.name }} </span>
                    <span class="mx-1"></span>
                    <button v-on:click="emitRemoveTag" class="italic text-yellow-900">X</button>
                </div>`


})