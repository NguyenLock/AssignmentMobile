import React from 'react';
import { View, Text, Image, StyleSheet, FlatList } from 'react-native';

export default function DetailArt({ route }) {
  const { item } = route.params; 

  const renderComment = ({ item }) => (
    <View style={styles.comment}>
      <Text style={styles.commentName}>{item.name}</Text>
      <Text style={styles.commentRating}>Rating: {item.rating}⭐</Text>
      <Text>{item.comment}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Image source={{ uri: item.image }} style={styles.image} />
      <Text style={styles.title}>{item.artName}</Text>
      <Text style={styles.price}>Price: ${item.price}</Text>
      <Text style={styles.description}>{item.description}</Text>
      <Text style={styles.brand}>Brand: {item.brand}</Text>
      {item.limitedTimeDeal > 0 && (
        <Text style={styles.deal}>Limited Time Deal: {item.limitedTimeDeal * 100}% off</Text>
      )}

      <Text style={styles.commentHeader}>Comments:</Text>
      <FlatList
        data={item.commentArt}
        renderItem={renderComment}
        keyExtractor={(comment, index) => index.toString()}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#fff',
  },
  image: {
    width: '100%',
    height: 200,
    resizeMode: 'contain',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 10,
  },
  price: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 5,
  },
  description: {
    fontSize: 16,
    marginVertical: 10,
  },
  brand: {
    fontSize: 16,
    fontStyle: 'italic',
  },
  deal: {
    fontSize: 16,
    color: 'red',
    marginVertical: 5,
  },
  commentHeader: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 20,
  },
  comment: {
    marginTop: 10,
    padding: 10,
    backgroundColor: '#f9f9f9',
    borderRadius: 5,
  },
  commentName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  commentRating: {
    fontSize: 14,
    color: '#888',
  },
});
