new Vue({
    el:     "#root",
    data:   {
        notes           :   [],
        searching       :   [],
        filtering       :   [],
        filters         :   [],
        noteID          :   0,
        editingList     :   false,
        selectingSort   :   false,
        sortType        :   'update',
        selectingFilter :   false,
        filterType      :   '',
        search          :   ''
    },
    methods: {
        async newNoteEdit(){
            let res = await axios.post("/createNote")
            this.noteID = res.data.id
            this.selectingSort = false
            this.editingList = true
        },
        async addNote(){
            let res = await axios.get('/getNotes')

            this.notes = res.data
            this.sortNotes()
            this.filterNotes()
            this.editingList = false
        },
        editNote(id) {
            this.noteID = id
            this.selectingSort = false
            this.editingList = true
        },
        async removeNote(id) {
            let res = await axios.delete('/removeNote?id=' + id)

            this.notes = res.data
            this.sortNotes()
        },
        sortMenu() {
            this.selectingSort = !this.selectingSort
            this.selectingFilter = false
        },
        filterMenu() {
            this.selectingFilter = !this.selectingFilter
            this.selectingSort = false
        },
        sortNotes() {
            if (!this.filterType)
                if (this.sortType === 'update')
                    this.notes.sort(this.sortByUpdate)
                if (this.sortType === 'name')
                    this.notes.sort(this.sortByName)
                if (this.sortType === 'type')
                    this.notes.sort(this.sortByType)
            else
                if (this.sortType === 'update')
                    this.filtering.sort(this.sortByUpdate)
                if (this.sortType === 'name')
                    this.filtering.sort(this.sortByName)
                if (this.sortType === 'type')
                    this.filtering.sort(this.sortByType)

            this.selectingSort = false
        },
        filterNotes() {
            this.selectingFilter = false
            
            if (!this.filterType) {
                this.filtering = []
                return
            }

            this.filtering = this.notes.filter((item) => {
                for (let t of item.tags) {
                    if (t.name === this.filterType)
                        return true
                }
                return false
            })
        },
        sortByType(a, b) {
            if (a.type > b.type)
                return 1
            if (b.type > a.type)
                return -1
            return b.updatedAt - a.updatedAt
        },
        sortByName(a, b) {
            if (a.title > b.title)
                return 1
            if (b.title > a.title)
                return -1
            return b.updatedAt - a.updatedAt
        },
        sortByUpdate(a, b) {
            return b.updatedAt - a.updatedAt
        },
        searchByTitle() {
            this.filtering = []
            this.searching = this.notes.filter((item) => item.title.includes(this.search))
        },
        async updateTags() {
            let tags = await axios.get('/getTags')
            this.filters = tags.data
            this.filterType = ''
        }
    },
    async beforeMount() {
        let notes = await axios.get('/getNotes')
        let tags = await axios.get('/getTags')

        this.filters = tags.data
        this.notes = notes.data
        this.sortNotes()
    }
})