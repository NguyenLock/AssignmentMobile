import React, { useState, useEffect } from 'react';
import { FlatList, StyleSheet, View, TextInput, TouchableOpacity, Text, Modal, ActivityIndicator } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { useFavorites } from './Redux/FavoriteContext';
import CardList from './Atoms/CardList';
import AsyncStorage from '@react-native-async-storage/async-storage';

const API_URL = 'https://668d4d89099db4c579f2807a.mockapi.io/api/v1/favoritelist';

export default function ListShop({ navigation }) { 
  const [data, setData] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');  
  const [selectedBrand, setSelectedBrand] = useState(''); 
  const [isModalVisible, setIsModalVisible] = useState(false);  
  const [loading, setLoading] = useState(true);  
  const { favorites, toggleFavorite, loadFavorites } = useFavorites();

  const fetchData = async () => {
    setLoading(true);  
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
    } finally {
      setLoading(false);  
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

  const filteredData = data.filter(item => {
    const matchesSearchQuery = item.artName.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesBrand = selectedBrand === '' || item.brand === selectedBrand;
    return matchesSearchQuery && matchesBrand;
  });

  const renderItem = ({ item }) => (
    <CardList
      id={item.id}
      productName={item.artName}
      imageUrl={item.image}
      productPrice={item.price}
      onPress={() => navigation.navigate('DetailArt', { item })} 
      isFavorite={favorites.some(fav => fav.id === item.id)}
      onFavoritePress={() => toggleFavorite(item)}
      limitedTimeDeal={item.limitedTimeDeal}
      glassSurface={item.glassSurface}
    />
  );

  const handleSelectBrand = (brand) => {
    setSelectedBrand(brand);
    setIsModalVisible(false);  
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.searchBar}
        placeholder="Search products..."
        value={searchQuery}
        onChangeText={text => setSearchQuery(text)}
      />

      <TouchableOpacity 
        style={styles.filterButton}
        onPress={() => setIsModalVisible(true)}
      >
        <Text style={styles.filterText}>
          {selectedBrand ? `Brand: ${selectedBrand}` : 'Filter by Brand'}
        </Text>
      </TouchableOpacity>

      <Modal
        visible={isModalVisible}
        transparent={true}
        animationType="slide"
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Select Brand</Text>
            <TouchableOpacity onPress={() => handleSelectBrand('')}>
              <Text style={styles.modalItem}>All Brands</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleSelectBrand('Arteza')}>
              <Text style={styles.modalItem}>Arteza</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleSelectBrand('Color Splash')}>
              <Text style={styles.modalItem}>Color Splash</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleSelectBrand('Edding')}>
              <Text style={styles.modalItem}>Edding</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleSelectBrand('KingArt')}>
              <Text style={styles.modalItem}>KingArt</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              onPress={() => setIsModalVisible(false)}
              style={styles.closeButton}
            >
              <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <FlatList
          data={filteredData}
          renderItem={renderItem}
          keyExtractor={item => item.id}
          numColumns={2}
          contentContainerStyle={styles.listContainer}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  searchBar: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  filterButton: {
    backgroundColor: '#eee',
    padding: 10,
    marginBottom: 10,
    borderRadius: 8,
  },
  filterText: {
    fontSize: 16,
    textAlign: 'center',
  },
  listContainer: {
    paddingBottom: 20,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    width: '80%',
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  modalItem: {
    fontSize: 16,
    paddingVertical: 10,
  },
  closeButton: {
    marginTop: 20,
    backgroundColor: '#f00',
    padding: 10,
    borderRadius: 5,
  },
  closeButtonText: {
    color: 'white',
    fontSize: 16,
  },
});