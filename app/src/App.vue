<script setup>
import TopNavigation from './components/TopNavigation.vue'
import SearchComponent from './components/SearchComponent.vue'
</script>

<template>

  <TopNavigation />

  <main>
    <SearchComponent />
  </main>

</template>

<style scoped>
body {
  color: rgb(229 229 229 / 76%);
}

/* @media (min-width: 1024px) {} */
</style>
