export enum MoodTypes {
  not_good_at_all = 'Not good at all',
  a_bit_meh = 'A bit “meh”',
  pretty_good = 'Pretty good',
  feeling_great = 'Feeling great',
}

export interface UserMood {
  uuid: string
  username: string
  mood: MoodTypes
  comment: string
  created_at: Date
  updated_at: Date
}

export interface BaseResult {
  success: boolean
  message: string
}

export interface AdminLoginResult {
  token: string
  username: string
}
