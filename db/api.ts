import {
  collection,
  getDocs,
  getDoc,
  query,
  where,
  doc,
  addDoc,
  deleteDoc,
  updateDoc,
  arrayUnion,
  arrayRemove,
  setDoc,
} from 'firebase/firestore'
import { db } from './firestoreConfig'
import { Event, EventWithId } from '../types/events'
import { User } from '../types/users'
import { Chatroom, ChatMessage } from '../types/chats'

export const selectAllEvents = () => {
  return getDocs(collection(db, 'events')).then((snapshot) => {
    let eventsArray: EventWithId[] = []
    snapshot.docs.map((doc) => {
      eventsArray.push({ ...doc.data(), id: doc.id } as EventWithId)
    })
    return eventsArray
  })
}

export const selectEventsByUser = (userId: string) => {
  const q = query(collection(db, 'events'), where('host_id', '==', userId))
  return getDocs(q).then((snapshot) => {
    let eventsArray: EventWithId[] = []
    snapshot.docs.map((doc) => {
      eventsArray.push({ ...doc.data(), id: doc.id } as EventWithId)
    })
    return eventsArray
  })
}

export const selectEventById = (eventId: string) => {
  const docRef = doc(db, 'events', eventId)
  return getDoc(docRef).then((snapshot) => {
    const event = snapshot.data()
    return event
  })
}

export const addNewEvent = (newEvent: Event) => {
  return addDoc(collection(db, 'events'), newEvent).then((res) => res.id)
}

export const addNewUser = (newUser: User, uid: string) => {
  return setDoc(doc(db, 'users', uid), newUser)
}

export const addNewChatroom = (newChatroom: Chatroom, eventId: string) => {
  return setDoc(doc(db, 'chats', eventId), newChatroom)
}

export const deleteUser = (userId: string) => {
  return deleteDoc(doc(db, 'users', userId))
}

export const deleteEvent = (eventId: string) => {
  return deleteDoc(doc(db, 'events', eventId))
}

export const deleteChatroom = (chatId: string) => {
  return deleteDoc(doc(db, 'chats', chatId))
}

export const getUsers = () => {
  return getDocs(collection(db, 'users')).then((snapshot) => {
    let users: User[] = []
    snapshot.docs.forEach((user) => {
      users.push({ ...user.data(), id: user.id } as User)
    })
    return users
  })
}

export const getUserById = (userId: string) => {
  const docRef = doc(db, 'users', userId)
  return getDoc(docRef).then((snapshot) => snapshot.data())
}

export const selectChatById = (chatId: string) => {
  const docRef = doc(db, 'chats', chatId)
  return getDoc(docRef).then((snapshot) => snapshot.data())
}

export const addChatMessage = (chatMessage: ChatMessage, chatId: string) => {
  return updateDoc(doc(db, 'chats', chatId), {
    messages: arrayUnion(chatMessage),
  })
}

export const deleteChatMessage = (chatMessage: ChatMessage, chatId: string) => {
  return updateDoc(doc(db, 'chats', chatId), {
    messages: arrayRemove(chatMessage),
  })
}

export const joinEvent = (userDetails: any, eventId: string) => {
  return updateDoc(doc(db, 'events', eventId), {
    pending_attendees: arrayUnion(userDetails),
  }).then(() => {
    return updateDoc(doc(db, 'users', userDetails.userId), {
      requested_events: arrayUnion(eventId),
    })
  })
}

export const addAttendee = (eventId: string, userDetails: any) => {
  return updateDoc(doc(db, 'events', eventId), {
    attendees: arrayUnion(userDetails),
    pending_attendees: arrayRemove(userDetails),
  }).then(() => {
    return updateDoc(doc(db, 'users', userDetails.userId), {
      accepted_events: arrayUnion(eventId),
      requested_events: arrayRemove(eventId),
    })
  })
}

export const removeAttendee = (eventId: string, userDetails: any) => {
  return updateDoc(doc(db, 'events', eventId), {
    attendees: arrayRemove(userDetails),
  })
}

export const removeSelfFromEvent = (userDetails: any, eventId: string) => {
  return updateDoc(doc(db, 'events', eventId), {
    pending_attendees: arrayRemove(userDetails),
    attendees: arrayRemove(userDetails),
  }).then(() => {
    return updateDoc(doc(db, 'users', userDetails.userId), {
      requested_events: arrayRemove(eventId),
      accepted_events: arrayRemove(eventId),
    })
  })
}

export const addNewEventToCurrentUserProfile = (userId: string, eventId: string) => {
  return updateDoc(doc(db, 'users', userId), {
    hosted_events: arrayUnion(eventId),
  })
}

export const updateUserDetails = (userDetails: User, uid: string) => {
  return updateDoc(doc(db, 'users', uid), userDetails)
}
export const deleteEventFromUsersHostedEvents = (userId: string, eventId: string) => {
  return updateDoc(doc(db, 'users', userId), {
    hosted_events: arrayRemove(eventId),
  })
}

export const deleteEventFromUsersRequestedEvents = (users: [], eventId: string) => {
  users.forEach((user) => {
    updateDoc(doc(db, 'users', user), {
      requested_events: arrayRemove(eventId),
    })
  })
}
