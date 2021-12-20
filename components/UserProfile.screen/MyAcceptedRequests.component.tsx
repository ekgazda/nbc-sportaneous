import React, { useEffect, useState, useContext } from 'react'
import { Text, Pressable, View, TouchableOpacity } from 'react-native'
import { doc, onSnapshot } from 'firebase/firestore'
import { db } from '../../db/firestoreConfig'
import { UserContext } from '../../contexts/UserContext'
import { getUsers, selectEventById } from '../../db/api'
import { makeNameIdReference, truncate } from '../Events.screen/utils/EventListUtils'
import { confirmLeave } from './ProfileUtils'
import { styles } from './ProfileEvents.style'

export const MyAcceptedRequests = ({ navigation }) => {
  const { currentUser } = useContext(UserContext)
  const [isLoading, setIsLoading] = useState(true)
  const [userNames, setUserNames] = useState({})
  const [acceptedRequestIds, setAcceptedRequestIds] = useState([])
  const [acceptedRequests, setAcceptedRequests] = useState([
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
    const eventPromises: any = acceptedRequestIds.map((eventId) => {
      return selectEventById(eventId)
    })
    Promise.all(eventPromises).then((res: any) => {
      res.forEach((event, index) => {
        event.id = acceptedRequestIds[index]
      })

      setAcceptedRequests(res)
    })
    setIsLoading(false)
    ;(async () => {
      const nameUidReferenceObject = await getUsers()
      setUserNames(makeNameIdReference(nameUidReferenceObject))
    })()
  }, [acceptedRequestIds])

  useEffect(() => {
    setIsLoading(true)
    const unsub = onSnapshot(doc(db, 'users', currentUser.id), (doc: any) => {
      if (doc.data().accepted_events.length > 0) {
        setAcceptedRequestIds(doc.data().accepted_events)
      } else {
        setAcceptedRequestIds([])
      }
    })
  }, [currentUser.id])

  if (isLoading) {
    return <Text>Loading joined events ...</Text>
  }
  if (acceptedRequests.length < 1) {
    return (
      <Text style={styles.joinSubHeader}>
        You have no accepted event requests.
      </Text>
    )
  }
  return (
    <View>
      <Text style={styles.joinSubHeader}>Accepted Join Requests</Text>
      {acceptedRequests.map((myEvent) => {
        return (
          <View style={styles.container}>
            <TouchableOpacity
              style={styles.item}
              onPress={() => {
                navigation.navigate('Event', { eventId: myEvent.id })
              }}
            >
              <Text style={styles.title}>{myEvent.title}</Text>
              <Text style={styles.user}>{userNames[myEvent.host_id]}</Text>
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
                    ? 'rgba(108, 93, 171, 0.5)'
                    : 'rgba(108, 93, 171, 1)',
                },
                styles.requestsButton,
              ]}
              onPress={() => {
                const userInfo = {
                  first_name: currentUser.first_name,
                  last_name: currentUser.last_name,
                  userId: currentUser.id,
                }
                confirmLeave(userInfo, myEvent.id)
              }}
            >
              <Text style={styles.buttonTitle}>Leave Event</Text>
            </Pressable>
          </View>
        )
      })}
    </View>
  )
}
