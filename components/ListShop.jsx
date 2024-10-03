import React from 'react';
import { FlatList, StyleSheet } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import CardList from './Atoms/CardList';
import { useFavorites } from './Redux/FavoriteContext';

const DATA = [
  {
    id: '1',
    productName: 'Product 1',
    productPrice: '100000',
    imageUrl: 'https://m.media-amazon.com/images/I/61I8rKtZE0L._AC_SX679_.jpg',
  },
  {
    id: '2',
    productName: 'Product 2',
    productPrice: '200000',
    imageUrl: 'https://m.media-amazon.com/images/I/61I8rKtZE0L._AC_SX679_.jpg',
  },
  {
    id: '3',
    productName: 'Product 3',
    productPrice: '300000',
    imageUrl: 'https://m.media-amazon.com/images/I/61I8rKtZE0L._AC_SX679_.jpg',
  },
  {
    id: '4',
    productName: 'Product 4',
    productPrice: '400000',
    imageUrl: 'https://m.media-amazon.com/images/I/61I8rKtZE0L._AC_SX679_.jpg',
  },
  {
    id: '5',
    productName: 'Product 5',
    imageUrl: 'https://m.media-amazon.com/images/I/61I8rKtZE0L._AC_SX679_.jpg',
  },
];

export default function ListShop() {
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
      isFavorite={favorites.some(fav => fav.id === item.id)}
      onFavoritePress={() => toggleFavorite(item)}
    />
  );

  return (
    <FlatList
      data={DATA}
      renderItem={renderItem}
      keyExtractor={item => item.id}
      numColumns={2}
      contentContainerStyle={styles.container}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
});