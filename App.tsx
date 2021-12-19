import React from 'react'
import { LogBox } from 'react-native'
import { firebaseApp } from './db/firestoreConfig'
import { Splash } from './components/Splash.screen/Splash.component'
import { NavigationContainer } from '@react-navigation/native'
import { UserProvider } from './contexts/UserContext'

export default function App() {
  firebaseApp

  LogBox.ignoreAllLogs()
  
  return (
    <UserProvider>
      <NavigationContainer>
        <Splash />
      </NavigationContainer>
    </UserProvider>
  )
}
