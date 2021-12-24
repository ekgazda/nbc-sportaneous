import {
  deleteChatroom,
  deleteEvent,
  deleteEventFromUsersHostedEvents,
  deleteEventFromUsersRequestedEvents,
} from '../../db/api'
import { Event, EventNavProps, HostDetails } from '../../types/events'






export function deleteEventAndCascade(
  eventId: string,
  { navigation }: {
    navigation: {
      navigate: (component: string) => {}
    }
  },
  userId: string,
  eventDetails: Event
) {
  try {
    const attendeesToUpdate = eventDetails.attendees.concat(
      eventDetails.pending_attendees
    )
    deleteEvent(eventId)
    deleteChatroom(eventId)
    deleteEventFromUsersHostedEvents(userId, eventId)
    deleteEventFromUsersRequestedEvents(attendeesToUpdate, eventId)
    navigation?.navigate('Events')
  } catch (error) {
    console.log(error)
    alert('Unable to delete event at this time, please try again later')
  }
}






