import React, { useState, useEffect } from 'react'
import {
  View,
  Text,
  Pressable,
  TouchableOpacity,
  FlatList,
  SafeAreaView,
} from 'react-native'
import { selectEventById, removeAttendee, addAttendee } from '../../db/api'
import { styles } from './AcceptReject.style'

export const AcceptReject = ({ route, navigation }) => {
  const { eventId, eventTitle } = route.params
  const [pendingUsers, setPendingUsers] = useState([])
  const [attendingUsers, setAttendingUsers] = useState([])
  const [reloadTrigger, setReloadTrigger] = useState(0)

  useEffect(() => {
    selectEventById(eventId).then((res) => {
      if (res.pending_attendees.length > 0) {
        let pendingUsersNoEmpties = res.pending_attendees.filter((user) => {
          return user !== ''
        })
        setPendingUsers(pendingUsersNoEmpties)
      } else {
        setPendingUsers([])
      }

      if (res.attendees.length > 0) {
        let usersNoEmpties = res.attendees.filter((user) => {
          return user !== ''
        })
        setAttendingUsers(usersNoEmpties)
      } else {
        setAttendingUsers([])
      }
    })
  }, [eventId, reloadTrigger])

  const AttendeesItem = ({ item }) => (
    <View style={styles.item}>
      <Text style={styles.name}>
        {item.first_name} {item.last_name}
      </Text>
      <Pressable
        style={styles.reject}
        onPress={() => {
          removeAttendee(eventId, {
            userId: item.userId,
            first_name: item.first_name,
            last_name: item.last_name,
          }).then((res) => {
            setReloadTrigger((prevState) => {
              return prevState + 1
            })
          })
        }}
      >
        <Text style={styles.buttonsText}>Remove Attendee</Text>
      </Pressable>
    </View>
  )

  const PendingAttendeesItem = ({ item }) => (
    <View style={styles.item}>
      <Text style={styles.name}>
        {item.first_name} {item.last_name}
      </Text>
      <Pressable
        style={styles.accept}
        onPress={() => {
          addAttendee(eventId, {
            userId: item.userId,
            first_name: item.first_name,
            last_name: item.last_name,
          }).then((res) => {
            setReloadTrigger((prevState) => {
              return prevState + 1
            })
          })
        }}
      >
        <Text style={styles.buttonsText}>Add attendee</Text>
      </Pressable>
    </View>
  )

  const renderAttendingItem = ({ item }) => {
    return <AttendeesItem item={item} />
  }

  const renderBoth = ({ item }) => {
    return <AttendeesItem item={item} /> && <PendingAttendeesItem item={item} />
  }

  if (pendingUsers.length === 0 && attendingUsers.length === 0) {
    return (
      <SafeAreaView>
        <TouchableOpacity
          onPress={() => {
            navigation!.navigate('Profile')
          }}
          style={styles.backButton}
        >
          <Text style={styles.backButtonText}>back to profile</Text>
        </TouchableOpacity>
        <Text style={styles.title}>{eventTitle}</Text>
        <Text>You don't have any join requests.</Text>
      </SafeAreaView>
    )
  } else if (pendingUsers.length === 0) {
    return (
      <SafeAreaView style={styles.title}>
        <TouchableOpacity
          onPress={() => {
            navigation!.navigate('Profile')
          }}
          style={styles.backButton}
        >
          <Text style={styles.backButtonText}>back to profile</Text>
        </TouchableOpacity>
        <Text style={styles.title}>{eventTitle}</Text>
        <FlatList
          data={attendingUsers}
          renderItem={renderAttendingItem}
          keyExtractor={(item) => item.id}
        />
      </SafeAreaView>
    )
  } else {
    return (
      <SafeAreaView>
        <TouchableOpacity
          onPress={() => {
            navigation!.navigate('Profile')
          }}
          style={styles.backButton}
        >
          <Text style={styles.backButtonText}>back to profile</Text>
        </TouchableOpacity>
        <Text style={styles.title}>{eventTitle}</Text>
        <FlatList
          data={pendingUsers}
          renderItem={renderBoth}
          keyExtractor={(item) => item.id}
        />
        <FlatList
          data={attendingUsers}
          renderItem={renderAttendingItem}
          keyExtractor={(item) => item.id}
        />
      </SafeAreaView>
    )
  }
}
