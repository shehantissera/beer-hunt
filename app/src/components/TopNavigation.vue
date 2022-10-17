<script>
export default {
    data() {
        return {
            emailAddress: "",
        }
    },
    methods: {
        loginOut(e) {
            localStorage.removeItem('x-user');
        },
        loadData() {
            this.emailAddress = localStorage.getItem('x-user');
        }
    },
    mounted() {
        this.loadData();
    }
}
</script>

<template>
    <div class="topnav">
        <div class="logo">
            <img width="50" height="50" src="../assets/beer.gif" alt="">
            <h2 class="title"> <b>BeerHunt</b></h2>
        </div>

        <div class="actions">
            <div class="email">{{emailAddress}}</div>
            <a href="#" @click="loginOut()">Logout</a>
        </div>

    </div>
</template>

<style scoped>
.logo {
    display: flex;
    align-items: center;
}

.title {
    padding-left: 20px;
}

.topnav {
    display: flex;
    align-content: center;
    justify-content: space-between;
    min-width: 1000px;
}

.email {
    font-weight: bold;
    margin-right: 20px;
}

.actions {
    display: flex;
    align-items: center;
}
</style>
