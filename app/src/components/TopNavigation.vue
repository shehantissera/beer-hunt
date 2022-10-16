
<template>
    <div class="topnav">
        <div>BeerHunt App</div>
        <router-link to="/login">Login</router-link>
        <div>Logout</div>
    </div>
</template>

<style scoped>
.topnav {
    display: flex;
    align-content: center;
    justify-content: space-between;
}

@media (min-width: 1024px) {
    .topnav {
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        padding-right: calc(var(--section-gap) / 2);
    }
}
</style>
