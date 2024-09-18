// Classes.tsx
import React, {useEffect, useState, useCallback} from 'react';
import { View, Text, StyleSheet, Image, FlatList, TouchableOpacity,  RefreshControl, SafeAreaView, ScrollView } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { COLORS } from '../../constant';
import { useDispatch } from 'react-redux';
import useClassController from '../../view-controller/useClassController';
import { ClassItemType, RootStackParamList } from '../../types/genericTypes';
import { useNavigation } from '@react-navigation/native';
import { screenMap } from '../../navigation/screenMap';



type ClassesScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Classes'>;



export default function Classes( ): React.JSX.Element {
  const dispatch = useDispatch();
  const { classData, getAllClassData  } = useClassController();
  const [dataAll, setDataAll] = useState<ClassItemType[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const navigation = useNavigation<ClassesScreenNavigationProp>();

  
  const handlePress = (id: string) => {
    navigation.navigate('Subscription', {screen: 'ClassDetails', params: {id} } );
    console.log('navigation ---------------------------------------->',id);


  };

    // Function to handle refreshing and calling API
    const onRefresh = useCallback(() => {
      setRefreshing(true);
      getAllClassData()
        .finally(() => setRefreshing(false));  // This ensures refreshing state is reset after API call
    }, [getAllClassData]); 
  
    useEffect(() => {
      setLoading(true);  
      if (classData) {
        setDataAll(classData);
        setLoading(false);
      }
    }, [dispatch, classData, ]);

  // console.log('data class ---------------> ', classData)
  
  const renderItem = ({ item }: { item: any }) => (
    
    <TouchableOpacity style={styles.item} onPress={() => handlePress(item?.id)} >
    
      <Image source={{ uri: item?.images }} style={styles.image} />
      <View style={styles.textContainer}>
        <Text style={styles.name}>{item?.name}</Text>
        <Text>{item?.description}</Text>
        <Text style={styles.price}>{item?.price} ريال</Text>
      </View>
    </TouchableOpacity>
    
  );


  return (
    <SafeAreaView style={styles.container}>
    <ScrollView
      contentContainerStyle={styles.scrollView}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      <View style={styles.header}>
        <Text style={styles.headerText}>FitHub Classes</Text>
      </View>
      
      <FlatList
        data={classData || []}
        renderItem={renderItem}
        keyExtractor={(item, index) => item?.id?.toString() || index.toString()}
        ListEmptyComponent={<Text>No classes available</Text>}
      />
    </ScrollView>
  </SafeAreaView>
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
  scrollView: {
    paddingBottom: 20, // Adjust as needed
  },
});
