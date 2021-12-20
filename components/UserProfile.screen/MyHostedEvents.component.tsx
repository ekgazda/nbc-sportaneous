import React, { useContext, useState, useEffect } from 'react'
import {
  Text,
  Pressable,
  View,
  TouchableOpacity,
  ScrollView,
} from 'react-native'
import { doc, onSnapshot } from 'firebase/firestore'
import Collapsible from 'react-native-collapsible'
import { UserContext } from '../../contexts/UserContext'
import { db } from '../../db/firestoreConfig'
import { selectEventById } from '../../db/api'
import { truncate } from '../Events.screen/utils/EventListUtils'
import { confirmDelete } from './ProfileUtils'
import { styles } from './ProfileEvents.style'

export const MyHostedEvents = ({ navigation }) => {
  const { currentUser } = useContext(UserContext)
  const [isLoading, setIsLoading] = useState(true)
  const [hostedIsCollapsed, setHostedIsCollapsed] = useState(false)
  const [myHostedEventIds, setMyHostedEventIds] = useState([])
  const [myHostedEvents, setMyHostedEvents] = useState([
    {
      title: '',
      host_id: '',
      location: '',
      date: '',
      category: '',
      time: '',
      description: '',
    },
  ])

  useEffect(() => {
    const eventPromises = myHostedEventIds.map((eventId) => {
      return selectEventById(eventId)
    })
    Promise.all(eventPromises).then((res) => {
      res.forEach((event, index) => {
        event.id = myHostedEventIds[index]
      })
      setMyHostedEvents(res)
    })
    setIsLoading(false)
  }, [myHostedEventIds])

  useEffect(() => {
    setIsLoading(true)
    const unsub = onSnapshot(doc(db, 'users', currentUser.id), (doc) => {
      if (doc.data().hosted_events.length > 0) {
        setMyHostedEventIds(doc.data().hosted_events)
      } else {
        setMyHostedEventIds([])
      }
    })
  }, [currentUser.id])

  if (isLoading) {
    return <Text>Loading hosted events ...</Text>
  }
  if (myHostedEvents.length < 1) {
    return (
      <View>
        <Pressable
          onPress={() => {
            setHostedIsCollapsed(hostedIsCollapsed === true ? false : true)
          }}
        >
          <Text style={styles.eventHeader}>My Hosted Events</Text>
        </Pressable>
        <ScrollView>
          <Collapsible collapsed={hostedIsCollapsed}>
            <Text style={styles.joinSubHeader}>
              You have not hosted any events.
            </Text>
          </Collapsible>
        </ScrollView>
      </View>
    )
  }
  return (
    <View>
      <Pressable
        onPress={() => {
          setHostedIsCollapsed(hostedIsCollapsed === true ? false : true)
        }}
      >
        <Text style={styles.eventHeader}>My Hosted Events</Text>
      </Pressable>
      <ScrollView>
        <Collapsible collapsed={hostedIsCollapsed}>
          {myHostedEvents.map((myEvent) => {
            return (
              <View style={styles.container} key={myEvent.id}>
                <TouchableOpacity
                  style={styles.item}
                  onPress={() => {
                    navigation.navigate('Event', { eventId: myEvent.id })
                  }}
                >
                  <Text style={styles.title}>{myEvent.title}</Text>
                  <Text
                    style={styles.user}
                  >{`${currentUser.first_name} ${currentUser.last_name}`}</Text>
                  <Text style={styles.location}>{myEvent.location}</Text>
                  <Text style={styles.date}>{myEvent.date}</Text>
                  <Text style={styles.category}>{myEvent.category}</Text>
                  <Text style={styles.time}>{myEvent.time}</Text>
                  <Text style={styles.description}>
                    {truncate(myEvent.description)}
                  </Text>
                </TouchableOpacity>
                <Pressable
                  style={({ pressed }) => [
                    {
                      backgroundColor: pressed
                        ? 'rgba(50, 59, 118, 0.5)'
                        : 'rgba(50, 59, 118, 1)',
                    },
                    styles.requestsButton,
                  ]}
                  onPress={() => {
                    navigation.navigate('AcceptReject', {
                      eventId: myEvent.id,
                      eventTitle: myEvent.title,
                    })
                  }}
                >
                  <Text style={styles.buttonTitle}>Pending Requests</Text>
                </Pressable>
                <Pressable
                  style={({ pressed }) => [
                    {
                      backgroundColor: pressed
                        ? 'rgba(108, 93, 171, 0.5)'
                        : 'rgba(108, 93, 171, 1)',
                    },
                    styles.deleteButton,
                  ]}
                  onPress={() => {
                    confirmDelete(myEvent.id, { navigation }, currentUser.id, myEvent)
                  }}
                >
                  <Text style={styles.buttonTitle}>Delete Event</Text>
                </Pressable>
              </View>
            )
          })}
        </Collapsible>
      </ScrollView>
    </View>
  )
}
