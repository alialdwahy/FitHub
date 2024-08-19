import React from 'react';
import { TextInput, StyleSheet, TextInputProps } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { scale, verticalScale, moderateScale } from 'react-native-size-matters';
interface InputFieldProps extends TextInputProps  {
  placeholder: string;
  secureTextEntry?: boolean;
  value: string;
  onChangeText: (text: string) => void;
}

const InputField: React.FC<InputFieldProps> = ({ placeholder, value, onChangeText,secureTextEntry = false }) => {
  return (
    <TextInput
      style={styles.input}
      placeholder={placeholder}
      value={value}
      placeholderTextColor="#aaa"
      onChangeText={onChangeText}
      secureTextEntry={secureTextEntry}
      autoCapitalize= "none"
    />
  );
};

const styles = StyleSheet.create({
  input: {
    width: '95%',
    height: verticalScale(40),
    backgroundColor: '#fff',
    paddingHorizontal: 10,
    borderRadius:10,
    fontSize: 15,
    marginBottom:  hp('1.5%'),
  },
});

export default InputField;
