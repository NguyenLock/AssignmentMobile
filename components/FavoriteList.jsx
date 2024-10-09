import React from 'react';
import { View, FlatList, StyleSheet, Text } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { useFavorites } from './Redux/FavoriteContext';
import CardList from './Atoms/CardList';
export default function FavoriteList({ navigation }) {
  const { favorites, toggleFavorite, loadFavorites } = useFavorites();

  useFocusEffect(
    React.useCallback(() => {
      loadFavorites();
    }, [])
  );

  const renderItem = ({ item }) => (
    <CardList
      id={item.id}
      productName={item.artName}
      imageUrl={item.image}
      productPrice={`$${item.price}` || 'No price available'}
      onPress={() => navigation.navigate('DetailArt', { item })} 
      isFavorite={true}
      onFavoritePress={() => toggleFavorite(item)}
    />
  );

  return (
    <View style={styles.container}>
      {favorites.length > 0 ? (
        <FlatList
          data={favorites}
          renderItem={renderItem}
          keyExtractor={item => item.id}
          numColumns={2}
          contentContainerStyle={styles.listContainer}
        />
      ) : (
        <Text style={styles.emptyText}>No favorite items yet.</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  listContainer: {
    paddingBottom: 20,
  },
  emptyText: {
    fontSize: 18,
    textAlign: 'center',
    marginTop: 50,
  },
});