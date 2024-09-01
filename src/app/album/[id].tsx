import { View, Text, ListRenderItem, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useLocalSearchParams } from 'expo-router'
import { photo } from '@/src/types/photoType'
import axios from 'axios'
import { album } from '@/src/types/albumType'
import PhotoCard from '@/src/components/photoCard/PhotoCard'
import { appColor } from '@/src/styles/colors'

const albumPage = () => {
  const { id } = useLocalSearchParams()

  const [albums, setAlbums] = useState<album[]>([])
  const [photos, setPhotos] = useState<photo[]>([])

  useEffect(() => {
    try {
      const fetchAlbums = async () => {
        const resp = await axios.get('https://jsonplaceholder.typicode.com/albums')
        setAlbums(resp.data)
      }

      const fetchPhotos = async () => {
        const resp = await axios.get('https://jsonplaceholder.typicode.com/photos')
        setPhotos(resp.data)
      }

      fetchAlbums()
      fetchPhotos()
    } catch (error) {
      console.log(`Erro na consulta da api | ${error}`);
    }
  }, [])

  const filteredAlbums = albums.filter(album => album.id == id)
  const filteredPhotos = photos.filter(photo => photo.albumId == id)

  const renderPhotos: ListRenderItem<photo> = ({ item }) => <PhotoCard id={item.id} title={item.title} thumbnailUrl={item.thumbnailUrl} albumId={id.toString()} url={item.url} />;

  return (
    <View style={{ flex: 1, gap: 14, backgroundColor: appColor.defaultBlue, padding: 10 }}>

      {filteredAlbums.map((album) => (
        <>
          <Text key={Math.random().toString()} style={{ color: appColor.defaultWhite, fontWeight: 'bold', fontSize: 30 }}>Photos from: {album.title}</Text>
        </>
      ))}

      <FlatList renderItem={renderPhotos} data={filteredPhotos} keyExtractor={(item) => item.id} />
    </View>
  )
}

export default albumPage