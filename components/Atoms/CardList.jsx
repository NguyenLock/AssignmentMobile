import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
import Icon from 'react-native-vector-icons/FontAwesome';

export default function CardList({id, productName, imageUrl, productPrice, onPress, isFavorite, onFavoritePress}) {
  return (
   <View style={styles.card}>
    <View style={styles.imageContainer}>
      <Image source={{uri: imageUrl}} resizeMode='contain' style={styles.productImage}/>
      <TouchableOpacity style={styles.favoriteButton} onPress={() => onFavoritePress(id)}>
        <Icon name={isFavorite ? "heart" : "heart-o"} size={24} color="red" />
      </TouchableOpacity>
    </View>
    <Text style={styles.productName}>
        {productName}
    </Text>
    <Text style={styles.price}>
        {productPrice}
    </Text>
    <TouchableOpacity style={styles.detailButton} onPress={onPress}>
        <Text style={styles.buttonText}>Detail</Text>
    </TouchableOpacity>
   </View>
  )
}

const styles = StyleSheet.create({
    card:{
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 5,
        elevation: 3,
        marginTop: 20,
        flex:1,
        marginHorizontal:5,
        maxWidth:'48%'
    },
    imageContainer: {
        position: 'relative',
    },
    productImage:{
        width:'100%',
        height:150,
        borderRadius:10
    },
    favoriteButton: {
        position: 'absolute',
        top: 10,
        right: 10,
        backgroundColor: 'rgba(255, 255, 255, 0.7)',
        borderRadius: 15,
        padding: 5,
    },
    productName:{
        fontSize:16,
        fontWeight:'bold',
        marginVertical:10
    },
    price:{
        fontSize:15,
        fontWeight:'bold',
        color:'black',
        marginBottom:10,
    },
    detailButton:{
        backgroundColor:"#f4ce14",
        paddingVertical:10,
        borderRadius:5,
        alignItems:"center"
    },
    buttonText:{
        color:'#fff',
        fontSize:16,
        fontWeight:'bold'
    }
})