import React, { useState, useEffect, useContext } from 'react'
import {
  Text,
  TextInput,
  Button,
  Image,
  Platform,
  View,
  Alert,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
} from 'react-native'
import * as ImagePicker from 'expo-image-picker'
import { storage } from '../../db/firestoreConfig'
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage'
import { UserContext } from '../../contexts/UserContext'
import { updateUserDetails, deleteUser } from '../../db/api'
import { styles } from './EditProfile.style'

type UpdateUserProps = {
  navigation: {
    navigate: (component: string) => {}
  }
}

export const EditProfile = ({ navigation }: UpdateUserProps) => {
  const { currentUser } = useContext(UserContext)
  const [imgURL, setImgURL] = useState('')
  const [userDetails, setUserDetails] = useState(currentUser)

  useEffect(() => {
    ;(async () => {
      if (Platform.OS !== 'web') {
        const { status } =
          await ImagePicker.requestMediaLibraryPermissionsAsync()
        if (status !== 'granted') {
          alert('Sorry, we need camera roll permissions to make this work!')
        }
      }
    })()
  }, [imgURL])

  const handleChange = (text: string, stateKey: string) => {
    setUserDetails({ ...userDetails, [stateKey]: text })
  }

  const updateUser = () => {
    updateUserDetails(userDetails, currentUser.id)
    navigation.navigate('Profile')
  }

  const selectPhoto = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    })
    if (!result.cancelled) {
      uploadImage(result.uri, `avatar/img/${currentUser.id}`)
        .then((res) => {
          Alert.alert('Upload Successful')
        })
        .catch((err) => {
          Alert.alert(err)
        })
    }
  }

  const uploadImage = async (uri: string, imageName: string) => {
    if (!uri) return
    const blob = await new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest()
      xhr.onload = function () {
        resolve(xhr.response)
      }
      xhr.onerror = function (e) {
        reject(new TypeError('Network request failed'))
      }
      xhr.responseType = 'blob'
      xhr.open('GET', uri, true)
      xhr.send(null)
    })

    const storageRef = ref(storage, `/images/${imageName}`)
    const result = await uploadBytes(storageRef, blob)

    blob.close()

    getDownloadURL(storageRef)
      .then((url) => {
        handleChange(url, 'image_bitmap')
        setImgURL(url)
        return imgURL
      })
      .catch((err) => {
        err
      })
  }

  const deleteUserDetails = () => {
    deleteUser(currentUser.id)
      .then(() => {})
      .catch(() => {})
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <Text style={styles.title}>Update Details</Text>
        {imgURL ? (
          <Image source={{ uri: imgURL }} style={styles.avatar} />
        ) : null}
        <Button onPress={selectPhoto} color="black" title="Choose Photo" />
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={styles.inputContainer}>
              <Text style={styles.inputTitle}>First Name:</Text>
              <TextInput
                style={styles.inputField}
                onChangeText={(text) => handleChange(text, 'first_name')}
                placeholder="First Name"
              />
              <Text style={styles.inputTitle}>Last Name:</Text>
              <TextInput
                style={styles.inputField}
                onChangeText={(text) => handleChange(text, 'last_name')}
                placeholder="Last Name"
              />
              <Text style={styles.inputTitle}>Description:</Text>
              <TextInput
                style={styles.inputField}
                onChangeText={(text) => handleChange(text, 'description')}
                placeholder="Description"
              />
            </View>
          </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
        <View style={styles.submit}>
          <TouchableOpacity style={styles.submitButton} onPress={updateUser}>
            <Text style={styles.submitText}>SUBMIT</Text>
          </TouchableOpacity>
        </View>
        <Button
          onPress={deleteUserDetails}
          color="red"
          title="Delete Account"
        />
      </ScrollView>
    </SafeAreaView>
  )
}
