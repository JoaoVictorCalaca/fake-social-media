import { View, Text, Platform, StatusBar, StyleSheet, TouchableOpacity, ListRenderItem, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useLocalSearchParams } from 'expo-router'
import axios from 'axios'
import { post } from '@/src/types/postType'
import { appColor } from '@/src/styles/colors'
import Constants from 'expo-constants';
import { Ionicons } from '@expo/vector-icons'
import CommentaryCard from '@/src/components/commentaryCard/CommentaryCard'
import { commentary } from '@/src/types/commentaryType'
import { user } from '@/src/types/userType'

const PostPage = () => {
  const [posts, setPosts] = useState<post[]>([])
  const [users, setUsers] = useState<user[]>([])
  const [comments, setComments] = useState([])
  const { id } = useLocalSearchParams()

  useEffect(() => {
    try {
      const fetchPosts = async () => {
        const resp = await axios.get('https://jsonplaceholder.typicode.com/posts')
        setPosts(resp.data)
      }

      const fetchComments = async () => {
        const resp = await axios.get(`https://jsonplaceholder.typicode.com/comments?postId=${id}`)
        setComments(resp.data)
      }

      const fetchUsers = async () => {
        const resp = await axios.get('https://jsonplaceholder.typicode.com/users')
        setUsers(resp.data)
      }
  
      fetchUsers()
      fetchComments()
      fetchPosts()
    } catch (error) {
      console.log(`Erro na consulta da api | ${error}`);
    }
  }, [])

  const filteredPost = posts.filter(post => post.id == id)
  const userId = filteredPost.length > 0 ? filteredPost[0].userId : null;
  const filteredUser = users.find((user) => user.id === userId);

  
  const renderComments: ListRenderItem<commentary> = ({ item }) => <CommentaryCard name={item.name} postId={item.postId} email={item.email} body={item.body} id={item.id} />

  const [likes, setLikes] = useState(Math.floor(Math.random() * 1000))
  const [isLiked, setIsliked] = useState(false)

  const handleLike = () => {
    setLikes(isLiked ? likes - 1 : likes + 1)
    setIsliked(!isLiked)
  }

  return (
    <View style={styles.container}>
      <StatusBar />
      {filteredPost.map((item) => (
        <View key={item.id}>
          <View style={styles.userInfo}>
            <Ionicons name='person-circle' color={appColor.defaultWhite} size={45} />
            <View>
              <Text style={styles.userName}>{filteredUser?.name || 'Username'}</Text>
              <Text style={styles.userMail}>{filteredUser?.email || 'user@mail.com'}</Text>
            </View>
          </View>

          <View style={styles.content}>
            <Text style={[styles.postTitle]}>{item.title}</Text>
            <Text style={[styles.postBody]}>{item.body}</Text>
          </View>

          <View style={styles.actions}>
            <TouchableOpacity style={styles.btn} onPress={handleLike}>
              <Ionicons name={isLiked ? 'heart' : 'heart-outline'} color={appColor.defaultRed} size={24} />
              <Text style={{ color: appColor.defaultRed, fontSize: 18, fontWeight: 'bold' }}>{likes}</Text>
            </TouchableOpacity>
          </View>
        </View>
      ))}

      <View style={styles.commentSectionH1}>
        <Text style={styles.commentSectionH1Txt}>Replies in this post</Text>
      </View>

      <FlatList data={comments} renderItem={renderComments} keyExtractor={(item: commentary) => item.id.toString()} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 10,
    backgroundColor: appColor.defaultBlue,
    paddingHorizontal: 10,
    paddingTop: 10,
    justifyContent: 'space-between'
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
    gap: 25,
    marginTop: 10
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
  },

  commentSectionH1: {
    borderColor: appColor.defaultWhite,
    borderBottomWidth: 3,
    paddingBottom: 15
  },

  commentSectionH1Txt: {
    color: appColor.defaultWhite,
    fontSize: 24
  }
})

export default PostPage