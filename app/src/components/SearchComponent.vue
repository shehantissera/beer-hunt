<script>
import SearchItem from './SearchItem.vue'

export default {
    components: {
        SearchItem,
    },
    data() {
        return {
            search_text: '',
            search_results: [],
        }
    },
    methods: {
        async search() {
            if (this.search_text != '') {
                try {
                    const res = await fetch(
                        'http://localhost:3000/api/beer/search?q=' +
                            this.search_text,
                        {
                            method: 'get',
                            headers: {
                                'Content-Type': 'application/json',
                                'x-user': localStorage.getItem('x-user'),
                            },
                        }
                    )
                    const data = await res.json()
                    this.search_results = data
                    localStorage.setItem('search', this.search_text)
                } catch (error) {
                    console.log(error)
                }
            }
        },
        searchOnEnter(e) {
            if (e.key == 'Enter') {
                this.search()
            }
        },
        clear() {
            this.search_results = []
            this.search_text = ''
            localStorage.removeItem('search')
        },
    },
    mounted() {
        const search = localStorage.getItem('search')
        if (search) {
            this.search_text = search
            this.search()
        }
    },
}
</script>

<template>
    <div class="searchbar">
        <input
            @keydown="searchOnEnter($event)"
            v-model="search_text"
            type="text"
            placeholder="Search for beer ... press enter"
        />
        <button class="button" @click="search()">
            <img
                width="15"
                height="15"
                src="https://static.thenounproject.com/png/1012361-200.png"
                alt=""
            />
        </button>
        <button class="button" @click="clear()">
            <img
                width="15"
                height="15"
                src="https://cdn4.iconfinder.com/data/icons/ionicons/512/icon-close-512.png"
                alt=""
            />
        </button>
    </div>
    <div v-if="search_results.length == 0">No Results found</div>
    <SearchItem
        :key="item.id"
        :searchItem="item"
        v-for="item in search_results"
    >
    </SearchItem>
</template>

<style scoped>
.searchbar {
    display: flex;
    padding: 20px 0px;
    color: aliceblue;
}

.button {
    padding: 0px 15px;
}

.searchbar input[type='text'] {
    width: 100%;
    box-sizing: border-box;
    border: 2px solid #ccc;
    border-radius: 4px;
    font-size: 16px;
    background-color: white;
    background-image: url('https://www.w3schools.com/css/searchicon.png');
    background-position: 10px 10px;
    background-repeat: no-repeat;
    padding: 12px 20px 12px 40px;
}
</style>
