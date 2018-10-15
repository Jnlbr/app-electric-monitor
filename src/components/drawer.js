import React, { Component } from 'react';
import PropTypes from 'prop-types'
import {
   View,
   ScrollView,
   TouchableOpacity
} from 'react-native';
import { DrawerItems, SafeAreaView } from 'react-navigation';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import styles from './Styles/drawer';

const Drawer = () => (
  <View style={styles.container}>
    <ScrollView>
      <SafeAreaView
        style={{flex:1}}
        forceInset={{ top: 'always', horizontal: 'never' }}
      ><DrawerItems activeTintColor="white" inactiveTintColor="white" {...this.props} />
      </SafeAreaView>               
    </ScrollView>
    <View style={styles.footerContainer}>
      {/* <TouchableOpacity
        style={styles.button}
        onPress={this.handleLogout}
      ><Icon name="logout" size={30} color="white" />
      </TouchableOpacity> */}
    </View>
  </View>
);

export default Drawer;