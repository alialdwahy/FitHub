// import React from 'react';
// import {TouchableOpacity, View, Text, StyleSheet} from 'react-native';
// import {SvgXml} from 'react-native-svg';
// //Resource

// import { COLORS, SIZES } from '../constant';
// //Others

// export default class TitleComponent extends React.Component {
//   constructor(props) {
//     super(props);
//     this.touchableInactive = false;
//   }
//   render() {
//     let {
//       title,
//       leftButtonOnPress,
//       rightIcon,
//       rightButtonOnPress,
//       leftIcon,
//       subTitle,
//       subTitle2,
//       headerHeight,
//       subTitleStyle,
//       subTitle2Style,
//       headerBackgroundColor,
//       mainTitleStyle,
//       titleColor,
//       accessibleLeft,
//       accessibilityHintLeft,
//       accessibilityLabelLeft,
//       accessibleRight,
//       accessibilityHintRight,
//       accessibilityLabelRight,
//       titleComponentStyle,
//     } = this.props;
//     return (
//       <View
//         style={
//           titleComponentStyle
//             ? titleComponentStyle
//             : [
//                 styles.header,
//                 {
//                   backgroundColor: headerBackgroundColor
//                     ? headerBackgroundColor
//                     : EStyleSheet.value('$backGroundColor'),
//                   height: headerHeight
//                     ? headerHeight
//                     : subTitle
//                     ? EStyleSheet.value('$deviceHeight') / 5
//                     : EStyleSheet.value('$deviceHeight') / 6,
//                 },
//               ]
//         }>
//         <View style={styles.header_gd1}>
//           <View style={styles.header_gd1_gd1}>
//             {leftIcon && (
//               <TouchableOpacity
//                 accessibilityLabel={'Header_left_click'}
//                 style={styles.header_back_container}
//                 ref={'header_gd1_gd1_to1'}
//                 onPress={() => {
//                   if (!this.touchableInactive) {
//                     this.touchableInactive = true;
//                     leftButtonOnPress ? leftButtonOnPress() : console.log('lieft icon clicked') //Actions.pop();
//                     setTimeout(() => {
//                       this.touchableInactive = false;
//                     }, 1000);
//                   }
//                 }}>
//                 <SvgXml style={styles.header_gd1_gd1_to1_img1} xml={leftIcon} />
//               </TouchableOpacity>
//             )}
//           </View>
//           <View style={styles.header_gd1_gd2}></View>
//           {rightIcon && (
//             <View
//               accessibilityLabel={'Header_right_click'}
//               style={styles.header_gd1_gd3}>
//               <TouchableOpacity
//                 style={styles.header_back_container}
//                 ref={'header_gd1_gd3_to1'}
//                 onPress={() => {
//                   if (!this.touchableInactive) {
//                     this.touchableInactive = true;
//                     rightButtonOnPress();
//                     setTimeout(() => {
//                       this.touchableInactive = false;
//                     }, 1000);
//                   }
//                 }}>
//                 <SvgXml xml={rightIcon} />
//               </TouchableOpacity>
//             </View>
//           )}
//         </View>
//         <View style={styles.title_gd1}>
//           <View style={styles.title_gd1_gd1_gd1}>
//             <View style={styles.title_gd1_gd1_gd2}>
//               <View
//                 accessibilityLabel={'Main_title_view'}
//                 style={
//                   mainTitleStyle
//                     ? mainTitleStyle
//                     : [
//                         styles.title_gd1_gd1_gd2head,
//                         {justifyContent: subTitle ? 'flex-end' : 'center'},
//                       ]
//                 }>
//                 <Text
//                   accessibilityLabel={'Main_title_txt'}
//                   ref="txtentermobileno"
//                   style={[
//                     styles.title_gd1_gd1_gd1_tx1,
//                     titleColor && {color: titleColor},
//                   ]}
//                   allowFontScaling={false}>
//                   {title}
//                 </Text>
//               </View>
//               {subTitle ? (
//                 <View
//                   accessibilityLabel={'Sub_title_view'}
//                   style={
//                     subTitleStyle ? subTitleStyle : styles.title_gd1_gd1_gd2sub
//                   }>
//                   <Text
//                     accessibilityLabel={'Sub_title_txt'}
//                     ref="txtentermobileno"
//                     style={[
//                       styles.title_gd1_gd1_gd1_tx2,
//                       titleColor
//                         ? {color: titleColor}
//                         : {color: COLORS.black},
//                     ]}
//                     allowFontScaling={false}>
//                     {subTitle}
//                   </Text>
//                 </View>
//               ) : null}

