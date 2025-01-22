<script setup lang="ts">
import { MoodTypes } from '@/entities/mood'
import { ref } from 'vue'

const selectedMood = ref<string>('')

const emit = defineEmits<{
  (event: 'moodSelected', mood: string): void
}>()

const selectMood = (mood: string) => {
  selectedMood.value = mood
  emit('moodSelected', mood)
}
</script>

<template>
  <div class="mood-select-container">
    <h2>How are you today? 😊</h2>
    <label v-for="(value, key) in MoodTypes" :key="key" class="mood-option">
      <input type="radio" name="mood" :value="key" @change="selectMood(key)" />
      <span>{{ value }}</span>
    </label>
  </div>
</template>

<style scoped>
.mood-select-container {
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-top: 20px;
}

.mood-option {
  display: flex;
  align-items: center;
  gap: 8px;
}
</style>
