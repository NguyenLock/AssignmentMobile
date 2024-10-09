import React from 'react';
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from '@react-navigation/stack';  
import { StyleSheet, View } from "react-native";
import { FavoriteProvider } from './components/Redux/FavoriteContext';
import Header from "./components/Header";
import ListShop from "./components/ListShop";
import FavoriteList from "./components/FavoriteList";
import DetailArt from './components/Screen/DetailArt';  
import Icon from "react-native-vector-icons/FontAwesome";

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();  


function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: { backgroundColor: '#edefee' },
        tabBarActiveTintColor: '#f4ce14',
        tabBarInactiveTintColor: '#080808',
      }}
    >
      <Tab.Screen 
        name="Shop" 
        component={ListShop} 
        options={{
          tabBarIcon: ({ color, size }) => (
            <Icon name="shopping-bag" size={size} color={color} />
          ),
        }} 
      />
      <Tab.Screen 
        name="FavoriteList" 
        component={FavoriteList} 
        options={{
          tabBarIcon: ({ color, size }) => (
            <Icon name="heart" size={size} color={color} />
          ),
        }} 
      />
    </Tab.Navigator>
  );
}


export default function App() {
  return (
    <FavoriteProvider>
      <NavigationContainer>
        <View style={styles.container}>
          <Header />
          <Stack.Navigator>
            <Stack.Screen name="HomeTabs" component={TabNavigator} options={{ headerShown: false }} />
            <Stack.Screen name="DetailArt" component={DetailArt} options={{ title: 'Art Detail' }} />
          </Stack.Navigator>
        </View>
      </NavigationContainer>
    </FavoriteProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
