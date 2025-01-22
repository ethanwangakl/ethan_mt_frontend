<script setup lang="ts">
import { MoodTypes } from '@/entities/mood'
import { useAdminStore } from '@/stores/admin'
import { format } from 'date-fns'
import { onMounted, ref } from 'vue'

const adminStore = useAdminStore()
const searchUsername = ref('')
const searchMood = ref<MoodTypes | ''>('')

const handleSearch = async () => {
  const error = await adminStore.queryAllUserMoods(searchUsername.value, searchMood.value)
  if (error) {
    alert(error)
  }
}

onMounted(async () => {
  const error = await adminStore.queryAllUserMoods(null, null)
  if (error) {
    alert(error)
  }
})
</script>

<template>
  <div class="admin-user-mood-container">
    <div class="search-bar">
      <input class="mr" type="text" v-model="searchUsername" placeholder="Search by username" />
      <select class="mr" v-model="searchMood">
        <option value="">All Moods</option>
        <option v-for="(mood, key) in MoodTypes" :key="key" :value="key">
          {{ mood }}
        </option>
      </select>
      <button @click="handleSearch">Search</button>
    </div>

    <table>
      <thead>
        <tr>
          <th>User</th>
          <th>Time</th>
          <th>Mood</th>
          <th>Comment</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="mood in adminStore.allUserMoods" :key="mood.uuid" class="mood-history">
          <td>{{ mood.username }}</td>
          <td>{{ format(new Date(mood.created_at), 'yyyy-MM-dd HH:mm:ss') }}</td>
          <td>{{ MoodTypes[mood.mood as unknown as keyof typeof MoodTypes] }}</td>
          <td>{{ mood.comment }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style scoped>
.admin-user-mood-container {
  margin-top: 30px;
}

th {
  min-width: 100px;
  text-align: left;
  font-weight: 800;
  padding-right: 20px;
}

td {
  min-width: 100px;
  text-align: left;
  padding-right: 20px;
}

.search-bar {
  margin-bottom: 20px;
}

select {
  border: 1px solid lightgray;
  padding: 10px;
  border-radius: 10px;
}
</style>
