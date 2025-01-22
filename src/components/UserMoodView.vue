<script setup lang="ts">
import { ref } from 'vue'
import MoodSelect from '@/components/MoodSelect.vue'
import UserMoodHistory from '@/components/UserMoodHistory.vue'
import { useMoodStore } from '@/stores/mood'

const moodStore = useMoodStore()
const username = ref<string>('')
const comment = ref<string>('')
const selectedMood = ref<string | null>(null)

const saveName = () => {
  if (username.value) {
    moodStore.username = username.value
    moodStore.queryUserMoods()
  } else {
    alert('Please enter your name. We would like to know who you are.')
  }
}

const handleMoodSelection = (mood: string) => {
  console.info(mood)
  selectedMood.value = mood
}

const addTodayMood = async () => {
  if (!selectedMood.value) {
    return
  }

  const error = await moodStore.addUserMood(selectedMood.value, comment.value)
  if (error) {
    alert(`Failed to add mood: ${error}`)
    return
  }

  selectedMood.value = null
  comment.value = ''
}
</script>

<template>
  <div class="create-mood-container">
    <div v-if="moodStore.username">
      <div class="hello-title">
        <span>Hello, </span>
        <span class="hello-title-username">{{ moodStore.username }}</span>
      </div>

      <MoodSelect @moodSelected="handleMoodSelection"></MoodSelect>
      <div class="comment-textarea">
        <textarea
          id="mood-comment-text"
          v-model="comment"
          rows="5"
          placeholder="Something to say today..."
        ></textarea>
      </div>
      <button id="add-mood-btn" class="mt" :disabled="!selectedMood" @click="addTodayMood">
        Confirm
      </button>

      <UserMoodHistory></UserMoodHistory>
    </div>
    <form v-else @submit.prevent="saveName" class="username-form">
      <h2>Let's know who you are:</h2>
      <input
        class="mb"
        type="text"
        id="name-input"
        v-model="username"
        placeholder="Enter your name"
      />
      <button id="username-submit-btn" type="submit">Continue</button>
    </form>
  </div>
</template>

<style scoped>
.create-mood-container {
  margin-top: 2em;
}

.username-form {
  display: flex;
  flex-direction: column;
  max-width: 300px;
  margin-top: 20px;
}

.hello-title-container {
  display: flex;
  justify-content: space-between;
}

.hello-title {
  font-size: 20px;
}

.hello-title-username {
  font-weight: 800;
  margin-right: 20px;
}

.comment-textarea {
  max-width: 400px;
  margin-top: 20px;
}

.comment-textarea textarea {
  width: 100%;
}
</style>
