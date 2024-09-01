import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { album } from '@/src/types/albumType'
import { appColor } from '@/src/styles/colors'
import { Link } from 'expo-router'
import { Ionicons } from '@expo/vector-icons'
import { useRandomColor } from '@/src/hooks/useRandomColor'

const AlbumCard = (props: album) => {
  const [bg, setBg] = useState('')

  useEffect(()=> {
    setBg(useRandomColor())
  }, [])

  return (
    <View style={styles.container}>
    <View style={[styles.albumBox, { backgroundColor: bg, }]}>
        <Text style={{ fontSize: 50 }}>📷</Text>
      </View>

      <Text style={styles.title}>{props.title}</Text>

      <Link href={`/album/${props.id}`} asChild>
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
    flexDirection: 'column',
    justifyContent: 'space-between',
    padding: 10,
    gap: 10
  },

  albumBox: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '70%',
    aspectRatio: 1 / 1,
    borderRadius: 20,
    marginVertical: 10
  },

  title: {
    color: appColor.defaultWhite,
    fontSize: 24,
    fontWeight: 'bold',
    width: '70%'
  },

  btn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 7,
  },
  
  seeMore: {
    color: appColor.defaultWhite,
    fontSize: 18,
    fontWeight: 'bold'
  }
})

export default AlbumCard