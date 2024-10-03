import { View, Text, StyleSheet } from 'react-native'
import React from 'react'

export default function Header() {
  return (
    <View style={styles.header}>
      <Text style={styles.title}>
        FavoriteList Shop
      </Text>
    </View>
  )
}

const styles = StyleSheet.create({
    header:{
        height: 80,
        paddingTop: 38,
        backgroundColor: '#f0f0f0'
    },
    title:{
        textAlign: 'center',
        color: '#333',
        fontSize: 20,
        fontWeight: 'bold',
    }

})