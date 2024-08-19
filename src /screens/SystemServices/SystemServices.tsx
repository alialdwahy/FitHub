import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import { AppContaioner } from '../../components'

export default function Scan() {
  return (
    <AppContaioner>
      <View style={styles.container}>
        <Text>System and Services</Text>
      </View>
    </AppContaioner>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems:'center'
  }
})