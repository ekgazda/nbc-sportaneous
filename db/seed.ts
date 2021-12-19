import { db } from "./firestoreConfig";
import { doc, setDoc } from "firebase/firestore";
import usersData from "../data/users.json";
import eventsData from "../data/events.json";
import chatsData from "../data/chats.json";

export const seedData = () => {
  const userIdArray = Object.keys(usersData);
  const eventIdArray = Object.keys(eventsData);
  const chatIdArray = Object.keys(chatsData);

  const usersCollectionString = userIdArray.map((item) => `users/${item}`);

  const eventsCollectionString = eventIdArray.map((item) => `events/${item}`);

  const chatsCollectionString = chatIdArray.map((item) => `chats/${item}`);

  for (let i = 0; i < userIdArray.length; i++) {
    const newPost = doc(db, usersCollectionString[i]);
    const docData = usersData[userIdArray[i]];
        setDoc(newPost, docData).then(() => {
      console.log("users test data inputted");
    });
  }

  for (let i = 0; i < eventIdArray.length; i++) {
    const newPost = doc(db, eventsCollectionString[i]);
    const docData = eventsData[eventIdArray[i]];
    setDoc(newPost, docData).then(() => {
      console.log("events test data inputted");
    });
  }

  for (let i = 0; i < chatIdArray.length; i++) {
    const newPost = doc(db, chatsCollectionString[i]);
    const docData = chatsData[chatIdArray[i]];
    setDoc(newPost, docData).then(() => {
      console.log("chats test data inputted");
    });
  }
};
