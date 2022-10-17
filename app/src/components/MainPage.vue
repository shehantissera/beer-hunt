<script setup>
import TopNavigation from './TopNavigation.vue'
import SearchComponent from './SearchComponent.vue'

</script>

<template>
    <div class="main">
        <TopNavigation />
        <main>
            <SearchComponent />
        </main>
    </div>
</template>

<style scoped>
.main {
    min-width: 1000px;
}
</style>
