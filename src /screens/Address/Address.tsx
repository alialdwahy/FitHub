// Address.tsx
import React from 'react';
import { Text, View, StyleSheet, Image, FlatList, TouchableOpacity, Linking } from 'react-native';
import { COLORS } from '../../constant';

interface Address {
  id: string;
  name: string;
  address: string;
  latitude: number;
  longitude: number;
  image: string; // URL to the image
}

const addresses: Address[] = [
  { id: '1', name: 'FitHub Gym A  ', address: '123 Street', latitude: 37.78825, longitude: -122.4324, image: 'https://via.placeholder.com/80' },
  { id: '2', name: 'FitHub Gym B ', address: '456 Avenue', latitude: 37.78925, longitude: -122.4334, image: 'https://via.placeholder.com/80' },
  { id: '3', name: 'FitHub Gym C ', address: '789 Boulevard', latitude: 37.79025, longitude: -122.4344, image: 'https://via.placeholder.com/80' },
  { id: '4', name: 'FitHub Gym D ', address: '101 Road', latitude: 37.79125, longitude: -122.4354, image: 'https://via.placeholder.com/80' },
  { id: '5', name: 'FitHub Gym E ', address: '202 Lane', latitude: 37.79225, longitude: -122.4364, image: 'https://via.placeholder.com/80' },
  { id: '6', name: 'FitHub Gym F ', address: '303 Drive', latitude: 37.79325, longitude: -122.4374, image: 'https://via.placeholder.com/80' },
  { id: '7', name: 'FitHub Gym G ', address: '404 Place', latitude: 37.79425, longitude: -122.4384, image: 'https://via.placeholder.com/80' },
  { id: '8', name: 'FitHub Gym H ', address: '505 Court', latitude: 37.79525, longitude: -122.4394, image: 'https://via.placeholder.com/80' },
  { id: '9', name: 'FitHub Gym I ', address: '606 Square', latitude: 37.79625, longitude: -122.4404, image: 'https://via.placeholder.com/80' },
  { id: '10', name: 'FitHub Gym J ', address: '707 Plaza', latitude: 37.79725, longitude: -122.4414, image: 'https://via.placeholder.com/80' },
  // Add more addresses if needed
];

export default function Address()  {
  const handleOpenGoogleMaps = (latitude: number, longitude: number) => {
    const url = `https://www.google.com/maps/dir/?api=1&destination=${latitude},${longitude}`;
    Linking.openURL(url);
  };

  const renderItem = ({ item }: { item: Address }) => (
    <TouchableOpacity style={styles.item} onPress={() => handleOpenGoogleMaps(item.latitude, item.longitude)}>
      <Image source={{ uri: item.image }} style={styles.image} />
      <View style={styles.textContainer}>
        <Text style={styles.name}>{item.name}</Text>
        <Text>{item.address}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
        <View style={styles.header}>
        <Text style={styles.headerText}>FitHub Locations</Text>
      </View>
      <FlatList
        data={addresses}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  
  },
  header: {
    backgroundColor: COLORS.colorPrim, // Green background
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  headerText: {
    fontSize: 20,
    color: '#fff',
    fontWeight: 'bold',
  },
  item: {
    flexDirection: 'row',
    padding: 16,
    marginBottom: 8,
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
    alignItems: 'center',
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 8,
    marginRight: 16,
  },
  textContainer: {
    flex: 1,
  },
  name: {
    fontWeight: 'bold',
  },
});

