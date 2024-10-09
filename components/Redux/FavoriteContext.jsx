import React, { createContext, useState, useContext, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const FavoriteContext = createContext();

export const FavoriteProvider = ({ children }) => {
  const [favorites, setFavorites] = useState([]);

  
  useEffect(() => {
    loadFavorites();
  }, []);

 
  const loadFavorites = async () => {
    try {
      const storedFavorites = await AsyncStorage.getItem('favorites');
      if (storedFavorites !== null) {
        setFavorites(JSON.parse(storedFavorites));
      }
    } catch (error) {
      console.error('Error loading favorites', error);
    }
  };

  
  const saveFavorites = async (newFavorites) => {
    try {
      await AsyncStorage.setItem('favorites', JSON.stringify(newFavorites));
      setFavorites(newFavorites);
    } catch (error) {
      console.error('Error saving favorites', error);
    }
  };

  
  const toggleFavorite = (product) => {
    const index = favorites.findIndex(fav => fav.id === product.id);
    let newFavorites;
    if (index >= 0) {
      newFavorites = favorites.filter(fav => fav.id !== product.id);
    } else {
      newFavorites = [...favorites, product];
    }
    saveFavorites(newFavorites);  
  };

  
  const clearFavorites = async () => {
    try {
      await AsyncStorage.removeItem('favorites');  
      setFavorites([]);  
    } catch (error) {
      console.error('Error clearing favorites', error);
    }
  };

  return (
    <FavoriteContext.Provider value={{ favorites, toggleFavorite, loadFavorites, clearFavorites }}>
      {children}
    </FavoriteContext.Provider>
  );
};

export const useFavorites = () => useContext(FavoriteContext);
