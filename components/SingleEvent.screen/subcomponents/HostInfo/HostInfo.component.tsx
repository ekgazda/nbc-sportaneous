import React, { useEffect, useState } from 'react'
import { View, Text, Image } from 'react-native'
import { addEventProps } from '../../SingleEvent.utils'
import { getUserById } from '../../../../db/api'
import { styles } from './HostInfo.style'

export const HostInfo = ({ hostDetails }: addEventProps) => {
  const [imgURL, setImgURL] = useState('')
  useEffect(() => {
    if (hostDetails?.id !== '') {
      getUserById(hostDetails?.id)
        .then((userData: any) => {
          setImgURL(userData?.image_bitmap)
        })
    }
  }, [hostDetails])

  return (
    <View style={styles.hostView}>
      <Text style={styles.text}>About the host:</Text>
      <Text
        style={styles.capitalizedText}
      >{`${hostDetails?.first_name} ${hostDetails?.last_name}`}</Text>
      {imgURL ? <Image source={{ uri: imgURL }} /> : null}
      <Text style={styles.text}>{hostDetails?.description}</Text>
    </View>
  )
}
