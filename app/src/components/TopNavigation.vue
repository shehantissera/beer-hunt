<script>
export default {
    data() {
        return {
            emailAddress: "someEmailAddress",
        }
    },
    methods: {
        loginOut(e) {
            localStorage.removeItem('x-user');
        }
    }
}
</script>

<template>
    <div class="topnav">
        <div>BeerHunt App</div>
        <div class="actions">
            <div class="email">{{emailAddress}}</div>
            <a href="#" @click="loginOut()">Logout</a>
        </div>

    </div>
</template>

<style scoped>
.topnav {
    display: flex;
    align-content: center;
    justify-content: space-between;
}

.email {
    font-weight: bold;
    margin-right: 20px;
}

.actions {
    display: flex;
}
</style>
