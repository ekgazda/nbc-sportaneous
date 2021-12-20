import { Alert } from 'react-native'
import { getUserById, removeSelfFromEvent } from '../../db/api'
import { deleteEventAndCascade } from '../SingleEvent.screen/SingleEvent.utils'

export const confirmDelete = (eventId: string, { navigation }, user_id: string, eventDetails) =>
  Alert.alert('Warning!', 'Are you sure you want to delete this event?', [
    {
      text: 'Cancel',
      style: 'cancel',
    },
    {
      text: 'OK',
      onPress: () => {
        deleteEventAndCascade(eventId, { navigation }, user_id, eventDetails)
      },
    },
  ])

export const getOwnName = async (user_id: string) => {
  const myName = await getUserById(user_id)
  return `${myName.first_name} ${myName.last_name}`
}

export const confirmLeave = (userInfo, eventID: string) =>
  Alert.alert('Warning!', 'Are you sure you want to leave this event?', [
    {
      text: 'Cancel',
      style: 'cancel',
    },
    {
      text: 'OK',
      onPress: () => {
        removeSelfFromEvent(userInfo, eventID)
      },
    },
  ])
