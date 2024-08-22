import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

// Define a type for the subscription types
type SubscriptionType = 'normal' | 'Primary' | 'VIP';

const subscriptionDetails: Record<SubscriptionType, string> = {
    normal: '$25',
  Primary: '$50',
  VIP: '$100',
};

interface PaymentScreenProps {
    route: {
      params: {
        type: SubscriptionType;
      };
    };
    navigation: any;
  }
  

const Payment: React.FC<PaymentScreenProps> = ({ route, navigation }) => {
  const { type } = route.params;

  // Type guard to ensure `type` is a valid key
  if (type !== 'Primary' && type !== 'VIP') {
    // Handle unexpected type value
    return (
      <View style={styles.container}>
        <Text>Invalid subscription type.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Payment Details</Text>
      <Text>Subscription Type: {type}</Text>
      <Text>Price: {subscriptionDetails[type]}</Text>
      <Button title="Pay Now" onPress={() => {
        // Handle payment logic here
        console.log('Payment successful for type:', type);
        navigation.goBack();
      }} />
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
    marginBottom: 20,
  },
});

export default Payment;
