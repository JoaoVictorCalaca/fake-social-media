import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { post } from '@/src/types/postType'
import { Ionicons } from '@expo/vector-icons'
import { appColor } from '@/src/styles/colors'
import { Link } from 'expo-router'
import { user } from '@/src/types/userType'
import axios from 'axios'
import { useRandomColor } from '@/src/hooks/useRandomColor'

const PostCard = (props: post) => {
  const [likes, setLikes] = useState(Math.floor(Math.random() * 1000))
  const [isLiked, setIsliked] = useState(false)
  const [users, setUsers] = useState<user[]>([])
  const [bg, setBg] = useState('')

  const handleLike = () => {
    setLikes(isLiked ? likes - 1 : likes + 1)
    setIsliked(!isLiked)
  }

  useEffect(() => {
    const fetchUsers = async () => {
      const resp = await axios.get('https://jsonplaceholder.typicode.com/users')
      setUsers(resp.data)
    }

    fetchUsers()

    setBg(useRandomColor())
  }, [])

  const filteredUser = users.filter(user => user.id == props.userId)

  return (
    <View style={styles.container}>
      <View style={styles.userInfo}>
        <Ionicons name='person-circle' color={bg} size={45} />
        {filteredUser.map((user) => (
          <View key={user.id}>
            <Text style={styles.userName}>{user.name}</Text>
            <Text style={styles.userMail}>{user.email}</Text>
          </View>
        ))}
      </View>

      <View style={styles.content}>
        <Text style={[styles.postTitle]}>{props.title}</Text>
        <Text style={[styles.postBody]}>{props.body}</Text>
      </View>

      <View style={styles.actions}>
        <TouchableOpacity style={styles.btn} onPress={handleLike}>
          <Ionicons name={isLiked ? 'heart' : 'heart-outline'} color={appColor.defaultRed} size={24} />
          <Text style={{ color: appColor.defaultRed, fontSize: 18, fontWeight: 'bold' }}>{likes}</Text>
        </TouchableOpacity>

        <Link href={`/post/${props.id}`} asChild>
          <TouchableOpacity style={styles.btn}>
            <Ionicons name='eye-outline' color={appColor.defaultWhite} size={24} />
            <Text style={styles.seeMore}>See more</Text>
          </TouchableOpacity>
        </Link>
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
    fontSize: 24
  },

  userMail: {
    color: appColor.defaultGrey,
    fontSize: 16
  },

  content: {
    gap: 10
  },

  postTitle: {
    color: appColor.defaultWhite,
    fontWeight: 'bold',
    fontSize: 24,
    textTransform: 'capitalize'
  },

  postBody: {
    color: appColor.defaultWhite,
    fontSize: 20
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

  likeTxt: {
    color: appColor.defaultRed,
    fontSize: 18,
    fontWeight: 'bold'
  },

  seeMore: {
    color: appColor.defaultWhite,
    fontSize: 18,
    fontWeight: 'bold'
  }
})

export default PostCard