export type Event = {
  title: string
  category: string
  description: string
  location: string
  max_capacity: string
  date: string | undefined
  time: string | undefined
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
  route?: {
    params: { eventId: string }
  }
  currentUser?: string
  eventDetails?: Event
}

export type HostDetails = {
  first_name: string
  last_name: string
  description: string
  image_bitmap: string
}

export type UserDetails = {
  first_name: string
  last_name: string
  userId: string
}

export type categoryIsChecked = {
  [category: string]: boolean
}
