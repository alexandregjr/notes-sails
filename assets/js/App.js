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
        search          :   '',
        authUser        :   '',
        userSideBar     :   true,
        username        :   '',
        password        :   '',
        email           :   '',
        loginError      :   false
    },
    methods: {
        async newNoteEdit(){
            let res = await axios.post("/createNote")
            if(!res.data.note) return console.log(res.data.message);
            this.noteID = res.data.note.id
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
            if (this.sortType === 'update') {
                this.notes.sort(this.sortByUpdate)
                this.filtering.sort(this.sortByUpdate)
            }
            if (this.sortType === 'name') {
                this.notes.sort(this.sortByName)
                this.filtering.sort(this.sortByName)
            }
            if (this.sortType === 'type') {
                this.notes.sort(this.sortByType)
                this.filtering.sort(this.sortByType)
            }

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
        },
        showUserBar() {
            if(this.authUser.none) this.userSideBar = 'login';
            else this.userSideBar = 'logout';
            this.loginError = false;
        },
        hideUserBar() {
            this.userSideBar = false;
            [this.username, this.password, this.email] = ['', '', ''];
        },
        showRegister() {
            this.userSideBar = 'register';
            [this.username, this.password, this.email] = ['', '', ''];
        },
        showLogin() {
            this.userSideBar = 'login';
            [this.username, this.password, this.email] = ['', '', ''];
            this.loginError = false;
        },
        async submitLogin() {
            const data = (await axios.post('/auth', {
                username: this.username,
                password: this.password,
                email: this.email
            })).data;
            if(data.login) {
                location.reload(true);
            } else {
                this.loginError = data.message;
            }
        },
        async submitRegister() {
            const res = (await axios.post('/user', {
                username: this.username,
                password: this.password,
                email: this.email
            }));
            if(res.status === 200) {
                console.log("User created");
                this.submitLogin();
            } else {
                console.log(res.data)
            }
        },
        submitLogout() {
            const logout = axios.delete('/auth');
            if(logout){
                this.authUser = {username: 'profile', none: true};
                this.userSideBar = 'login';
            }
        },
        async submitDeleteAcc() {
            const res = await axios.delete('/user');
            let logout = {data:false};
            if(res.data) logout = await axios.delete('/auth');
            if(logout.data) {
                this.authUser = {username: 'profile', none: true};
                this.userSideBar = 'login';
            }
        }
    },
    async beforeMount() {
        //axios.defaults.withCredentials = true;
        const user = (await axios.get('/auth')).data;

        if(!user) {
            this.authUser = {username: 'profile', none: true};
            this.userSideBar = 'login';
        } else {
            const notes = await axios.get('/getNotes');
            const tags = await axios.get('/getTags');
            this.authUser = user;
            this.userSideBar = false;
            this.filters = tags.data;
            this.notes = notes.data;
            this.sortNotes();
        }
        this.loginError = false;
        
    },
})