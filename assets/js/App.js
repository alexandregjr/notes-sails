new Vue({
    el:     "#root",
    data:   {
        lists           :   [],
        listId          :   0,
        editingList     :   false
    },
    methods: {
        async newNoteEdit(){
            let res = await axios.post("/createNote")
            this.listId = res.data.id
            this.editingList = true
        },
        async addNote(){
            let res = await axios.get('/getNotes')

            this.lists = res.data
            this.editingList = false
        },
        editNote(id) {
            this.listId = id
            this.editingList = true
        },
        async removeNote(id) {
            let res = await axios.delete('/removeNote?id=' + id)
            this.lists = res.data
        }
    },
    async beforeMount() {
        let res = await axios.get('/getNotes')
        this.lists = res.data
    }
})