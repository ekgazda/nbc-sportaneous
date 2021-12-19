import React, { useState, useContext, useEffect } from 'react'
import { getAuth } from 'firebase/auth'
import { Text } from 'react-native-elements'
import { Screen } from 'react-native-screens'
import { getUserById } from '../../db/api'
import { UserContext } from '../../contexts/UserContext'
import { GetUserName } from '../GetUserName.screen/GetUserName.component'
import { PhoneSignIn } from '../Auth.screen/Auth.component'
import { Nav } from '../Nav.view/Nav.component'
import { styles } from './Splash.style'

export const Splash = () => {
  const auth = getAuth()

  const [isLoading, setIsLoading] = useState(true)
  const [userAuth, setUserAuth] = useState(false)
  const { currentUser, setCurrentUser } = useContext(UserContext)

  useEffect(() => {
    reload()
  }, [])

  const reload = () => {
    auth.onAuthStateChanged((user) => {
      setIsLoading(true)
      setUserAuth(false)
      if (user) {
        setIsLoading(true)
        setUserAuth(true)
        getUserById(user.uid)
          .then((userProfile) => {
            setCurrentUser({...userProfile, id: user.uid})
            setIsLoading(false)
          })
          .catch((err) => err)
      } else {
        setUserAuth(false)
        setIsLoading(false)
      }
    })
  }

  if (isLoading)
    return (
      <Screen style={styles.loadingText}>
        <Text>Loading...</Text>
      </Screen>
    )
  if (!userAuth) return <PhoneSignIn />
  if (!currentUser.first_name) return <GetUserName reload={reload} />

  return <Nav />
}
