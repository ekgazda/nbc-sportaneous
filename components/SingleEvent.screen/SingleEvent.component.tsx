import React, { useContext, useState, useEffect } from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import { UserContext } from '../../contexts/UserContext'
import {
  getUserById,
  selectEventById,
  joinEvent,
  removeSelfFromEvent,
} from '../../db/api'
import { deleteEventAndCascade } from './SingleEvent.utils'
import { Event, EventNavProps, HostDetails, UserDetails } from '../../types/events'
import { styles } from './SingleEvent.style'

export const SingleEvent = ({ navigation, route }: EventNavProps) => {
  let { eventId } = route!.params
  const { currentUser } = useContext(UserContext)
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [eventDetails, setEventDetails] = useState<Event>()
  const [hostDetails, setHostDetails] = useState<HostDetails>()

  useEffect(async () => {
    setIsLoading(true)
    const event = await selectEventById(eventId)
    setEventDetails(event)
    getUserById(event.host_id).then((user) => {
      if (user !== undefined) {
        setHostDetails({
          first_name: user.first_name,
          last_name: user.last_name,
          description: user.description,
          image_bitmap: user.image_bitmap,
        })
      }
      setIsLoading(false)
    })
  }, [eventId])

  const userDetailsForEvent: UserDetails = {
    first_name: currentUser.first_name,
    last_name: currentUser.last_name,
    userId: currentUser.id,
  }

  const checkAcceptedOrRequested = eventDetails?.attendees.includes(currentUser.id) && 
    eventDetails?.pending_attendees.map(userId => userId === currentUser.id) ? true : false

  const checkCapacity =
    eventDetails?.attendees.length >= parseInt(eventDetails?.max_capacity) &&
    !checkAcceptedOrRequested

  const joinButtonText = () => {
    if (checkCapacity) return 'Event full'
    if (checkAcceptedOrRequested) return 'Leave event?'
    return 'Request to join'
  }

  const eventInfo = (
    <View style={styles.container}>
      <View style={styles.eventView}>
        <Text style={styles.title}>{eventDetails?.title}</Text>
        <Text style={styles.capitalizedText}>
          Location: {eventDetails?.location}
        </Text>
        <Text style={styles.capitalizedText}>
          Category: {eventDetails?.category}
        </Text>
        <Text style={styles.text}>
          Description: {eventDetails?.description}
        </Text>
        <Text style={styles.text}>Time: {eventDetails?.time}</Text>
        <Text style={styles.text}>Date: {eventDetails?.date}</Text>
        <Text style={styles.text}>
          Places filled: {eventDetails?.attendees.length}/
          {eventDetails?.max_capacity}
        </Text>
      </View>
      <TouchableOpacity
        disabled={checkCapacity}
        style={styles.touchOpacity}
        onPress={() => {
          if (!checkAcceptedOrRequested) {
            joinEvent(userDetailsForEvent, eventId)
          } else {
            removeSelfFromEvent(userDetailsForEvent, eventId)
          }
        }}
      >
        <Text style={styles.touchOpacityText}>{joinButtonText()}</Text>
      </TouchableOpacity>
      <View style={styles.hostView}>
        <Text style={styles.text}>About the host:</Text>
        <Text style={styles.capitalizedText}>
          {hostDetails?.first_name} {hostDetails?.last_name}
        </Text>
        <Text style={styles.text}>{hostDetails?.description}</Text>
      </View>
    </View>
  )

  if (isLoading) {
    return <View style={styles.view}></View>
  }
  if (eventDetails?.host_id === currentUser.id) {
    return (
      <View style={styles.container}>
        {eventInfo}
        <TouchableOpacity
          style={styles.touchOpacity}
          onPress={() => {
            deleteEventAndCascade(
              eventId,
              { navigation },
              currentUser.id,
              eventDetails
            )
          }}
        >
          <Text style={styles.touchOpacityText}>Delete event?</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.touchOpacity}
          onPress={() => {
            navigation!.navigate('AcceptReject', { eventId: eventId })
          }}
        >
          <Text style={styles.touchOpacityText}>Review attendees</Text>
        </TouchableOpacity>
      </View>
    )
  }
  return (
  <View style={styles.container}>
    {eventInfo}
  </View>
  )
}
