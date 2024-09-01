import { appColor } from '@/src/styles/colors';
import { Ionicons } from '@expo/vector-icons';
import { useRoute } from '@react-navigation/native';
import { Tabs } from 'expo-router';

export default function TabLayout() {
  const route = useRoute()

  return (
    <Tabs screenOptions={{ tabBarActiveTintColor: 'white', tabBarStyle: { backgroundColor: appColor.secondaryBlue, display: route.name === 'postPage' ? 'none' : 'flex', }, headerShown: false }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) => <Ionicons size={28} name="home-outline" color={color} />,
        }}
      />
      <Tabs.Screen
        name="search"
        options={{
          title: 'Search',
          tabBarIcon: ({ color }) => <Ionicons size={28} name="search-outline" color={color} />,
        }}
      />
      <Tabs.Screen
        name="write"
        options={{
          headerShown: true,
          headerTitle: 'Write a post',
          headerTintColor: appColor.defaultWhite,
          headerStyle: { backgroundColor: appColor.defaultBlue},
          title: 'Write',
          tabBarIcon: ({ color }) => <Ionicons size={28} name="create-outline" color={color} />,
        }}
      />
    </Tabs>
  );
}
