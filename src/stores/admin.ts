import { ref } from 'vue'
import { defineStore } from 'pinia'
import type {
  AdminLoginResult,
  BaseResult,
  MoodTypes,
  UserMood,
} from '@/entities/mood'

export const useAdminStore = defineStore('admin', () => {
  const username = ref<string>('admin')
  const password = ref<string>('admin')
  const adminLoginResult = ref<AdminLoginResult | null>(null)
  const allUserMoods = ref<UserMood[]>([])

  const login = async () => {
    try {
      const response = await fetch('http://localhost:3000/admin/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: username.value,
          password: password.value,
        }),
      })

      if (!response.ok) {
        const errorData: BaseResult = await response.json()
        return errorData.message
      }

      adminLoginResult.value = await response.json()
      return null
    } catch (error) {
      console.error('Error adding user mood:', error)
      return (error as Error).message
    }
  }

  const queryAllUserMoods = async (
    username: string | null,
    moodType: MoodTypes | string | null,
  ) => {
    if (!adminLoginResult.value?.token) {
      return 'Admin not login yet'
    }

    try {
      const params: URLSearchParams = new URLSearchParams()
      if (username) {
        params.append('username', username)
      }

      if (moodType) {
        params.append('mood_key', moodType)
      }

      const response = await fetch(`http://localhost:3000/admin/user_moods?${params.toString()}`, {
        headers: {
          Authorization: `Bearer ${adminLoginResult.value?.token}`,
        },
      })

      if (response.ok) {
        const data: UserMood[] = await response.json()
        allUserMoods.value = data
      } else if (response.status == 404) {
        allUserMoods.value = []
      } else {
        const errorData: BaseResult = await response.json()
        throw new Error(errorData.message)
      }
    } catch (error) {
      console.error('Error fetching user moods:', error)
    }
  }

  return {
    username,
    password,
    adminLoginResult,
    allUserMoods,
    login,
    queryAllUserMoods,
  }
})
