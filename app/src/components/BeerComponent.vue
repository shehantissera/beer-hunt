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

                <form @submit="submitComment($event)" class="review inputctrl" >
                    <div class="inputstar">
                        <star-rating  class="averagestars" :star-size="25" v-model:rating="new_rating"/> 
                    </div>
                    <div class="inputbox">
                        <input class="search" type="text" name="comment" v-model="comment">
                        <input :disabled="comment == '' && new_rating == 0" class="searchButton" type="submit" value="Comment">
                        
                    </div>
                    <span class="error-msg">{{errorMessage}}</span>
                </form>

                <div class="review" v-if="reviews.length == 0"> No reviews yet</div>
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
            avarage_ratings: 0,
            new_rating: 0,
            comment: "",
            errorMessage: ""
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
        async invokeBeerRatingAPI(beerID) {
            try {
                const postData = {
                    rating: this.new_rating,
                    comments: this.comment
                }
                const res = await fetch('http://localhost:3000/api/beer/rate/' + beerID, {
                    method: "post",
                    headers: {
                        "Content-Type": "application/json",
                        "x-user": localStorage.getItem('x-user'),
                    },
                    body: JSON.stringify(postData),
                });
                this.getBeerReviews(beerID);
                this.new_rating = 0;
                this.comment = "";
            } catch (error) {
                console.log(error);
            }
        },
        calculateAverageRatings(data) {
            if (data.length > 0) {
                let total = data.reduce(function (acc, obj) { return acc + obj.rating; }, 0);
                this.avarage_ratings = total / data.length;
            }
        },
        goBack() {
            this.$router.push('/');
        },
        submitComment(e) {
            this.errorMessage = "";
            e.preventDefault();
            if (this.new_rating !== 0) {
                this.invokeBeerRatingAPI(this.$route.params.id);
            } else {
                this.errorMessage = "Please select the rating";
            }
        }
    },
    mounted() {
        this.getBeerDetails(this.$route.params.id);
        this.getBeerReviews(this.$route.params.id);
    }
}
</script>
<style scoped>
.error-msg {
    color: rgb(255, 128, 128);
    padding: 10px;
}

.inputstar {
    display: flex;
    padding: 10px 0px 0px 10px;
}

.inputctrl {
    background-color: rgb(50, 50, 50);
    border-radius: 10px;
    /* padding: 10px; */
}

.inputbox {
    display: flex;
    flex-direction: row;
    padding: 0px 10px 20px 10px;
}

.search {
    display: flex;
    width: 500px;
}

.searchButton {
    display: flex;
    /* flex-grow: 1; */
}

.averagestars {
    padding: 10px 0px;
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

input {
    padding: 12px 20px 12px 20px;
}

input[text] {
    flex-grow: 5;
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