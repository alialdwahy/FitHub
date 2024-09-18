import React, {useState, useEffect} from 'react';
import { View, Text, Image, Button, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import useClassController from '../../view-controller/useClassController';
import { ClassDetailsItemType, RootStackParamList } from '../../types/genericTypes';
import { useDispatch } from 'react-redux';
import { StackNavigationProp } from '@react-navigation/stack';

import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { COLORS } from '../../constant';
import Icon from 'react-native-vector-icons/Ionicons';



type ClassDetailsRouteProp = RouteProp<RootStackParamList, 'ClassDetails'>;

// Type for navigation prop in ClassDetails
type ClassDetailsScreenNavigationProp = StackNavigationProp<RootStackParamList, 'ClassDetails'>;

// Type for route prop in ClassDetails
type ClassDetailsScreenRouteProp = RouteProp<RootStackParamList, 'ClassDetails'>;
// Add types for route and navigation
type ClassDetailsProps = {
  route: ClassDetailsScreenRouteProp;
  navigation: ClassDetailsScreenNavigationProp;
};


export default function ClassDetails(): React.JSX.Element {


  const { classDetails, getClassDetails } = useClassController();
  const [dataAll, setDataAll] = useState<ClassDetailsItemType| null>(null);

  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  const route = useRoute<ClassDetailsRouteProp>();
  const { id } = route.params;

  
   // UseEffect to call getClassDetails with the correct id
  useEffect(() => {
    if (id) {
      setLoading(true); // Start loading before the request
      getClassDetails(id).finally(() => setLoading(false)); // Fetch class details by id
    }
  }, [id]); // Make sure `id` and `getClassDetails` are in the dependency array

  const selectedClass = classDetails?.find((cls) => cls.id === id?.toString());

  useEffect(() => {
    if (selectedClass) {
      setDataAll(selectedClass);
    }
  }, [selectedClass]);
 

  console.log('test test test ---------> ',selectedClass)

  const navigation = useNavigation();  // Access the navigation prop

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="arrow-back-outline" size={25} color="#000" style={{ marginLeft: 15 }} />
        </TouchableOpacity>
      ),
    });
  }, [navigation]);

  return (
    <ScrollView style={styles.container}>
       {/* <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Text style={styles.backButtonText}>Back</Text>
      </TouchableOpacity> */}
      <View style={styles.imageContainer}>
        <Image source={{ uri: selectedClass?.images }} style={styles.detailsImage} />
        {/* Price Badge */}
        <View style={styles.priceBadge}>
          <Text style={styles.priceText}>{selectedClass?.price} SR</Text>
        </View>
      </View>

      <View style={styles.infoContainer}>
        <Text style={styles.classTitle}>{selectedClass?.name}</Text>
        <View style={styles.separator} />

        <View style={styles.detailsCard}>
          <Text style={styles.teacher}>Instructor: {selectedClass?.teachername}</Text>
          <Text style={styles.description}>description: {selectedClass?.description}</Text>

          <View style={styles.dateContainer}>
            <Text style={styles.dateLabel}>Start Date:  </Text>
            <Text style={styles.dateValue}>
              {selectedClass?.startDate ? selectedClass.startDate.slice(0, 10) : 'N/A'}
            </Text>
          </View>

          <View style={styles.dateContainer}>
            <Text style={styles.dateLabel}>End Date:    </Text>
            <Text style={styles.dateValue}>
              {selectedClass?.endDate ? selectedClass.endDate.slice(0, 10) : 'N/A'}
            </Text>
          </View>

          {/* Subscription button */}
          <View style={styles.subscribeButton}>
            <Button 
              title="Subscribe Now"
              color="#FFF"
              onPress={() => navigation.navigate('PaymentScreen', {
                className: selectedClass?.name,
                price: selectedClass?.price,
                id: selectedClass?.id
                
              }) }
            />
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f8f8',
  },
  imageContainer: {
    width: '100%',
    height: '100%',  // Set a fixed height for the container

  },
  detailsImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  
  },
  priceBadge: {
    position: 'absolute',
    bottom: -15,
    right: 20,
    backgroundColor: '#FFF',
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  priceText: {
    color: 'green',
    fontWeight: 'bold',
    fontSize: 18,
  },
  infoContainer: {
    padding: 16,
  },
  classTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 18,
  },
  separator: {
    height: 1,
    backgroundColor: '#e0e0e0',
    marginBottom: 16,
  },
  detailsCard: {
    backgroundColor: '#FFF',
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  teacher: {
    fontSize: 18,
    color: '#555',
    marginBottom: 8,
  },
  description: {
    fontSize: 18,
    color: '#666',
    marginBottom: 16,
  },
  dateContainer: {
    flexDirection: 'row',
    // justifyContent: 'space-between',
    marginBottom: 10,
  },
  dateLabel: {
    fontSize: 16,
    color: '#777',
  },
  dateValue: {
    fontSize: 16,
    color: '#333',
    fontWeight: 'bold',
  },
  subscribeButton: {
    backgroundColor:COLORS.colorPrim,
    borderRadius: 10,
    marginTop: 15,
    paddingVertical: 8,
    alignItems: 'center',
  },
  backButton: {
    position: 'absolute',
    top: 50,  // Adjust as needed based on status bar height
    left: 20,
    zIndex: 1,  // Ensures the button stays on top
    backgroundColor: '#007AFF',
    padding: 10,
    borderRadius: 8,
  },
  backButtonText: {
    color: '#FFF',
    fontWeight: 'bold',
  },
});



