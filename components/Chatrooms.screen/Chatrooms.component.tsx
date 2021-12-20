import React, { useEffect, useState, useContext } from 'react'
import { UserContext } from '../../contexts/UserContext'
import {
  FlatList,
  SafeAreaView,
  Text,
  TouchableOpacity,
  Image,
} from 'react-native'
import { selectAllEvents, getUsers } from '../../db/api'
import { makeNameIdReference } from '../Events.screen/utils/EventListUtils'
import styles from './Chatrooms.style'

const Chatroom = ({ navigation }) => {
  const { currentUser } = useContext(UserContext)
  const [selectedId, setSelectedId] = useState(null)
  const [events, setEvents] = useState()
  const [userNames, setUserNames] = useState({})

  useEffect(() => {
    selectAllEvents().then((res) => {
      const filteredEvents = res.filter((event: any) => {
        let attendeeList = event.attendees
        let returnValue = false
        if (attendeeList.length > 0) {
          if (event.host_id === currentUser.id) {
            returnValue = true
          }
          attendeeList.forEach((personDetails) => {
            if (personDetails.userId === currentUser.id) {
              returnValue = true
            }
          })
          return returnValue
        }
      })
      setEvents(filteredEvents)
      getUsers().then((res) => {
        setUserNames(makeNameIdReference(res))
      })
    })
  }, [])

  const Item = ({ item, onPress }) => (
    <TouchableOpacity onPress={onPress} style={styles.item}>
      <Image style={styles.image} source={require('./images/chat.png')} />
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.date}>
        {item.date} @ {item.time}
      </Text>
      <Text style={styles.host}>Hosted by: {userNames[item.host_id]}</Text>
    </TouchableOpacity>
  )

  const renderItem = ({ item }) => {
    return (
      <Item
        item={item}
        onPress={() => {
          navigation.navigate('Chat', {
            chatId: item.id,
            eventName: item.title,
          })
        }}
      />
    )
  }

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>discuss event details</Text>
      <FlatList
        data={events}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        extraData={selectedId}
      />
    </SafeAreaView>
  )
}

export default Chatroom
