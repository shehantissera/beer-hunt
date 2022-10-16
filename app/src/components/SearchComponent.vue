
<script>
import SearchItem from './SearchItem.vue'

export default {
    components: {
        SearchItem
    },
    data() {
        return {
            search_text: "",
            search_results: [
                {
                    "id": 180,
                    "name": "Doodlebug",
                    "description": "Doodlebug is our fusion of low strength and enormously high tropical hop levels – think a mashup of Hop Fiction and How to Disappear Completely, and you’re almost there. Clocking in at 2.8% ABV, Doodlebug is keg-only and is packed with Amarillo, Chinook and Mosaic; letting fly a hoppy buzzbomb at sub-session-strength.",
                    "first_brewed": "09/2015",
                    "food_pairing": [
                        "Lightly curried spiced chickpea dip",
                        "Fried calamari with a mild sauce",
                        "Lemon sherbet cookies"
                    ]
                },
                {
                    "id": 293,
                    "name": "I Wanna Be Your Dog",
                    "description": "A collaboration with Omnipollo, known for their uncanny ability to repilcate dessert flavours in indulgent beers. This caramel and pecan flavoured imperial stout has been barrel aged for almost a year in whisky casks, to add an extra level of depth to the pecan mud pie concept.",
                    "first_brewed": "2017",
                    "food_pairing": [
                        "Pecan muffins with chocolate ganache",
                        "Salted caramels",
                        "Hazelnut truffles"
                    ]
                },
                {
                    "id": 302,
                    "name": "Hazy Jane Bourbon Barrel Aged",
                    "description": "A draft-only BrewDog bar exclusive; we have experimented with ageing our Vermount IPA for a short time in bourbon and rye barrels, both known for imparting flavour quickly compared to other types of barrel.",
                    "first_brewed": "2018",
                    "food_pairing": [
                        "Coconut vanilla prawns",
                        "Italian style goat's cheese pizza",
                        "Vanilla panna cotta with pomegranate"
                    ]
                }
            ]
        }
    },
    methods: {
        search() {
            if (this.search_text != "") {
                // invoke API
                this.search_text = "";
            }
        },
        searchOnEnter(e) {
            if (e.key == 'Enter') {
                this.search(this.search_text)
            }
        }
    }
}
</script>

<template>
    <div class="searchbar">
        <input @keydown="searchOnEnter($event)" v-model="search_text" type="text"
            placeholder="Search for beer ... press enter">
        <button class="button" @click="search()"><img width="15" height="15"
                src="https://static.thenounproject.com/png/1012361-200.png" alt=""></button>
    </div>
    <SearchItem :key="item.id" :searchItem="item" v-for="item in search_results"></SearchItem>
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

.searchbar input[type=text] {
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
