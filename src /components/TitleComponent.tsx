import React from 'react';
import { TouchableOpacity, View, Text } from 'react-native';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons'
import EStyleSheet from 'react-native-extended-stylesheet'; 
//Resource

import { COLORS, SIZES } from '../constant';
//Others

 const  TitleComponent =  (props: any) => {
 
  const { title, leftButtonOnPress, rightIcon, rightButtonOnPress, leftIcon, subTitle, subTitle2, headerHeight, subTitleStyle, subTitle2Style, headerBackgroundColor, mainTitleStyle, titleColor,
  
  } = props;
     
    return (
      <View style={styles.header}>
        {leftIcon && (
          <TouchableOpacity
            style={styles.leftIconBody}
            onPress={() => {
              leftButtonOnPress
                ? leftButtonOnPress()
                : console.log('lieft icon clicked'); //Actions.pop();
            }}>
            <MaterialIcon name={leftIcon} size={SIZES.TabIconSize} />
          </TouchableOpacity>
        )}

        {title && (
          <View
            style={[
              styles.titleBody,
              !props.subTitle && {alignItems: 'center'},
            ]}>
            <Text style={props.subTitleStyle}>{title}</Text>
            {props.subTitle && (
              <Text style={props.subTitle2Style}>{subTitle}</Text>
            )}
          </View>
        )}

        {rightIcon && (
          <View style={styles.rightBody}>
            <TouchableOpacity
              style={styles.header_back_container}
              onPress={() => {
                rightButtonOnPress();
              }}>
              <MaterialIcon name={rightIcon} size={SIZES.TabIconSize} />
            </TouchableOpacity>
          </View>
        )}
      </View>
    );
  }
export default TitleComponent;
const styles = EStyleSheet.create({
  header: {
    height: SIZES.height / 10,
    alignItems: 'center',
    width: '100%',
    zIndex: 1,
    flexDirection: 'row',
    backgroundColor: '$white',
    justifyContent: 'space-between',
  },
  leftIconBody: {
    width: '15%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  titleBody: {
    flex: 1,
    height: SIZES.height / 10,
    justifyContent: 'center',
  },
  rightBody: {
    height: '100%',
    width: '15%',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
