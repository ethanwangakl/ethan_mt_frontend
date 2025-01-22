import { mount } from '@vue/test-utils'
import { describe, it, expect, beforeEach } from 'vitest'
import { createPinia, setActivePinia } from 'pinia'
import { useMoodStore } from '@/stores/mood'
import { MoodTypes } from '@/entities/mood'
import UserMoodHistory from '@/components/UserMoodHistory.vue'

describe('MoodHistory', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  it('renders the mood history correctly', () => {
    const moodStore = useMoodStore()

    // Mock data
    moodStore.currentUserMoods = [
      {
        uuid: '1111111',
        username: 'ethan',
        created_at: new Date('2025-01-01T10:00:00Z'),
        updated_at: new Date('2025-01-01T10:00:00Z'),
        mood: 'not_good_at_all' as MoodTypes,
        comment: 'GOGOGO',
      },
      {
        uuid: '222222',
        username: 'ethan',
        created_at: new Date('2025-01-02T10:00:00Z'),
        updated_at: new Date('2025-01-02T10:00:00Z'),
        mood: 'feeling_great' as MoodTypes,
        comment: 'Feeling great!',
      },
    ]

    const wrapper = mount(UserMoodHistory)

    const moodItems = wrapper.findAll('.mood-history')
    expect(moodItems.length).toBe(2)

    const firstMood = moodItems[0]
    console.info('First Mood:' + firstMood.text())
    expect(firstMood.text()).toContain('2025-01-01')
    expect(firstMood.text()).toContain(MoodTypes.not_good_at_all)
    expect(firstMood.text()).toContain('GOGOGO')

    const secondMood = moodItems[1]
    console.info('Second Mood:' + secondMood.text())
    expect(secondMood.text()).toContain('2025-01-02')
    expect(secondMood.text()).toContain(MoodTypes.feeling_great)
    expect(secondMood.text()).toContain('Feeling great!')
  })
})
