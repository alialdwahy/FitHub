import React from 'react';
import { Text, StyleSheet, View } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { COLORS } from '../../constant';

const Title: React.FC = () => {
  return ( 
    <View >
  <Text style={styles.title}>Build Your Fitness</Text>
  <Text style={styles.subtitle}>Make your workout plan and run through it, the result will be awesome!</Text>
  </View>
  );
};

const styles = StyleSheet.create({

  title: {
    fontSize: wp('7%'),
    color: COLORS.white,
    textAlign: 'left',
    marginBottom: hp('1%'),
    width: '100%',
    
  },
  subtitle: {
    fontSize: wp('4%'),
    color: COLORS.lightGray,
    textAlign: 'left',
    // width: '100%',
    flexWrap: "wrap",
  
  },
});

export default Title;
