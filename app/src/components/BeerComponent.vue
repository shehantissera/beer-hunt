<template lang="">
    <div class="beer-component">
        <div class="backbutton">
            <button @click="goBack()">Go Back</button>
        </div>
        <div class="beer-info">
            <div class="beer-img">
                <img width="200" height="200" src="https://avery-website-prod.s3.us-west-2.amazonaws.com/islandrascal_product_b07470703d.png" alt="">
            </div>
            <div class="beer-description">
                <div>
                    <h2>{{beerInfo.name}} - <i>{{ beerInfo.first_brewed}}</i></h2>
                </div>
                <star-rating  class="averagestars" :star-size="20" :rating="avarage_ratings" :read-only="true"/> 
                <div>{{beerInfo.description}}</div>
                <ul>
                    <li v-for="(item, index) in beerInfo.food_pairing" :key="index">{{item}}</li>
                </ul>
            </div>
        </div>
        <div class="beer-info">
            <div class="review-section">
                <h2 class="title">Reviews</h2>

                <div class="review" v-for="(item, index) in reviews" :key="item.id">
                    <div class="stars">
                        <star-rating :star-size="20" :rating="item.rating" :read-only="true"/> 
                        <span class="email"> <i>{{item.user}}</i> </span>
                    </div>
                    <div>{{item.comments}}</div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import StarRating from 'vue-star-rating'
export default {
    components: {
        StarRating
    },
    data() {
        return {
            beerInfo: {
                id: 0,
                name: "",
                description: "",
                first_brewed: "",
                food_pairing: []
            },
            reviews: [],
            avarage_ratings: 0
        }
    },
    methods: {
        async getBeerDetails(beerID) {
            try {
                const res = await fetch('https://api.punkapi.com/v2/beers/' + beerID);
                const data = await res.json();
                this.beerInfo = data[0];
            } catch (error) {
                console.log(error);
            }
        },
        async getBeerReviews(beerID) {
            try {
                const res = await fetch('http://localhost:3000/api/beer/ratings/' + beerID, {
                    method: "get",
                    headers: {
                        "Content-Type": "application/json",
                        "x-user": localStorage.getItem('x-user'),
                    }
                });
                const data = await res.json();
                this.calculateAverageRatings(data);
                this.reviews = data;
            } catch (error) {
                console.log(error);
            }
        },
        calculateAverageRatings(data) {
            let total = data.reduce(function (acc, obj) { return acc + obj.rating; }, 0);
            this.avarage_ratings = total / data.length;
        },
        goBack() {
            this.$router.push('/');
        }
    },
    mounted() {
        this.getBeerDetails(this.$route.params.id);
        this.getBeerReviews(this.$route.params.id);
    }
}
</script>
<style scoped>
.averagestars {
    padding: 20px 0px;
}

.email {
    padding-left: 20px;
}

.stars {
    display: flex;
    justify-content: start;

}

.title {
    margin-bottom: 10px;
}

.review {
    padding: 10px;
    margin-bottom: 10px;
}

input[type=button] {
    padding: 12px 20px 12px 40px;
}

.backbutton {
    padding: 10px 0px;
}

.review-section {
    display: flex;
    background-color: #242424;
    width: 100%;
    flex-direction: column;
    border-radius: 10px;
    padding: 20px;
}

.beer-component {
    display: flex;
    flex-direction: column;
    max-width: 1000px;
}

.beer-img {
    display: flex;
    justify-content: center;
    padding: 40px;
    flex-grow: 1;
}

.beer-description {
    background-color: #242424;
    flex-grow: 2;
    padding: 10px;
    border-radius: 10px;
}

.beer-info {
    display: flex;
    padding: 20px;
}
</style>