import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { commentary } from '@/src/types/commentaryType'
import { Ionicons } from '@expo/vector-icons'
import { appColor } from '@/src/styles/colors'
import { useRandomColor } from '@/src/hooks/useRandomColor'

const CommentaryCard = (props: commentary) => {
  const [likes, setLikes] = useState(Math.floor(Math.random() * 1000))
  const [isLiked, setIsliked] = useState(false)
  const [bg, setBg] = useState('')

  useEffect(()=> {
    setBg(useRandomColor())
  }, [])

  const handleLike = () => {
    setLikes(isLiked ? likes - 1 : likes + 1)
    setIsliked(!isLiked)
  }

  return (
    <View style={styles.container}>
      <View style={styles.userInfo}>
        <Ionicons name='person-circle' color={bg} size={45} />
        <View style={{ width: '80%' }}>
          <Text style={styles.userName}>{props.name}</Text>
          <Text style={styles.userMail}>{props.email}</Text>
        </View>
      </View>

      <View style={styles.content}>
        <Text style={[styles.commentBody]}>{props.body}</Text>
      </View>

      <View style={styles.actions}>
        <TouchableOpacity style={styles.btn} onPress={handleLike}>
          <Ionicons name={isLiked ? 'heart' : 'heart-outline'} color={appColor.defaultRed} size={24} />
          <Text style={{ color: appColor.defaultRed, fontSize: 15, fontWeight: 'bold' }}>{likes}</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    gap: 10,
    width: '100%',
    paddingVertical: 15,
  },

  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10
  },

  userName: {
    color: appColor.defaultWhite,
    fontWeight: 'bold',
    fontSize: 15
  },

  userMail: {
    color: appColor.defaultGrey,
    fontSize: 10
  },

  content: {
    gap: 10
  },

  commentBody: {
    color: appColor.defaultWhite,
    fontSize: 15
  },

  actions: {
    flexDirection: 'row',
    gap: 25
  },

  btn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 7,
  },
})

export default CommentaryCard