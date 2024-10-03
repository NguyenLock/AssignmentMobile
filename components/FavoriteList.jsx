import React from 'react';
import { View, FlatList, StyleSheet, Text } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import CardList from './Atoms/CardList';
import { useFavorites } from './Redux/FavoriteContext';

export default function FavoriteList() {
  const { favorites, toggleFavorite, loadFavorites } = useFavorites();

  useFocusEffect(
    React.useCallback(() => {
      loadFavorites();
    }, [])
  );

  const renderItem = ({ item }) => (
    <CardList
      id={item.id}
      productName={item.productName}
      imageUrl={item.imageUrl}
      productPrice={item.productPrice || 'No price available'}
      onPress={() => alert(`${item.productName} clicked!`)}
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