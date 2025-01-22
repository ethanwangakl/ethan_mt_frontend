import { mount } from '@vue/test-utils'
import { describe, it, expect, beforeEach, vi } from 'vitest'
import { createPinia, setActivePinia } from 'pinia'
import { useMoodStore } from '@/stores/mood'
import { MoodTypes } from '@/entities/mood'
import UserMoodView from '@/components/UserMoodView.vue'

describe('UserMoodView', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  it('should call saveName when submitting the username form', async () => {
    const mockMoodStore = useMoodStore()
    mockMoodStore.username = ''

    const queryUserMoodsMock = vi.fn()
    mockMoodStore.queryUserMoods = queryUserMoodsMock

    const wrapper = mount(UserMoodView)
    const input = wrapper.find('#name-input')
    await input.setValue('ethan')

    const form = wrapper.find('form.username-form')
    await form.trigger('submit')

    expect(mockMoodStore.username).toBe('ethan')
    expect(queryUserMoodsMock).toHaveBeenCalled()
  })

  it('should call addTodayMood when the select a mood and confirm', async () => {
    const mockMoodStore = useMoodStore()
    mockMoodStore.username = 'ethan'
    mockMoodStore.addUserMood = vi.fn()

    const wrapper = mount(UserMoodView)
    const moodSelect = wrapper.findComponent({ name: 'MoodSelect' })
    await moodSelect.vm.$emit('moodSelected', MoodTypes.feeling_great)

    const textarea = wrapper.find('#mood-comment-text')
    await textarea.setValue('Feeling awesome!')

    const button = wrapper.find('#add-mood-btn')
    await button.trigger('click')

    expect(mockMoodStore.addUserMood).toHaveBeenCalledWith(
      MoodTypes.feeling_great,
      'Feeling awesome!',
    )
  })
})
