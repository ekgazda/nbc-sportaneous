import React, { useContext, useEffect, useState } from 'react'
import { SafeAreaView, Text, Pressable, View, Image, ScrollView } from 'react-native'
import { getDownloadURL, ref } from 'firebase/storage'
import { db, storage } from '../../db/firestoreConfig'
import { doc, onSnapshot } from '@firebase/firestore'
import { UserContext } from '../../contexts/UserContext'
import { MyHostedEvents } from './MyHostedEvents.component'
import { MyJoinedEvents } from './MyJoinedEvents.component'
import { styles } from './UserDetails.style'


export const UserDetails = ({ navigation }) => {
  const { currentUser } = useContext(UserContext)
  const [currentUserObject, setCurrentUserObject] = useState({ ...currentUser })
  const [currentDetails, setCurrentDetails] = useState({ ...currentUser })
  const [isLoading, setIsLoading] = useState(true)
  const [imgURL, setImgURL] = useState('')

  //Storage Ref for IMG file
  const storageRef = ref(storage, currentUser.image_bitmap)

  useEffect(() => {
    //firebase storage request for IMG file
    try {
      getDownloadURL(storageRef)
        .then((res) => {
          setImgURL(res)
        })
    } catch (err) {
      err
    }
    const profileDisplayDetails = {
      first_name: currentUserObject.first_name,
      last_name: currentUserObject.last_name,
      description: currentUserObject.description,
    }
    setCurrentDetails(profileDisplayDetails)
  }, [imgURL, currentUserObject])

  useEffect(() => {
    setIsLoading(true)
    const unsub = onSnapshot(doc(db, 'users', currentUser.id), (doc: any) => {
      setCurrentUserObject(doc.data())
    })
  }, [currentUser.id])

  if (isLoading) <Text>Loading details ...</Text>
  return (
    <SafeAreaView style={styles.page}>
      <ScrollView>
        <Text style={styles.title}>Account Details</Text>
        {imgURL ? (
          <Image source={{ uri: imgURL }} style={styles.avatar} />
        ) : null}
        <View style={styles.detailsContainer}>
          <Text style={styles.detailsField}>First Name</Text>
          <Text style={styles.detailsValue}>{currentDetails.first_name}</Text>
          <Text style={styles.detailsField}>Last Name</Text>
          <Text style={styles.detailsValue}>{currentDetails.last_name}</Text>
          <Text style={styles.detailsField}>Description</Text>
          <Text style={styles.detailsValue}>{currentDetails.description}</Text>
          <Pressable
            style={({ pressed }) => [
              {
                backgroundColor: pressed
                  ? 'rgba(50, 59, 118, 0.5)'
                  : 'rgba(50, 59, 118, 1)',
              },
              styles.editButton,
            ]}
            onPress={() => {
              navigation.navigate('Edit Profile')
            }}
          >
            <Text style={styles.buttonTitle}>Edit Details</Text>
          </Pressable>
        </View>
        <MyHostedEvents user_id={currentUser.id} navigation={navigation} />
        <MyJoinedEvents user_id={currentUser.id} navigation={navigation} />
      </ScrollView>
    </SafeAreaView>
  )
}
