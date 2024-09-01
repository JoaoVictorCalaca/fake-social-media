import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { photo } from '@/src/types/photoType'
import { appColor } from '@/src/styles/colors'
import { Ionicons } from '@expo/vector-icons'

const PhotoCard = (props: photo) => {
  const [likes, setLikes] = useState(Math.floor(Math.random() * 1000))
  const [isLiked, setIsliked] = useState(false)
  
  const handleLike = () => {
    setLikes(isLiked ? likes - 1 : likes + 1)
    setIsliked(!isLiked)
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{props.title}</Text>

      <Image style={styles.img} source={{ uri: props.url }}/>

      <TouchableOpacity style={styles.btn} onPress={handleLike}>
          <Ionicons name={isLiked ? 'heart' : 'heart-outline'} color={appColor.defaultRed} size={24} />
          <Text style={{ color: appColor.defaultRed, fontSize: 15, fontWeight: 'bold' }}>{likes}</Text>
        </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    gap: 10,
    padding: 14,
    backgroundColor: appColor.defaultBlue
  },

  title: {
    color: appColor.defaultWhite,
    fontWeight: 'bold',
    fontSize: 24
  },

  img: {
    width: '95%',
    aspectRatio: 1/1,
    borderRadius: 20
  },

  btn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 7,
  },
})

export default PhotoCard