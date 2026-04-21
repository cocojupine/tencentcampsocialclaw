export type Conversation = {
  id: string
  name: string
  preview: string
  time: string
  unreadCount: number
  avatar: string
  active?: boolean
  muted?: boolean
}

export type Message = {
  id: string
  sender: string
  avatar: string
  content: string
  time: string
  isSelf: boolean
}
