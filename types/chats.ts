export type Chatroom = {
  host_id: string
  attendees_id: []
  messages: []
}

export type ChatMessage = {
  userId: string
  first_name: string
  message_body: string
  timestamp: Date
}
