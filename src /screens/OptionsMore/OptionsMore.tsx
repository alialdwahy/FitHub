import { View, Text, ScrollView, Image } from 'react-native'
import React from 'react'
import { AppContaioner } from '../../components'
import { COLORS, SIZES } from '../../constant';
import { Images } from '../../assets';

export default function Quest() {
  return (
    <AppContaioner
      title={'Mission & Vission'}
      //subTitle={'Kimberly Jones'}
      subTitleStyle={{color: COLORS.black, fontSize: 18}}
      subTitle2Style={{color: COLORS.black, fontSize: 18}}
      isShowRight={true}
      rightIcon={'checklist'}
      leftIcon={'arrow-back'}
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
      <ScrollView
        style={{
          flex: 1,
        }}>
        {/* Messsage form Minister */}

        <View
          style={{
            flex: 1,
            //flexDirection: 'column',
            padding: 10,
            marginTop: 20,
          }}>
          <Text
            style={{
              fontSize: SIZES.title,
              fontWeight: 'bold',
              marginBottom: 20,
            }}>
            Message from Minister
          </Text>
          <View
            style={{
              flex: 1,
              flexDirection: 'column',
              backgroundColor: '#FFF',
            }}>
            <Image
              source={Images.meissionVision1}
              resizeMode="cover"
              style={{width: SIZES.width - 20, height: 250}}
            />
            <Text
              style={{
                fontSize: SIZES.subtitle,
                fontWeight: 'bold',
                marginBottom: SIZES.base,
                margin: 20,
              }}>
              Title comes here
            </Text>
            <Text
              style={{
                fontSize: SIZES.font,
                marginBottom: SIZES.base,
                marginStart: 20,
                marginTop: 10,
                paddingBottom: 50,
              }}>
              Lorem ipsum dolor sit amet, consectetur nisi utert al.Lorem ipsum
              dolor sit amet. Lorem ipsum dolor sit amet, consectetur nisi utert
              al.Lorem ipsum dolor sit amet.
            </Text>
          </View>
        </View>

        {/* Our Vision */}

        <View
          style={{
            flex: 1,
            //flexDirection: 'column',
            padding: 10,
            marginTop: 20,
          }}>
          <Text
            style={{
              fontSize: SIZES.title,
              fontWeight: 'bold',
              marginBottom: 20,
            }}>
            Our Vision
          </Text>
          <View
            style={{
              flex: 1,
              flexDirection: 'column',
              backgroundColor: '#FFF',
            }}>
            <Image
              source={Images.meissionVision2}
              resizeMode="cover"
              style={{width: SIZES.width - 20, height: 250}}
            />
            {/* <Text
              style={{
                fontSize: SIZES.subtitle,
                fontWeight: 'bold',
                marginBottom: SIZES.base,
                margin: 20,
              }}>
              Title comes here
            </Text> */}
            <Text
              style={{
                fontSize: SIZES.font,
                marginTop: 20,
               margin: 5,
              }}>
              Lorem ipsum dolor sit amet, consectetur nisi utert al.Lorem ipsum
              dolor sit amet. Lorem ip dolo amet, ertert constetur nisi m dolor
              sit amet. Lorem ipsum dolor sit amet, consectetur nisi utert
              al.Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet,
              consectetur nisi utert al.Lorem ipsum dolor sit amet.
            </Text>

            <Text
              style={{
                fontSize: SIZES.font, 
                // marginBottom: SIZES.base,
                // margin: 20,
              }}>
              Lorem ipsum dolor sit amet, consectetur nisi utert al.Lorem ipsum
              dolor sit amet.
            </Text>
          </View>
        </View>
      </ScrollView>
    </AppContaioner>
  );
}