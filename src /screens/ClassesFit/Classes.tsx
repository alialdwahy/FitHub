// Classes.tsx
import React from 'react';
import { View, Text, StyleSheet, Image, FlatList, TouchableOpacity, Linking, Alert } from 'react-native';
import { GymClass } from '../../types/genericTypes'; // Import the GymClass type
import { COLORS } from '../../constant';

const classesData: GymClass[] = [
  { id: '1', name: 'Yoga Class', description: 'A relaxing yoga session to improve flexibility.', image: 'https://via.placeholder.com/80', price: '$30' },
  { id: '2', name: 'Spin Class', description: 'High-intensity cycling workout for cardio fitness.', image: 'https://via.placeholder.com/80', price: '$25' },
  { id: '3', name: 'Pilates', description: 'Core strengthening exercises for improved posture.', image: 'https://via.placeholder.com/80', price: '$35' },
  { id: '4', name: 'Zumba', description: 'Dance-based fitness class for a fun workout.', image: 'https://via.placeholder.com/80', price: '$20' },
  { id: '5', name: 'HIIT', description: 'High-Intensity Interval Training for maximum calorie burn.', image: 'https://via.placeholder.com/80', price: '$40' },
  { id: '6', name: 'CrossFit', description: 'Intense workout combining cardio, weightlifting, and bodyweight exercises.', image: 'https://via.placeholder.com/80', price: '$50' },
  { id: '7', name: 'Boxing', description: 'Boxing workouts for strength and conditioning.', image: 'https://via.placeholder.com/80', price: '$45' },
  { id: '8', name: 'Barre', description: 'Combination of ballet, Pilates, and yoga for a full-body workout.', image: 'https://via.placeholder.com/80', price: '$30' },
  { id: '9', name: 'Kickboxing', description: 'Martial arts-inspired workout to build strength and endurance.', image: 'https://via.placeholder.com/80', price: '$35' },
  { id: '10', name: 'Stretching', description: 'Guided stretching to improve flexibility and recovery.', image: 'https://via.placeholder.com/80', price: '$25' },
  // Add more classes if needed
];

const handlePayment = (className: string, price: string) => {
  Alert.alert(
    'Subscribe and Pay',
    `Do you want to subscribe to ${className} for ${price}?`,
    [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Pay Now', onPress: () => handlePaymentOptions(className, price) },
    ],
    { cancelable: false }
  );
};


const handlePaymentOptions = (className: string, price: string) => {
  Alert.alert(
    'Payment Options',
    `Choose your payment method for ${className} costing ${price}.`,
    [
      { text: 'Apple Pay', onPress: () => handleApplePay() },
      { text: 'STC Pay', onPress: () => handleSTCPay() },
      { text: 'Card Payment', onPress: () => handleCardPayment() },
      { text: 'Cancel', style: 'cancel' },
    ],
    { cancelable: false }
  );
};


const handleApplePay = () => {
  Alert.alert('Apple Pay', 'Apple Pay payment process is not implemented.');
};

const handleSTCPay = () => {
  Alert.alert('STC Pay', 'STC Pay payment process is not implemented.');
};

const handleCardPayment = () => {
  Alert.alert('Card Payment', 'Card payment process is not implemented.');
};

export default function Classes(): React.JSX.Element {
  const renderItem = ({ item }: { item: GymClass }) => (
    <TouchableOpacity style={styles.item} onPress={() => handlePayment(item.name, item.price)}>
      <Image source={{ uri: item.image }} style={styles.image} />
      <View style={styles.textContainer}>
        <Text style={styles.name}>{item.name}</Text>
        <Text>{item.description}</Text>
        <Text style={styles.price}>{item.price}</Text>
      </View>
    </TouchableOpacity>
  );

  return (

      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerText}>FitHub Classes</Text>
        </View>
        <FlatList
          data={classesData}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
        />
      </View>
  
  );
}

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
  price: {
    marginTop: 8,
    fontSize: 16,
    color: '#4CAF50', // Green for price
    fontWeight: 'bold',
  },
});
