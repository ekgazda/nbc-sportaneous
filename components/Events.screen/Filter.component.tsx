import React, { useState } from 'react'
import { Text, View, Pressable } from 'react-native'
import { CheckBox } from 'react-native-elements'
import Collapsible from 'react-native-collapsible'
import { selectAllEvents } from '../../db/api'
import {
  updateCheckBox,
  resetSelection,
  applyFilter,
} from './utils/FilterUtils'
import { styles } from './Filter.style'

const Filter = ({ setEvents, categoryIsChecked, setCategoryIsChecked }) => {
  const [isCollapsed, setIsCollapsed] = useState(true)

  return (
    <View>
      <Pressable
        style={({ pressed }) => [
          {
            backgroundColor: pressed
              ? 'rgba(50, 59, 118, 0.5)'
              : '#323B76',
          },
          styles.filterButton,
        ]}
        onPress={() => {
          isCollapsed === true ? setIsCollapsed(false) : setIsCollapsed(true)
        }}
      >
        <Text style={styles.buttonTitle}>Filter</Text>
      </Pressable>
      <Collapsible collapsed={isCollapsed}>
        <Text style={styles.title}>Select Categories:</Text>
        <View style={styles.checkBoxContainer}>
          {Object.keys(categoryIsChecked).map((activity) => {
            return (
              <CheckBox
                key={activity}
                title={activity}
                containerStyle={styles.checkBox}
                textStyle={styles.checkBoxText}
                checked={categoryIsChecked[activity]}
                onPress={() => {
                  updateCheckBox(activity, setCategoryIsChecked)
                }}
              ></CheckBox>
            )
          })}
        </View>
        <View style={styles.lowerButtonContainer}>
          <Pressable
            style={({ pressed }) => [
              {
                backgroundColor: pressed
                  ? 'rgba(108, 93, 171, 0.5)'
                  : '#6C5DAB',
              },
              styles.lowerButtonClear,
            ]}
            onPress={() => {
              resetSelection(setCategoryIsChecked)
            }}
          >
            <Text style={styles.buttonTitle}>Clear Selection</Text>
          </Pressable>
          <Pressable
            style={({ pressed }) => [
              {
                backgroundColor: pressed
                  ? 'rgba(50, 59, 118, 0.5)'
                  : '#5763b8',
              },
              styles.lowerButtonApply,
            ]}
            onPress={() => {
              applyFilter(categoryIsChecked, selectAllEvents, setEvents)
            }}
          >
            <Text style={styles.buttonTitle}>Apply Filters</Text>
          </Pressable>
        </View>
      </Collapsible>
    </View>
  )
}

export default Filter
