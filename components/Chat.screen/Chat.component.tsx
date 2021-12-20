import React, { useContext, useState, useEffect } from 'react'
import {
  View,
  Text,
  Pressable,
  Button,
  FlatList,
  TextInput,
  SafeAreaView,
} from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { db } from '../../db/firestoreConfig'
import { doc, onSnapshot } from 'firebase/firestore'
import { addChatMessage, deleteChatMessage } from '../../db/api'
import { UserContext } from '../../contexts/UserContext'
import { styles } from './Chat.style'

export const Chat = ({ route, navigation }) => {
  const { chatId, eventName } = route.params
  const { currentUser } = useContext(UserContext)
  const [selectedId, setSelectedId] = useState(null)
  const [messages, setMessages] = useState([])
  const [text, setText] = useState('')
  const [isMessagesEmpty, setIsMessagesEmpty] = useState(true)

  useEffect(() => {
    setMessages([])
    const unsub = onSnapshot(doc(db, 'chats', chatId), (doc) => {
      if (doc.data().messages.length > 0) {
        setIsMessagesEmpty(false)
        setMessages(doc.data().messages)
      } else {
        setIsMessagesEmpty(true)
      }
    })
  }, [chatId])
  const formatTimestamp = (timestamp) => {
    let date = new Date(timestamp * 1000)
    let datevalues = {
      fullYear: String(date.getFullYear()),
      month: String(date.getMonth() + 1),
      day: String(date.getDate()),
      hour: String(date.getHours()),
      minutes: String(date.getMinutes()),
      seconds: String(date.getSeconds()),
    }
    if (Number(datevalues.hour) < 10) {
      let hourString = '0' + datevalues.hour
      datevalues.hour = hourString
    }
    if (Number(datevalues.minutes) < 10) {
      let minutesString = '0' + datevalues.minutes
      datevalues.minutes = minutesString
    }
    return `${datevalues.hour}:${datevalues.minutes} ${datevalues.day}/${datevalues.month}/${datevalues.fullYear}`
  }
  const Item = ({ item }) => (
    <View style={styles.item}>
      <View style={styles.topRowContainer}>
        <Text style={styles.name}>{item.first_name}:</Text>

        <Pressable
          disabled={currentUser.id !== item.userId}
          style={
            currentUser.id === item.userId ? styles.deleteButton : styles.hidden
          }
          onPress={() => {
            deleteChatMessage(
              {
                userId: currentUser.id,
                first_name: item.first_name,
                message_body: item.message_body,
                timestamp: item.timestamp,
              },
              chatId
            )
          }}
        >
          <Text style={styles.delete}>
            {currentUser.id === item.userId ? 'X' : null}
          </Text>
        </Pressable>
      </View>
      <Text style={styles.message}>{item.message_body}</Text>
      <Text style={styles.time}>{formatTimestamp(item.timestamp.seconds)}</Text>
    </View>
  )
  const renderItem = ({ item }) => {
    const backgroundColor =
      item.id === selectedId ? '#6E3B6E' : 'rgba(10,80,160, 0.1)'
    return <Item item={item} backgroundColor={{ backgroundColor }} />
  }

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Button
          onPress={() => {
            navigation.navigate('Chatrooms')
          }}
          title="Go back"
        />
      ),
    })
  }, [navigation])

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>{eventName}</Text>
      <KeyboardAwareScrollView contentContainerStyle={styles.spacing}>
        {isMessagesEmpty ? (
          <Text style={styles.noMessages}>No messages</Text>
        ) : null}
        <FlatList
          data={messages}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          extraData={selectedId}
        />
        <View style={styles.sendMessagecontainer}>
          <TextInput
            style={styles.inputMessage}
            placeholder="Message..."
            placeholderTextColor={'black'}
            onChangeText={setText}
            value={text}
          ></TextInput>
          <Pressable
            onPress={() => {
              if (text !== '') {
                addChatMessage(
                  {
                    userId: currentUser.id,
                    first_name: currentUser.first_name,
                    message_body: text,
                    timestamp: new Date(),
                  },
                  chatId
                ).then(() => {
                  setText('')
                })
              }
            }}
          >
            <Text style={styles.sendText}>SEND</Text>
          </Pressable>
        </View>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  )
}
