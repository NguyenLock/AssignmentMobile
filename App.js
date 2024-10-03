import React from 'react';
import { StyleSheet, View } from "react-native";
import Header from "./components/Header";
import ListShop from "./components/ListShop";
import FavoriteList from "./components/FavoriteList";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Icon from "react-native-vector-icons/FontAwesome";
import { FavoriteProvider } from './components/Redux/FavoriteContext';

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <FavoriteProvider>
      <NavigationContainer>
        <View style={styles.containerHeader}>
          <Header />
          <Tab.Navigator 
          screenOptions={{
            headerShown: false,
            tabBarStyle:{backgroundColor: '#edefee'},
            tabBarActiveTintColor: '#f4ce14',
            tabBarInactiveTintColor: '#080808',
          }}>
            <Tab.Screen 
              name="Shop" 
              component={ListShop} 
              options={{
                tabBarIcon: ({color, size}) => (
                  <Icon name="shopping-bag" size={size} color={color} />
                )
              }} 
            />
            <Tab.Screen 
              name="FavoriteList" 
              component={FavoriteList} 
              options={{
                tabBarIcon: ({color, size}) => (
                  <Icon name="heart" size={size} color={color} />
                )
              }}
            />
          </Tab.Navigator>
        </View>
      </NavigationContainer>
    </FavoriteProvider>
  );
}

const styles = StyleSheet.create({
  containerHeader: {
    flex: 1,
  },
});