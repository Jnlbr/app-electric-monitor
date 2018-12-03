import React, { Component } from 'react';
import PropTypes from 'prop-types'
import {
   View,
   ScrollView,
   TouchableOpacity
} from 'react-native';
import { DrawerItems, SafeAreaView } from 'react-navigation';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import styles from './styles/drawer';
import logOut from '../api/auth/logOut';
import { connect } from 'react-redux';

class Drawer extends React.Component {

  constructor(props) {
    super(props);
  }

  handleLogOut() {
    console.log(this.props)
    logOut().then(() => {
      // this.props.logOut();
      // this.props.navigation.navigate('AuthRoutes')
    }).catch(err => {
      console.log(err);
    })
  }

  render() {
    return (
      <View style={styles.container}>
        <ScrollView>
          <SafeAreaView
            style={{flex:1}}
            forceInset={{ top: 'always', horizontal: 'never' }}
          ><DrawerItems activeTintColor="white" inactiveTintColor="white" {...this.props} />
          </SafeAreaView>               
        </ScrollView>
        <View style={styles.footerContainer}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              logOut().then(() => {
                this.props.logOut();
                this.props.navigation.navigate('AuthRoutes')
              }).catch(err => {
                console.log(err)
              })
            }}
          ><Icon name="logout" size={30} color="white" />
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  logOut: () => {
    dispatch({type:'LOG_OUT'})
  }
})

export default connect(null,mapDispatchToProps)(Drawer);