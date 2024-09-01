import { View, Text, StyleSheet, TextInput, ScrollView, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { appColor } from '@/src/styles/colors'
import axios from 'axios'
import { Ionicons } from '@expo/vector-icons'

const Write = () => {
  const [title, setTitle] = useState('')
  const [body, setBody] = useState('')
  const [success, setSuccess] = useState(false)

  const handlePost = async () => {
    try {
      const resp = await axios.post('https://jsonplaceholder.typicode.com/posts', {
        title: title,
        body: body,
        userId: 1,
      })
      resp.status === 201 ? setSuccess(true) : setSuccess(false)
    } catch (error) {
      console.log(`Erro ao fazer o post | ${error}`);
    }
  }

  const handleSuccess = () => {
    if (!success) {
      return (
        <>
          <View style={styles.inputs}>
            <Text style={styles.label}>Post title</Text>
            <TextInput value={title} onChangeText={setTitle} style={styles.title} placeholder='Once upon a time...' placeholderTextColor={appColor.defaultGrey} />
          </View>

          <View style={styles.inputs}>
            <Text style={styles.label}>Post title</Text>
            <TextInput value={body} onChangeText={setBody} style={styles.body} placeholder='Type a feeling... 💡' placeholderTextColor={appColor.defaultGrey} multiline={true} numberOfLines={10} textAlignVertical='top'/>
          </View>

          <TouchableOpacity onPress={handlePost} style={styles.btn}>
            <Text style={styles.btnTxt}>Post</Text>
          </TouchableOpacity>
        </>
      )
    }

    return (
      <View style={{ justifyContent: 'center', gap: 80 }}>
        <Text style={{ color: 'lightgreen', fontSize: 24, fontWeight: 'bold' }}>Successfully posted!</Text>
        <Ionicons style={{ alignSelf: 'center' }} name='checkmark-circle' color={'lightgreen'} size={180}/>
        <TouchableOpacity onPress={ ()=> {setSuccess(false); setBody(''); setTitle('')} } style={styles.btn}>
          <Text style={styles.btnTxt}>Post again</Text>
        </TouchableOpacity>
      </View>
    )
  }

  return (
    <ScrollView contentContainerStyle={{ gap: 15 }} style={styles.container}>
      {handleSuccess()}
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: appColor.defaultBlue,
    padding: 10,
    gap: 15
  },

  inputs: {
    gap: 10
  },

  label: {
    color: appColor.defaultWhite,
    fontSize: 24,
    fontWeight: 'bold'
  },

  title: {
    borderWidth: 3,
    borderColor: appColor.defaultWhite,
    borderRadius: 10,
    padding: 10,
    fontSize: 20,
    color: appColor.defaultWhite
  },

  body: {
    borderWidth: 3,
    borderColor: appColor.defaultWhite,
    borderRadius: 10,
    padding: 10,
    fontSize: 20,
    color: appColor.defaultWhite,
  },

  btn: {
    padding: 7,
    backgroundColor: appColor.tertiaryBlue,
    width: '40%',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center'
  },

  btnTxt: {
    color: appColor.defaultWhite,
    fontSize: 20
  }
})

export default Write