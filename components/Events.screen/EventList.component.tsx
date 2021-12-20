import React, { useEffect, useState } from 'react'
import { FlatList, SafeAreaView, Text, TouchableOpacity } from 'react-native'
import { Filter } from './Filter.component'
import { getUsers, selectAllEvents } from '../../db/api'
import { makeNameIdReference, truncate } from './utils/EventListUtils'
import { RefreshEvents } from './RefreshEvents.component'
import { Event, EventNavProps } from '../../types/events'
import styles from './EventList.style'

const EventList = ({ navigation }: EventNavProps) => {
  const [categoryIsChecked, setCategoryIsChecked] = useState({
    'outdoors': false,
    'water sports': false,
    'extreme': false,
    'team sports': false,
    'winter sports': false,
    'indoors': false,
  })
  const [isLoading, setIsLoading] = useState(true)
  const [selectedId, setSelectedId] = useState(null)
  const [userNames, setUserNames] = useState({})
  const [events, setEvents] = useState<Event>()

  useEffect(() => {
    selectAllEvents().then((res) => {
      setEvents(res)
      setIsLoading(false)
    })
    getUsers().then((res) => {
      setUserNames(makeNameIdReference(res))
    })
  }, [])

  const Item = ({ item, onPress, textColor }) => (
    <TouchableOpacity onPress={onPress} style={[styles.item]}>
      <Text style={styles.title}>{item.title}</Text>
      <Text style={[styles.user, textColor]}>{userNames[item.host_id]}</Text>
      <Text style={[styles.location, textColor]}>{item.location}</Text>
      <Text style={[styles.date, textColor]}>{item.date}</Text>
      <Text style={[styles.category, textColor]}>{item.category}</Text>
      <Text style={[styles.time, textColor]}>{item.time}</Text>
      <Text style={[styles.description, textColor]}>
        {truncate(item.description)}
      </Text>
    </TouchableOpacity>
  )

  const renderItem = ({ item }) => {
    const color = item.id === selectedId ? 'white' : 'black'
    return (
      <Item
        item={item}
        onPress={() => {
          setSelectedId(item.chat_id)
          navigation.navigate('Event', { eventId: item.id })
        }}
        textColor={{ color }}
      />
    )
  }

  if (isLoading) {
    return <Text>Loading events ...</Text>
  }
  return (
    <SafeAreaView style={styles.container}>
      <Filter
        setEvents={setEvents}
        categoryIsChecked={categoryIsChecked}
        setCategoryIsChecked={setCategoryIsChecked}
      />
      <RefreshEvents
        setEvents={setEvents}
        setCategoryIsChecked={setCategoryIsChecked}
      />
      <FlatList
        data={events}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        extraData={selectedId}
      />
    </SafeAreaView>
  )
}

export default EventList
