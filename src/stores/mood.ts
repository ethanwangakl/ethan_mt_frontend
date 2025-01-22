import { ref } from 'vue'
import { defineStore } from 'pinia'
import type { BaseResult, UserMood } from '@/entities/mood'

export const useMoodStore = defineStore('mood', () => {
  const username = ref('')
  const currentUserMoods = ref<UserMood[]>([])

  const queryUserMoods = async () => {
    if (!username.value) {
      console.error('Username is required to fetch user moods')
      return
    }

    try {
      const response = await fetch(
        `http://localhost:3000/user_moods?username=${encodeURIComponent(username.value)}`,
      )

      if (!response.ok) {
        const errorData: BaseResult = await response.json()
        throw new Error(errorData.message)
      }

      const data: UserMood[] = await response.json()
      currentUserMoods.value = data
    } catch (error) {
      console.error('Error fetching user moods:', error)
    }
  }

  const addUserMood = async (moodKey: string, comment: string) => {
    if (!username.value) {
      return 'Username is required to add a mood'
    }

    try {
      const response = await fetch('http://localhost:3000/user_moods', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: username.value,
          mood_key: moodKey,
          comment,
        }),
      })

      if (!response.ok) {
        const errorData: BaseResult = await response.json()
        return errorData.message
      }

      const newMood: UserMood = await response.json()
      currentUserMoods.value.unshift(newMood)
      return null
    } catch (error) {
      console.error('Error adding user mood:', error)
      return (error as Error).message
    }
  }

  return {
    username,
    currentUserMoods,
    queryUserMoods,
    addUserMood,
  }
})
