import React, { useState, useContext } from 'react'
import DateTimePicker from '@react-native-community/datetimepicker'
import {
  TextInput,
  SafeAreaView,
  View,
  Text,
  ScrollView,
  Keyboard,
  TouchableWithoutFeedback,
  TouchableOpacity,
  KeyboardAvoidingView,
} from 'react-native'
import {
  addNewEvent,
  addNewChatroom,
  addNewEventToCurrentUserProfile,
} from '../../db/api'
import { UserContext } from '../../contexts/UserContext'
import { styles } from './AddEvent.style'

type AddEventProps = {
  navigation: {
    navigate: (component: string, {}) => {}
  }
}

export const AddEvent = ({ navigation }: AddEventProps) => {
  const { currentUser } = useContext(UserContext)
  const [title, setTitle] = useState('')
  const [category, setCategory] = useState('')
  const [description, setDescription] = useState('')
  const [location, setLocation] = useState('')
  const [maxCapacity, setMaxCapacity] = useState('')
  const [date, setDate] = useState<Date>()
  const [time, setTime] = useState<Date>()
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false)
  const [isTimePickerVisible, setTimePickerVisibility] = useState(false)

  const changeSelectedDate = (event: any, selectedDate: Date | undefined) => {
    const currentDate = selectedDate || date
    setDatePickerVisibility(false)
    setDate(currentDate)
  }
  const changeSelectedTime = (event: any, selectedTime: Date | undefined) => {
    const currentTime = selectedTime || time
    setTimePickerVisibility(false)
    setTime(currentTime)
  }

  const resetEventData = () => {
    setTitle('')
    setCategory('')
    setDescription('')
    setLocation('')
    setMaxCapacity('')
    setDate(undefined)
    setTime(undefined)
  }

  const handlePress = async () => {
    const eventId = await addNewEvent({
      title: title,
      category: category,
      description: description,
      location: location,
      max_capacity: maxCapacity,
      date: date?.toDateString(),
      time: time?.toTimeString().slice(0, 5),
      host_id: currentUser.id,
      attendees: [],
      pending_attendees: [],
    })
    addNewChatroom(
      { host_id: currentUser.id, attendees_id: [], messages: [] },
      eventId
    )
    addNewEventToCurrentUserProfile(currentUser.id, eventId)
    resetEventData()
    navigation.navigate('Event', { eventId })
  }

  const isDisabled = !(
    title &&
    description &&
    location &&
    maxCapacity &&
    date &&
    time
  )

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <KeyboardAvoidingView>
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={styles.inputContainer}>
              <Text style={styles.title}>please fill the details</Text>
              <TextInput
                style={styles.inputField}
                onChangeText={setTitle}
                value={title}
                placeholder="title"
              />
              <TextInput
                style={styles.inputField}
                onChangeText={setCategory}
                value={category}
                placeholder="category"
              />
              <TextInput
                style={styles.inputField}
                onChangeText={setDescription}
                value={description}
                placeholder="description"
              />
              <TextInput
                style={styles.inputField}
                onChangeText={setLocation}
                value={location}
                placeholder="city"
              />
              <TextInput
                style={styles.inputField}
                onChangeText={setMaxCapacity}
                value={maxCapacity}
                placeholder="how many people can join?"
              />
            </View>
          </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
        <View style={styles.datetime}>
          <TouchableOpacity
            onPress={() => {
              setDatePickerVisibility(true)
            }}
          >
            <Text style={styles.inputField}>
              SELECT DATE: {date?.toDateString()}
            </Text>
          </TouchableOpacity>
        </View>
        {isDatePickerVisible && (
          <DateTimePicker
            value={date || new Date()}
            mode={'date'}
            display="default"
            onChange={changeSelectedDate}
          />
        )}
        <View style={styles.datetime}>
          <TouchableOpacity
            onPress={() => {
              setTimePickerVisibility(true)
            }}
          >
            <Text style={styles.inputField}>
              SELECT TIME: {time?.toTimeString().slice(0, 5)}
            </Text>
          </TouchableOpacity>
        </View>
        {isTimePickerVisible && (
          <DateTimePicker
            value={time || new Date()}
            mode={'time'}
            is24Hour={true}
            display="default"
            onChange={changeSelectedTime}
          />
        )}
        <View style={styles.post}>
          <TouchableOpacity
            style={styles.postButton}
            onPress={handlePress}
            disabled={isDisabled}
          >
            <Text style={styles.postText}>POST</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}
