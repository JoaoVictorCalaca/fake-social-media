import { FlatList, ListRenderItem, StatusBar, StyleSheet, Text, View, Platform } from "react-native";
import { appColor } from "../../styles/colors";
import { useEffect, useState } from "react";
import axios from "axios";
import { post } from "@/src/types/postType";
import PostCard from "@/src/components/postCard/PostCard";
import Constants from 'expo-constants';

export default function Index() {
  const [posts, setPosts] = useState<post[]>([])

  useEffect(()=> {
    try {
      const fetchPosts = async ()=> {
        const resp = await axios.get('https://jsonplaceholder.typicode.com/posts')
        const shuffledPosts = shuffleArray(resp.data)
        setPosts(shuffledPosts)
      }

      fetchPosts()
    } catch (error) {
      console.log(`Erro na consulta da api | ${error}`);
    }
  }, [])

  const shuffleArray = (array: post[]) => {
    return array.sort(() => Math.random() - 0.5);
  };

  const renderPosts: ListRenderItem<post> = ({ item }) => <PostCard title={item.title} body={item.body} id={item.id} userId={item.userId}/>;

  return (
    <View style={styles.container}>
      <StatusBar/>
      <FlatList data={posts} renderItem={renderPosts} keyExtractor={(item: post) => item.id.toString()}/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: appColor.defaultBlue,
    paddingHorizontal: 10,
    paddingTop: Platform.OS ? Constants.statusBarHeight : 20
  },
})
