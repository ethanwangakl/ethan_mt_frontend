<script setup lang="ts">
import { useAdminStore } from '@/stores/admin'
import { useRouter } from 'vue-router'

const adminStore = useAdminStore()
const router = useRouter()

const handleSubmit = async () => {
  const error = await adminStore.login()
  if (error) {
    alert(error)
    return
  }

  router.push('/admin/mood')
}
</script>

<template>
  <div class="admin-sign-in-container">
    <form @submit.prevent="handleSubmit" class="login-form">
      <div class="form-field">
        <label for="username">Username</label>
        <input
          type="text"
          id="username"
          v-model="adminStore.username"
          placeholder="Enter your username"
        />
      </div>
      <div class="form-field">
        <label for="password">Password</label>
        <input
          type="password"
          id="password"
          v-model="adminStore.password"
          placeholder="Enter your password"
        />
      </div>
      <button type="submit">Sign In</button>
    </form>
  </div>
</template>

<style scoped>
.admin-sign-in-container {
  display: flex;
  justify-content: center;
  height: 100vh;
  margin-top: 50px;
}

.login-form {
  display: flex;
  flex-direction: column;
  width: 300px;
  padding: 20px;
}

.form-field {
  margin-bottom: 20px;
}

label {
  display: block;
  margin-bottom: 5px;
  font-weight: 600;
}

input {
  width: 100%;
}
</style>
