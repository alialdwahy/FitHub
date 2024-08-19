import React from 'react';
import { 
  SafeAreaView,
  StatusBar,
  View, 
} from 'react-native';

import { COLORS } from '../constant';
import TitleComponent from './TitleComponent';
import EStyleSheet from 'react-native-extended-stylesheet';

const AppContainer = (props: any) => {
  return (
    <SafeAreaView style={styles.safeView}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.black} />
      <View style={styles.container}>
        <TitleComponent
          accessibleLeft={props.accessibleLeft}
          accessibilityLabelLeft={props.accessibilityLabelLeft}
          accessibilityHintLeft={props.accessibilityHintLeft}
          title={props.title}
          subTitle={props.subTitle ? props.subTitle : ''}
          leftIcon={props.leftIcon}
          headerHeight={props.headerHeight}
          rightIcon={props.rightIcon}
          subTitleStyle={props.subTitleStyle}
          subTitle2Style={props.subTitle2Style}
          rightButtonOnPress={() => {
            if (props.onPressRight) {
              console.log('right btn clicked');
              // props.onPressRight();
            } else {
              console.log('right btn clicked negative');
              //navigate(navigation, routerName.ContactUs, {hideTabBar: true});
              // Actions.ContactUs({ hideTabBar: true });
            }
          }}
          leftButtonOnPress={() => console.log('left button clicked')}
        />
        {props.children}
      </View>
    </SafeAreaView>
  );
};
 

const styles = EStyleSheet.create({
  safeView: {backgroundColor: '#fff', flex: 1},
  container: {
    flex: 1,
    backgroundColor: '$backgroundColor',
  },
  shadowColor: '#000',
  shadowOffset: {
    width: 0,
    height: 5,
  },
  shadowOpacity: 0.34,
  shadowRadius: 6.27,

  elevation: 10,
});

export default AppContainer;
