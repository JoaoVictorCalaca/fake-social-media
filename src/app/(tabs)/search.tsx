import { View, Text, ListRenderItem, StyleSheet, Platform, FlatList, TextInput, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { post } from '@/src/types/postType'
import axios from 'axios'
import PostCard from '@/src/components/postCard/PostCard'
import { StatusBar } from 'expo-status-bar'
import { appColor } from '@/src/styles/colors'
import Constants from 'expo-constants'
import { Ionicons } from '@expo/vector-icons'
import { album } from '@/src/types/albumType'
import AlbumCard from '@/src/components/albumCard/AlbumCard'
import { user } from '@/src/types/userType'
import UserCard from '@/src/components/userCard/UserCard'

const search = () => {
  const [posts, setPosts] = useState<post[]>([])
  const [albums, setAlbums] = useState<album[]>([])
  const [users, setUsers] = useState<user[]>([])
  const [query, setQuery] = useState('')
  const [selected, setSelected] = useState(0)

  useEffect(() => {
    try {
      const fetchPosts = async () => {
        const resp = await axios.get('https://jsonplaceholder.typicode.com/posts')
        setPosts(resp.data)
      }

      const fetchAlbums = async () => {
        const resp = await axios.get('https://jsonplaceholder.typicode.com/albums')
        setAlbums(resp.data)
      }

      const fetchUsers = async () => {
        const resp = await axios.get('https://jsonplaceholder.typicode.com/users')
        setUsers(resp.data)
      }

      fetchPosts()
      fetchAlbums()
      fetchUsers()
    } catch (error) {
      console.log(`Erro na consulta da api | ${error}`);
    }
  }, [])


  const filteredPosts = query.length > 0 ? posts.filter(post => post.title.includes(query.toLowerCase())) : []
  const filteredAlbums = query.length > 0 ? albums.filter(album => album.title.includes(query.toLowerCase())) : []
  const filteredUsers = query.length > 0 ? users.filter(user => user.username.toLowerCase().includes(query.toLowerCase())) : []

  const renderPosts: ListRenderItem<post> = ({ item }) => <PostCard title={item.title} body={item.body} id={item.id} userId={item.userId}/>;
  const renderAlbums: ListRenderItem<album> = ({ item }) => <AlbumCard id={item.id} title={item.title} userId={item.userId}/>;
  const renderUsers: ListRenderItem<user> = ({ item }) => <UserCard id={item.id} email={item.email} name={item.name} username={item.username}/>;

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
      case 2:
        return (
          <FlatList style={{ gap: 14 }} data={filteredUsers} renderItem={renderUsers} keyExtractor={(item: user) => item.id.toString()} />
        )
      default:
        break;
    }
  }

  const loadEmptyScreen = () => {
    if (query.length <= 0) {
      return (
        <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: 100, gap: 20 }}>
          <Text style={{ color: appColor.defaultWhite, fontSize: 20 }}>Search something 🔎</Text>
          <Ionicons name='rocket' color={appColor.defaultWhite} size={80} />
        </View>
      )
    } else {
      if ((filteredPosts.length <= 0 && selected === 0) || (filteredAlbums.length <= 0 && selected === 1) || (filteredUsers.length <= 0 && selected === 2)) {
        return (
          <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: 100, gap: 20 }}>
            <Text style={{ color: appColor.defaultWhite, fontSize: 20 }}>Sorry, we couldn't find anything 😪</Text>
            <Ionicons name='rainy' color={appColor.defaultWhite} size={80} />
          </View>
        )
      }
    }
  }

  return (
    <View style={styles.container}>
      <StatusBar />
      <View style={{ gap: 10 }}>
        <View style={styles.searchContainer}>
          <Ionicons name='search' color={appColor.defaultWhite} size={24} />
          <TextInput returnKeyType='search' value={query} onChangeText={setQuery} style={styles.TextInput} placeholder='Search posts, users, albums...' placeholderTextColor={appColor.defaultGrey} />
        </View>

        <View style={styles.searchFilter}>
          <TouchableOpacity onPress={()=> setSelected(0)} style={[styles.searchFilterBtn, { backgroundColor: selected === 0 ? appColor.tertiaryBlue : appColor.secondaryBlue }]}>
            <Text style={styles.searchFilterTxt}>Posts</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={()=> setSelected(1)} style={[styles.searchFilterBtn, { backgroundColor: selected === 1 ? appColor.tertiaryBlue : appColor.secondaryBlue }]}>
            <Text style={styles.searchFilterTxt}>Albums</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={()=> setSelected(2)} style={[styles.searchFilterBtn, { backgroundColor: selected === 2 ? appColor.tertiaryBlue : appColor.secondaryBlue }]}>
            <Text style={styles.searchFilterTxt}>Users</Text>
          </TouchableOpacity>
        </View>
      </View>

      {loadEmptyScreen()}

      {handleSearch()}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: appColor.defaultBlue,
    paddingHorizontal: 10,
    paddingVertical: Platform.OS ? Constants.statusBarHeight + 10 : 20,
    paddingBottom: 20
  },

  searchContainer: {
    borderWidth: 3,
    borderColor: appColor.defaultWhite,
    borderRadius: 20,
    flexDirection: 'row',
    gap: 10,
    paddingVertical: 5,
    paddingHorizontal: 10
  },

  TextInput: {
    width: '100%',
    color: appColor.defaultWhite,
    fontSize: 15
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

export default search