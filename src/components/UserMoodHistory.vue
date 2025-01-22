<script setup lang="ts">
import { MoodTypes } from '@/entities/mood'
import { useMoodStore } from '@/stores/mood'
import { format } from 'date-fns'

const moodStore = useMoodStore()
</script>

<template>
  <div class="use_mood_history_container">
    <h2>Your Mood History</h2>
    <div v-for="mood in moodStore.currentUserMoods" :key="mood.uuid" class="mood-history">
      <div>{{ format(new Date(mood.created_at), 'yyyy-MM-dd HH:mm:ss') }}</div>

      <div class="mood-history-content">
        <span class="history_mood_name">{{
          MoodTypes[mood.mood as unknown as keyof typeof MoodTypes]
        }}</span>
        <p>{{ mood.comment }}</p>
      </div>
    </div>
  </div>
</template>

<style lang="css" scoped>
.use_mood_history_container {
  margin-top: 30px;
}

.mood-history {
  margin-top: 20px;
  display: flex;
  flex-direction: row;
}

.mood-history-content {
  margin-left: 20px;
}

.history_mood_name {
  font-weight: 800;
}
</style>
