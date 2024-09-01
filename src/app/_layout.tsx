import { Stack } from 'expo-router/stack';
import { appColor } from '../styles/colors';

export default function Layout() {
  return (
    <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }}/>

      <Stack.Screen name="user/[id]" options={{ headerShown: true, title: 'User page', headerStyle: { backgroundColor: appColor.secondaryBlue }, headerTintColor: appColor.defaultWhite }}/>

      <Stack.Screen name="post/[id]" options={{ headerShown: true, title: 'Post page', headerStyle: { backgroundColor: appColor.secondaryBlue }, headerTintColor: appColor.defaultWhite }}/>

      <Stack.Screen name="album/[id]" options={{ headerShown: true, title: 'Album page', headerStyle: { backgroundColor: appColor.secondaryBlue }, headerTintColor: appColor.defaultWhite }}/>
    </Stack>
  );
}
