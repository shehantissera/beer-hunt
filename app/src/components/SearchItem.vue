
<script>
export default {
    props: {
        searchItem: {
            type: Object,
            required: true
        }
    },
    methods: {
        seeBeerInfo(beerID) {
            this.$router.push('/beer/' + beerID)
        }
    }
}
</script>

<template>
    <div class="search-item" @click="seeBeerInfo(searchItem.id)">
        <div class="beername">{{searchItem.name}} - <i>first brewed - {{searchItem.first_brewed}}</i></div>
        <div>{{searchItem.description}}</div>
        <ul v-if="searchItem.food_pairing.length">
            <li v-for="pair in searchItem.food_pairing">{{pair}}</li>
        </ul>
    </div>
</template>

<style scoped>
.beername {
    font-size: 18px;
    font-weight: bold;
}

.search-item {
    cursor: pointer;
    padding: 15px;
    border-radius: 10px;
    background-color: #242424;
    margin-bottom: 10px;
    user-select: none;
    max-width: 1000px;
}
</style>
