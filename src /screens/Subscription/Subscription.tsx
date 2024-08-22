import React, { useState } from 'react';
import { View, Text, Button, FlatList, Modal, TouchableOpacity, StyleSheet } from 'react-native';

const subscriptions = [
  { id: '1', type: 'Gym', name: 'Basic Gym Membership', expiryDate: '2024-08-01' },
  { id: '2', type: 'Teacher', name: 'Teacher Subscription', expiryDate: '2024-08-15' },
  { id: '3', type: 'Class', name: 'Yoga Class Subscription', expiryDate: '2024-08-30' },
];

const subscriptionTypes = [
    { id: '1', type: 'normal', price: '$25' },
  { id: '2', type: 'Primary', price: '$50' },
  { id: '3', type: 'VIP', price: '$100' },
];

const Subscription: React.FC = ({ navigation }:any) => {
  const [isModalVisible, setModalVisible] = useState(false);
  const [selectedType, setSelectedType] = useState<string | null>(null);

  const handleSelectType = (type: string) => {
    setSelectedType(type);
    setModalVisible(false);
    navigation.navigate('Payment');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Your Subscriptions</Text>
      <FlatList
        data={subscriptions}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.subscriptionItem}>
            <Text>{item.name}</Text>
            <Text>Expires on: {item.expiryDate}</Text>
          </View>
        )}
      />
      <Button title="New Subscription" onPress={() => setModalVisible(true)} />
      <Button title="Renew Subscription" onPress={() => setModalVisible(true)} />

      <Modal
        transparent={true}
        visible={isModalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <Text>Select Subscription Type</Text>
          {subscriptionTypes.map((type) => (
            <TouchableOpacity key={type.id} onPress={() => handleSelectType(type.type)}>
              <Text style={styles.modalItem}>{type.type} - {type.price}</Text>
            </TouchableOpacity>
          ))}
          <Button title="Close" onPress={() => setModalVisible(false)} />
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  subscriptionItem: {
    marginBottom: 10,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalItem: {
    padding: 10,
    backgroundColor: 'white',
    marginBottom: 10,
    borderRadius: 5,
  },
});

export default Subscription;
