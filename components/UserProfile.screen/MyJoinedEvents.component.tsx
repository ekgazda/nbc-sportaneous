import React, { useState, useEffect } from 'react'
import { Text, Pressable, View, ScrollView } from 'react-native'
import Collapsible from 'react-native-collapsible'
import { MyAcceptedRequests } from './MyAcceptedRequests.component'
import { MyPendingRequests } from './MyPendingRequests.component'
import { styles } from './ProfileEvents.style'

export const MyJoinedEvents = ({ user_id, navigation }) => {
  const [joinedIsCollapsed, setJoinedIsCollapsed] = useState(false)

  return (
    <View>
      <Pressable
        onPress={() => {
          setJoinedIsCollapsed(joinedIsCollapsed === true ? false : true)
        }}
      >
        <Text style={styles.eventHeader}>My Joined Events</Text>
      </Pressable>
      <ScrollView>
        <Collapsible collapsed={joinedIsCollapsed}>
          <MyAcceptedRequests user_id={user_id} navigation={navigation} />
          <MyPendingRequests user_id={user_id} navigation={navigation} />
        </Collapsible>
      </ScrollView>
    </View>
  )
}
