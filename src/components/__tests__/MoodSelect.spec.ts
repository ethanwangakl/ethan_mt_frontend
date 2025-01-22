import { mount } from '@vue/test-utils'
import { describe, it, expect } from 'vitest'
import MoodSelect from '@/components/MoodSelect.vue'
import { MoodTypes } from '@/entities/mood'

describe('MoodSelect', () => {
  it('renders all mood options correctly', () => {
    const wrapper = mount(MoodSelect)

    const options = wrapper.findAll('.mood-option')
    const moodValues = Object.values(MoodTypes)

    expect(options.length).toBe(moodValues.length)
    moodValues.forEach((value, index) => {
      expect(options[index].text()).toContain(value)
    })
  })

  it('updates selectedMood and emit when a radio button is selected', async () => {
    const wrapper = mount(MoodSelect)
    const radioButtons = wrapper.findAll('input[type="radio"]')

    await radioButtons[1].setValue()
    const radioElement = radioButtons[1].element as HTMLInputElement

    expect(radioElement.checked).toBe(true)
    expect(wrapper.emitted('moodSelected')).toBeTruthy()
    expect(wrapper.emitted('moodSelected')![0]).toEqual(['a_bit_meh'])
  })
})
