<script setup lang="ts">
import { RouterLink, RouterView, useRouter } from 'vue-router'

const router = useRouter()

const homePage = () => {
  router.push('/')
}
</script>

<template>
  <header>
    <div class="header-container">
      <div class="header-title" @click="homePage">Mood Tracker</div>
      <RouterLink to="/admin/signin">View All Moods</RouterLink>
    </div>
  </header>

  <RouterView />
</template>

<style scoped>
.header-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.header-title {
  font-size: 50px;
  font-weight: 800;
  cursor: pointer;
}
</style>
