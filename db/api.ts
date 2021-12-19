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
} from "firebase/firestore";
import {db} from "./firestoreConfig.js";

export const selectAllEvents = () => {
  return getDocs(collection(db, "events")).then((snapshot) => {
    let eventsArray = [];
    snapshot.docs.forEach((doc) => {
      eventsArray.push({...doc.data(), id: doc.id});
    });
    return eventsArray;
  });
};

export const selectEventsByUser = (userId) => {
  const q = query(collection(db, "events"), where("host_id", "==", userId));
  return getDocs(q).then((snapshot) => {
    let eventsArray = [];
    snapshot.docs.forEach((doc) => {
      eventsArray.push({...doc.data(), id: doc.id});
    });
    return eventsArray;
  });
};

export const selectEventById = (eventId) => {
  const docRef = doc(db, "events", eventId);
  return getDoc(docRef).then((snapshot) => {
    const event = snapshot.data();
    return event;
  });
};

export const addNewEvent = (newEvent) => {
  return addDoc(collection(db, "events"), newEvent).then((res) => res.id);
};

export const addNewUser = (newUser, uid) => {
  return setDoc(doc(db, "users", uid), newUser);
};

export const addNewChatroom = (newChatroom, eventId) => {
  return setDoc(doc(db, "chats", eventId), newChatroom);
};

export const selectFilteredEvents = (location) => {
  const q1 = query(collection(db, "events"), where("location", "==", location));
  return getDocs(q1).then((snapshot) => {
    let eventsArray = [];
    snapshot.docs.forEach((doc) => {
      eventsArray.push({...doc.data(), id: doc.id});
    });
    return eventsArray;
  });
};

export const deleteUser = (userId) => {
  return deleteDoc(doc(db, "users", userId));
};

export const deleteEvent = (eventId) => {
  return deleteDoc(doc(db, "events", eventId));
};

export const deleteChatroom = (chatId) => {
  return deleteDoc(doc(db, "chats", chatId));
};

export const getUsers = () => {
  return getDocs(collection(db, "users")).then((snapshot) => {
    let users = [];
    snapshot.docs.forEach((user) => {
      users.push({...user.data(), id: user.id});
    });
    return users;
  });
};

export const getUserById = (userId) => {
  const docRef = doc(db, "users", userId);
  return getDoc(docRef).then((snapshot) => snapshot.data());
};

export const selectChatById = (chatId) => {
  const docRef = doc(db, "chats", chatId);
  return getDoc(docRef).then((snapshot) => snapshot.data());
};

export const addChatMessage = (chatObject, chatId) => {
  return updateDoc(doc(db, "chats", chatId), {
    messages: arrayUnion(chatObject),
  });
};

export const deleteChatMessage = (chatObject, chatId) => {
  return updateDoc(doc(db, "chats", chatId), {
    messages: arrayRemove(chatObject),
  });
};

export const joinEvent = (userDetails, eventId) => {
  return updateDoc(doc(db, "events", eventId), {
    pending_attendees: arrayUnion(userDetails),
  }).then(() => {
    return updateDoc(doc(db, "users", userDetails.userId), {
      requested_events: arrayUnion(eventId),
    });
  });
};

export const addAttendee = (eventId, userDetails) => {
  return updateDoc(doc(db, "events", eventId), {
    attendees: arrayUnion(userDetails),
    pending_attendees: arrayRemove(userDetails),
  }).then(() => {
    return updateDoc(doc(db, "users", userDetails.userId), {
      accepted_events: arrayUnion(eventId),
      requested_events: arrayRemove(eventId),
    });
  });
};

export const removeAttendee = (eventId, userDetails) => {
  return updateDoc(doc(db, "events", eventId), {
    attendees: arrayRemove(userDetails),
  });
};

export const removeSelfFromEvent = (userDetails, eventId) => {
  return updateDoc(doc(db, "events", eventId), {
    pending_attendees: arrayRemove(userDetails),
    attendees: arrayRemove(userDetails),
  }).then(() => {
    return updateDoc(doc(db, "users", userDetails.userId), {
      requested_events: arrayRemove(eventId),
      accepted_events: arrayRemove(eventId),
    });
  });
};

export const addNewEventToCurrentUserProfile = (userId, eventId) => {
  return updateDoc(doc(db, "users", userId), {
    hosted_events: arrayUnion(eventId),
  });
};

export const updateUserDetails = (userDetails, uid) => {
  return updateDoc(doc(db, "users", uid), userDetails);
};
export const deleteEventFromUsersHostedEvents = (userId, eventId) => {
  return updateDoc(doc(db, "users", userId), {
    hosted_events: arrayRemove(eventId),
  });
};

export const deleteEventFromUsersRequestedEvents = (users, eventId) => {
  users.forEach((user) => {
    updateDoc(doc(db, "users", user), {
      requested_events: arrayRemove(eventId),
    });
  });
};