import React, { useState, useEffect } from 'react';
import { FlatList, StyleSheet } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import CardList from './Atoms/CardList';
import { useFavorites } from './Redux/FavoriteContext';
import AsyncStorage from '@react-native-async-storage/async-storage';

const API_URL = 'https://668d4d89099db4c579f2807a.mockapi.io/api/v1/favoritelist';

export default function ListShop() {
  const [data, setData] = useState([]);
  const { favorites, toggleFavorite, loadFavorites } = useFavorites();

  const fetchData = async () => {
    try {
      const response = await fetch(API_URL);
      const jsonData = await response.json();
      setData(jsonData);
      await AsyncStorage.setItem('shopData', JSON.stringify(jsonData));
    } catch (error) {
      console.error('Error fetching data:', error);
      const storedData = await AsyncStorage.getItem('shopData');
      if (storedData) {
        setData(JSON.parse(storedData));
      }
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

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
      productPrice={`$${item.price}`}
      onPress={() => alert(`${item.artName} clicked!`)}
      isFavorite={favorites.some(fav => fav.id === item.id)}
      onFavoritePress={() => toggleFavorite(item)}
    />
  );

  return (
    <FlatList
      data={data}
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