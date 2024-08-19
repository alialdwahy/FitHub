import React from 'react';
import {Text, StyleSheet, TouchableOpacity} from 'react-native';

interface EmpItemProps {
  onPress: () => void;
    empName: string;
    empAge: string,
    empSalary: string
}

const EmpItem = (props: EmpItemProps) => {
    const { onPress, empName, empAge, empSalary } = props;
    
    console.log(empName)
  return (
    <TouchableOpacity style={styles.todo} onPress={onPress}>
      <Text style={styles.title}>{empName}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  todo: {
    width: '100%',
    padding: 16,
    borderWidth: 1,
    borderColor: '#e7e7e7',
    borderRadius: 8,
        marginVertical: 4,
   // backgroundColor:'red'
  },
  title: {
    fontSize: 16,
    fontWeight: '400',
  },
});

export default EmpItem;
