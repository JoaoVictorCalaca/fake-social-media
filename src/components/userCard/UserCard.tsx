import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { user } from '@/src/types/userType'
import { appColor } from '@/src/styles/colors'
import { Ionicons } from '@expo/vector-icons'
import { Link } from 'expo-router'
import { useRandomColor } from '@/src/hooks/useRandomColor'

const UserCard = (props: user) => {
  const [bg, setBg] = useState('')

  useEffect(()=> {
    setBg(useRandomColor())
  }, [])


  return (
    <View style={styles.container}>
      <View style={styles.userInfo}>
        <Ionicons name='person-circle' color={bg} size={40} />
        <View>
          <Text style={styles.username}>{props.username}</Text>
          <Text style={styles.email}>{props.email}</Text>
        </View>
      </View>
      <Link href={`/user/${props.id}`} asChild>
        <TouchableOpacity style={styles.btn}>
          <Ionicons name='eye-outline' color={appColor.defaultWhite} size={24} />
          <Text style={styles.seeMore}>See more</Text>
        </TouchableOpacity>
      </Link>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },

  userInfo: {
    flexDirection: 'row',
    gap: 10,
    alignItems: 'center'
  },

  username: {
    color: appColor.defaultWhite,
    fontSize: 24,
    fontWeight: 'bold',
  },

  email: {
    color: appColor.defaultGrey,
    fontSize: 15,
    fontWeight: 'bold',
    width: '100%'
  },

  btn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 7,
    marginTop: 10
  },

  seeMore: {
    color: appColor.defaultWhite,
    fontSize: 18,
    fontWeight: 'bold'
  }
})

export default UserCard