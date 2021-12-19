import React, { useContext, useState, useEffect } from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import { doc, onSnapshot } from 'firebase/firestore'
import { db } from '../../db/firestoreConfig'
import { UserContext } from '../../contexts/UserContext'
import { getUserById, joinEvent, removeSelfFromEvent } from '../../db/api'
import {
  checkAcceptedOrRequested,
  deleteEventAndCascade,
  addEventProps,
  hostDetails,
  eventDetails,
  checkCapacity,
  joinButtonText,
} from './SingleEvent.utils'
import { EventInfo } from './subcomponents/EventInfo/EventInfo.component'
import { HostInfo } from './subcomponents/HostInfo/HostInfo.component'
import { styles } from './SingleEvent.style'

export const SingleEvent = ({ navigation, route }: addEventProps) => {
  let { eventId } = route!.params
  const { currentUser } = useContext(UserContext)

  const defaultDetails = {
    attendees: [],
    category: '',
    date: '',
    description: '',
    host_id: '',
    location: '',
    max_capacity: '',
    pending_attendees: [],
    title: '',
    time: '',
  }
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [eventDetails, setEventDetails] = useState<eventDetails>(defaultDetails)
  const [hostDetails, setHostDetails] = useState<hostDetails>({
    first_name: '',
    last_name: '',
    description: '',
    image_bitmap: '',
    id: '',
  })

  let acceptedOrRequested: boolean = checkAcceptedOrRequested(
    eventDetails,
    currentUser
  )

  useEffect(() => {
    setIsLoading(true)
    const unsub = onSnapshot(doc(db, 'events', eventId), (doc: any) => {
      if (doc.exists()) {
        setEventDetails(doc.data())
      } else {
        setEventDetails(defaultDetails)
      }
    })
  }, [eventId])

  useEffect(() => {
    getUserById(eventDetails.host_id).then((user) => {
      if (user !== undefined) {
        setHostDetails({
          first_name: user.first_name,
          last_name: user.last_name,
          description: user.description,
          image_bitmap: user.image_bitmap,
          id: eventDetails.host_id,
        })
      }

      setIsLoading(false)
    })
  }, [eventDetails])

  const userDetailsForEvent = {
    first_name: currentUser.first_name,
    last_name: currentUser.last_name,
    userId: currentUser.id,
  }
  if (isLoading) {
    return <View style={styles.view}></View>
  } else if (eventDetails.host_id === currentUser.id) {
    return (
      <View style={styles.container}>
        <EventInfo eventDetails={eventDetails} />
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
  } else
    return (
      <View style={styles.container}>
        <EventInfo eventDetails={eventDetails} />
        <TouchableOpacity
          disabled={checkCapacity(acceptedOrRequested, eventDetails)}
          style={styles.touchOpacity}
          onPress={() => {
            if (!acceptedOrRequested) {
              joinEvent(userDetailsForEvent, eventId)
            } else {
              removeSelfFromEvent(userDetailsForEvent, eventId)
            }
          }}
        >
          <Text style={styles.touchOpacityText}>
            {joinButtonText(acceptedOrRequested, eventDetails)}
          </Text>
        </TouchableOpacity>

        <HostInfo hostDetails={hostDetails} />
        <TouchableOpacity
          onPress={() => {
            navigation!.navigate('Events')
          }}
          style={styles.touchOpacity}
        >
          <Text style={styles.touchOpacityText}>Back to events</Text>
        </TouchableOpacity>
      </View>
    )
}
