import React from 'react';
import { View, FlatList, StyleSheet, Text, TouchableOpacity, Alert } from 'react-native';
import { useFavorites } from './Redux/FavoriteContext'; 
import CardList from './Atoms/CardList';
import Icon from 'react-native-vector-icons/FontAwesome'; 

export default function FavoriteList({ navigation }) {
  const { favorites, toggleFavorite, clearFavorites } = useFavorites();  

  const handleClearFavorites = () => {
    Alert.alert(
      "Clear All Favorites",
      "Are you sure you want to remove all items from your favorites?",
      [
        { text: "Cancel", style: "cancel" },
        { text: "OK", onPress: clearFavorites }  
      ]
    );
  };

  const renderItem = ({ item }) => (
    <CardList
      id={item.id}
      productName={item.artName}
      imageUrl={item.image}
      productPrice={item.price}
      onPress={() => navigation.navigate('DetailArt', { item })} 
      isFavorite={true}
      onFavoritePress={() => toggleFavorite(item)} 
      limitedTimeDeal={item.limitedTimeDeal}
      glassSurface={item.glassSurface}
    />
  );

  return (
    <View style={styles.container}>
      {favorites.length > 0 ? (
        <>
          <FlatList
            data={favorites}
            renderItem={renderItem}
            keyExtractor={item => item.id}
            numColumns={2}
            contentContainerStyle={styles.listContainer}
          />
          
          <TouchableOpacity 
            style={styles.floatingButton} 
            onPress={handleClearFavorites}
          >
            <Icon name="trash" size={24} color="white" />
          </TouchableOpacity>
        </>
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
  floatingButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    backgroundColor: '#f00',
    borderRadius: 50,
    width: 60,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
  },
});