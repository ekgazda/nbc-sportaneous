import React from 'react'
import { Pressable, View, Text } from 'react-native'
import { selectAllEvents } from '../../db/api'
import { resetSelection } from './utils/FilterUtils'
import { styles } from './Filter.style'

export const RefreshEvents = ({ setEvents, setCategoryIsChecked }) => {
  return (
    <View>
      <Pressable
        style={({ pressed }) => [
          {
            backgroundColor: pressed ? 'silver' : 'grey',
          },
          styles.refreshButton,
        ]}
        onPress={() => {
          selectAllEvents().then((res) => {
            resetSelection(setCategoryIsChecked)
            setEvents(res)
          })
        }}
      >
        <Text style={styles.buttonTitle}>Reload Event List</Text>
      </Pressable>
    </View>
  )
}
