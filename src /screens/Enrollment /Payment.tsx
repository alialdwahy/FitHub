import React,{useState} from 'react';
import { View, Text, Button, TouchableOpacity, StyleSheet, Image, TextInput, Alert } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import ServiceMaster from '../../api/networkApi/ServiceMaster';


export default function PaymentScreen(): React.JSX.Element {
  const route = useRoute();
  const { className, price, id } = route.params as { className: string, price: string, id: string };
  const navigation = useNavigation();  // Access the navigation prop
  const [paymentMethod, setPaymentMethod] = useState(''); // state to track selected payment method
  const [loading, setLoading] = useState(false);


    // Function to handle payment method selection
    const handlePaymentMethodSelection = (method: string) => {
        setPaymentMethod(method);
      }; 
      const handlingEnroll = async () => {
        setLoading(true); 
              // navigation.navigate('Home');
               
              try {
                const response =  await ServiceMaster.classEnroll(id)
                console.log('Full response:', response);

                if (Array.isArray(response)) {
                  response.forEach((item, index) => {
                    console.log(`Response item ${index}:`, item);
                  });
                }

                const data = response?.[1]; // Adjust if response structure is different
                console.log('payment value --------------->', data)
                
                setLoading(false);
              Alert.alert('Enroll Successful', 'You have successfully Enroll!', [
                {
                  text: 'OK',
                  // onPress: () => navigation.navigate(''),
                },
              ]);
              }catch(error) {
                setLoading(false);
                // Log the error details
    console.error('Enrollment Error:', error);

    // Show error alert
    Alert.alert('Enrollment Failed', 'There was an error during enrollment. Please try again later.');
              
              }
      };

  return (
    <View style={styles.container}>
      {/* Card for class details */}
      <View style={styles.card}>
        <Text style={styles.classTitle}>{className}</Text>
        <Text style={styles.price}>Price: {price} SR</Text>
      </View>

      <Text style={styles.title}>Select Payment Method:</Text>

 
      {/* Custom Radio Buttons */}
      <View style={styles.radioContainer}>
        <TouchableOpacity
          style={styles.radioOption}
          onPress={() => handlePaymentMethodSelection('creditCard')}
        >
          <View
            style={[
              styles.radioCircle,
              paymentMethod === 'creditCard' && styles.radioCircleSelected,
            ]}
          />
          <Text style={styles.radioText}>Credit Card</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.radioOption}
          onPress={() => handlePaymentMethodSelection('applePay')}
        >
          <View
            style={[
              styles.radioCircle,
              paymentMethod === 'applePay' && styles.radioCircleSelected,
            ]}
          />
          <Text style={styles.radioText}>Apple Pay</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.radioOption}
          onPress={() => handlePaymentMethodSelection('stcPay')}
        >
          <View
            style={[
              styles.radioCircle,
              paymentMethod === 'stcPay' && styles.radioCircleSelected,
            ]}
          />
          <Text style={styles.radioText}>STC Pay</Text>
        </TouchableOpacity>
      </View>

      {/* Conditionally render form based on payment method */}
      {paymentMethod === 'creditCard' && (
        <View style={styles.formContainer}>
          <TextInput style={styles.input} placeholder="Card Number" keyboardType="numeric" />
          <TextInput style={styles.input} placeholder="Account Holdear " />
          <TextInput style={styles.input} placeholder="Expiration Date (MM/YY)" />
          <TextInput style={styles.input} placeholder="CVV" secureTextEntry />
        </View>
      )}

{paymentMethod === 'applePay' && (
        <View style={styles.applePayContainer}>
          <TouchableOpacity style={styles.applePayButton}  onPress={() => {
            handlingEnroll()
            // Add payment confirmation logic
          }}>
            <Text style={styles.applePayText}>Apple Pay</Text>
          </TouchableOpacity>
        </View>
      )}

      {paymentMethod === 'stcPay' && (
        <View style={styles.stcPayContainer}>
          <TouchableOpacity style={styles.stcPayButton}  onPress={() => {
            handlingEnroll()
            // Add payment confirmation logic
          }}>
            <Text style={styles.stcPayText}>STC Pay</Text>
          </TouchableOpacity>
        </View>
      )}

      {/* Conditionally render Confirm Button only if paymentMethod is not Apple Pay or STC Pay */}
      {paymentMethod !== 'applePay' && paymentMethod !== 'stcPay' && (
        <TouchableOpacity
          style={[
            styles.confirmButton,
            paymentMethod === 'applePay' ? styles.applePayStyle : {},
            paymentMethod === 'stcPay' ? styles.stcPayStyle : {},
          ]}
          onPress={() => {
            handlingEnroll()
            // Add payment confirmation logic
          }}
        >
          <Text style={styles.confirmText}>Confirm Payment</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f8f8f8',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
    marginBottom: 20,
  },
  classTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  price: {
    fontSize: 18,
    color: '#5EBD3E',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  radioContainer: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    marginBottom: 5,
  },
  radioOption: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 20,
    marginBottom: 15,
  },
  radioCircle: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#007AFF',
    marginRight: 10,
  },
  radioCircleSelected: {
    backgroundColor: '#000',
  },
  radioText: {
    fontSize: 16,
  },
  formContainer: {
    marginTop: 20,
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  applePayContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
  applePayButton: {
    backgroundColor: '#000',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    width: '100%',
  },
  applePayText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  stcPayContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
  stcPayButton: {
    backgroundColor: '#5EBD3E',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    width: '100%',
  },
  stcPayText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  confirmButton: {
    backgroundColor: '#007AFF',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
  },
  confirmText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  applePayStyle: {
    backgroundColor: '#000',
  },
  stcPayStyle: {
    backgroundColor: '#5EBD3E',
  },
});
