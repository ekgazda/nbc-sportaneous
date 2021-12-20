export type Event = {
  title: string
  category: string
  description: string
  location: string
  max_capacity: string
  date: string
  time: string
  host_id: string
  attendees: []
  pending_attendees: []
}

export type EventWithId = {
  id: string
  title: string
  category: string
  description: string
  location: string
  max_capacity: string
  date: string
  time: string
  host_id: string
  attendees: []
  pending_attendees: []
}

export type EventNavProps = {
  navigation: {
    navigate: (component: string, {}) => {}
  }
}

export type categoryIsChecked = {
  [category: string]: boolean
}