//               {subTitle2 ? (
//                 <View
//                   accessibilityLabel={'Sub_Title2_View'}
//                   style={
//                     subTitle2Style
//                       ? subTitle2Style
//                       : styles.title_gd1_gd1_gd2sub
//                   }>
//                   <Text
//                     accessibilityLabel={'Sub_title2_txt'}
//                     ref="txtentermobileno"
//                     style={[
//                       styles.title_gd1_gd1_gd1_tx2,
//                       titleColor
//                         ? {color: titleColor}
//                         : COLORS.black,
//                     ]}
//                     allowFontScaling={false}>
//                     {subTitle2}
//                   </Text>
//                 </View>
//               ) : null}
//             </View>
//           </View>
//         </View>
//       </View>
//     );
//   }
// }
// const styles = StyleSheet.create({
//   header: {
//     height: SIZES.height/5,
//     alignContent: 'center',
//     width: '100%',
//     zIndex: 1,
//     flexDirection: 'column',

//     backgroundColor: '#FFF',
//   },
//   header_gd1: {
//     justifyContent: 'flex-start',
//     alignItems: 'flex-end',
//     width: '100%',
//     flexDirection: 'row',
//     height: SIZES.height / 16,
//   },
//   header_gd1_gd2: {
//     flex: 0.8,
//     justifyContent: 'center',
//   },
//   header_gd1_gd2_txt1: {
//     fontFamily: 'Inter-Medium',
//     color: '#212121',
//     fontSize: '20rem',
//     fontWeight: '500',
//     textAlignVertical: 'center',
//   },
//   header_gd1_gd3: {
//     flex: 0.18,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   header_gd1_gd3_to1: {
//     flex: 1,
//     width: '100%',
//     height: '100%',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   header_gd1_gd1: {
//     flex: 0.16,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   header_back_container: {
//     flex: 1,
//     alignItems: 'center',
//     justifyContent: 'flex-end',
//     width: '100%',
//     height: '100%',
//   },
//   header_gd1_gd1_to1: {
//     flex: 1,
//     width: '100%',
//     height: '100%',
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   title_gd1: {
//     flex: 1,
//     alignItems: 'flex-start',
//     justifyContent: 'flex-start',
//     flexDirection: 'column',
//   },
//   title_gd1_gd1_gd1: {
//     marginLeft: '24rem',
//     flex: 1,
//     alignItems: 'flex-start',
//   },
//   title_gd1_gd1_gd2: {
//     marginRight: '24rem',
//     justifyContent: 'flex-start',
//     alignItems: 'flex-start',
//     flex: 1,
//   },

//   title_gd1_gd1_gd2head: {
//     justifyContent: 'flex-end',
//     flex: 1,
//   },
//   title_gd1_gd1_gd2sub: {
//     justifyContent: 'center',
//     flex: 1.3,
//   },

//   title_gd1_gd1_gd1_tx1: {
//     fontFamily: COLORS.black,
//     color: COLORS.black,
//     fontSize: '22rem',
//   },
//   title_gd1_gd1_gd1_tx2: {
//     fontFamily: COLORS.black,
//     color: COLORS.lightGray,
//     fontSize: '15rem',
//   },
// });
