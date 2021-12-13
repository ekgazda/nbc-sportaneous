import { View, Text, Button, TextInput } from 'react-native'
import React, { useState } from 'react'
import { getAuth } from 'firebase/auth'
import { styles } from './GetUserName.style'
import { addNewUser } from '../../utils/utils'

const auth = getAuth()

export const GetUserName = ({ reload }: { reload: () => void }) => {
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')

  const user = {
    first_name: firstName,
    last_name: lastName,
    hosted_events: [],
    requested_events: [],
    image_bitmap: '',
  }

  const isDisabled = firstName === '' || lastName === ''

  const handlePress = () => {
    if (auth.currentUser) {
      addNewUser(user, auth.currentUser.uid).then(reload)
    }
  }

  return (
    <View style={styles.container}>
      <Text>Hello! What's your name?</Text>
      <Text>First Name:</Text>
      <TextInput
        style={styles.inputName}
        onChangeText={setFirstName}
        value={firstName}
      />
      <Text>Last Name:</Text>
      <TextInput
        style={styles.inputName}
        onChangeText={setLastName}
        value={lastName}
      />
      <Button
        onPress={handlePress}
        color="black"
        title="Submit"
        disabled={isDisabled}
      />
    </View>
  )
}