import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import { AppContaioner } from '../../components'
import { COLORS } from '../../constant';
import EStyleSheet from 'react-native-extended-stylesheet';

export default function ApprovalCenter() {
  return (
    <AppContaioner
      title={'Welcome Back'}
      subTitle={'Kimberly Jones'}
      subTitleStyle={{color: COLORS.lightGray, fontSize: 15}}
      subTitle2Style={{color: COLORS.black, fontSize: 18}}
      isShowRight={true}
      rightIcon={'notifications'}
      leftIcon={'account-circle'}
      leftButtonOnPress={() => {
        console.log('leftButtonOnPress');
      }}
      headerHeight={'20%'}
      onPressLeft={() => {
        console.log('onPressLeft');
      }}
      onPressRight={() => {
        console.log('onPressRight');
      }}
      disableButton={false}
      buttonTitle={'Next'}
      onClick={() => {
        console.log('onclick');
      }}>
      <View style={styles.container}>
        <Text>Approval Center</Text>
      </View>
    </AppContaioner>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});