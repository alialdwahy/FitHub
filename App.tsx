/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import AppContainer from './src /navigation';
import {Provider} from 'react-redux';
import store from './src /store';
import stylesCSS from './src /assets/stylesCSS';
 
const App = () => {
  stylesCSS
  return (
    <Provider store={store}>
      <AppContainer />
    </Provider>
  );
};
 
export default App;
