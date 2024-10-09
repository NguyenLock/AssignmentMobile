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

  const renderHeader = () => (
    <View>
      <Image source={{ uri: item.image }} style={styles.image} />
      <Text style={styles.title}>{item.artName}</Text>
      <View style={styles.priceContainer}>
        {item.limitedTimeDeal > 0 ? (
          <>
            <Text style={styles.originalPrice}>${item.price.toFixed(2)}</Text>
            <Text style={styles.discountedPrice}>
              ${(item.price * (1 - item.limitedTimeDeal)).toFixed(2)}
            </Text>
            <Text style={styles.deal}>
              ({(item.limitedTimeDeal * 100).toFixed(0)}% off)
            </Text>
          </>
        ) : (
          <Text style={styles.price}>${item.price.toFixed(2)}</Text>
        )}
      </View>
      <Text style={styles.description}>{item.description}</Text>
      <Text style={styles.brand}>Brand: {item.brand}</Text>
      {item.glassSurface && (
        <Text style={styles.glassSurface}>Glass Surface: YES</Text>
      )}
      <Text style={styles.commentHeader}>Comments:</Text>
    </View>
  );

  return (
    <FlatList
      data={item.commentArt}
      renderItem={renderComment}
      keyExtractor={(comment, index) => index.toString()}
      ListHeaderComponent={renderHeader} 
      contentContainerStyle={styles.container}
    />
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
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
  },
  price: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  originalPrice: {
    fontSize: 18,
    fontWeight: 'bold',
    textDecorationLine: 'line-through',
    color: 'gray',
    marginRight: 5,
  },
  discountedPrice: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'red',
    marginRight: 5,
  },
  deal: {
    fontSize: 16,
    color: 'red',
  },
  description: {
    fontSize: 16,
    marginVertical: 10,
  },
  brand: {
    fontSize: 16,
    fontStyle: 'italic',
  },
  glassSurface: {
    fontSize: 16,
    color: 'green',
    marginTop: 5,
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