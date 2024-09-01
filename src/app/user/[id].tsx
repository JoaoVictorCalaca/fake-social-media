import { View, Text, StyleSheet, TouchableOpacity, FlatList, ListRenderItem } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useLocalSearchParams } from 'expo-router'
import { appColor } from '@/src/styles/colors'
import { Ionicons } from '@expo/vector-icons'
import axios from 'axios'
import { user } from '@/src/types/userType'
import { album } from '@/src/types/albumType'
import { post } from '@/src/types/postType'
import PostCard from '@/src/components/postCard/PostCard'
import AlbumCard from '@/src/components/albumCard/AlbumCard'

const userPage = () => {
  const { id } = useLocalSearchParams()

  const [users, setUsers] = useState<user[]>([])
  const [selected, setSelected] = useState(0)
  const [posts, setPosts] = useState<post[]>([])
  const [albums, setAlbums] = useState<album[]>([])

  useEffect(() => {
    try {
      const fetchUsers = async () => {
        const resp = await axios.get('https://jsonplaceholder.typicode.com/users')
        setUsers(resp.data)
      }

      const fetchPosts = async () => {
        const resp = await axios.get('https://jsonplaceholder.typicode.com/posts')
        setPosts(resp.data)
      }

      const fetchAlbums = async () => {
        const resp = await axios.get('https://jsonplaceholder.typicode.com/albums')
        setAlbums(resp.data)
      }
  
      fetchPosts()
      fetchAlbums()
      fetchUsers()
    } catch (error) {
      console.log(`Erro na consulta da api | ${error}`);
    }
  }, [])

  const filteredUser = users.filter(post => post.id == id)
  const filteredPosts = posts.filter(post => post.userId == id)
  const filteredAlbums = albums.filter(album => album.userId == id)

  const renderPosts: ListRenderItem<post> = ({ item }) => <PostCard title={item.title} body={item.body} id={item.id} userId={item.userId}/>;
  const renderAlbums: ListRenderItem<album> = ({ item }) => <AlbumCard id={item.id} title={item.title} userId={item.userId}/>;

  const handleSearch = ()=> {
    switch (selected) {
      case 0:
        return (
          <FlatList data={filteredPosts} renderItem={renderPosts} keyExtractor={(item: post) => item.id.toString()} />
        )
        break;
      case 1:
        return (
          <FlatList data={filteredAlbums} renderItem={renderAlbums} keyExtractor={(item: album) => item.id.toString()} />
        )
        break;
      default:
        break;
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.userInfo}>
        {filteredUser.map((user)=> (
          <View key={user.id}>
            <View style={styles.userInfo}>
            <Ionicons name='person-circle' color={appColor.defaultWhite} size={80} />
            <View>
              <Text style={styles.username}>{user.username}</Text>
              <Text style={styles.name}>Hello, my name is {user.name}</Text>
              <Text style={styles.email}>{user.email}</Text>
            </View>
          </View>
        </View>
        ))}
      </View>

      <View style={styles.searchFilter}>
          <TouchableOpacity onPress={()=> setSelected(0)} style={[styles.searchFilterBtn, { backgroundColor: selected === 0 ? appColor.tertiaryBlue : appColor.secondaryBlue }]}>
            <Text style={styles.searchFilterTxt}>Posts</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={()=> setSelected(1)} style={[styles.searchFilterBtn, { backgroundColor: selected === 1 ? appColor.tertiaryBlue : appColor.secondaryBlue }]}>
            <Text style={styles.searchFilterTxt}>Albums</Text>
          </TouchableOpacity>
        </View>

        {handleSearch()}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    borderBottomColor: appColor.secondaryBlue,
    borderBottomWidth: 3,
    padding: 10,
    flex: 1,
    gap: 10,
    backgroundColor: appColor.defaultBlue
  },

  userInfo: {
    flexDirection: 'row',
    gap: 13,
    alignItems: 'center'
  },

  username: {
    color: appColor.defaultWhite,
    fontSize: 24,
    fontWeight: 'bold',
  },

  name: {
    color: appColor.defaultWhite,
    fontSize: 20,
    width: '60%'
  },

  email: {
    color: appColor.defaultGrey,
    fontSize: 15,
    fontWeight: 'bold',
    width: '100%'
  },

  searchFilter: {
    flexDirection: 'row',
    gap: 10,
    paddingHorizontal: 5,
    paddingVertical: 10
  },

  searchFilterBtn: {
    padding: 8,
    borderRadius: 10,
  },

  searchFilterTxt: {
    color: appColor.defaultWhite,
    fontWeight: 'bold'
  }
})

export default userPage