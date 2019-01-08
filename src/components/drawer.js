import React, { Component } from 'react';
import PropTypes from 'prop-types'
import {
   View,
   ScrollView,
   TouchableOpacity,
   StyleSheet
} from 'react-native';
import { Text } from 'react-native-elements';
import { DrawerItems, SafeAreaView } from 'react-navigation';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import logOut from '../api/auth/logOut';
import colors from '../contants/colors';
import { connect } from 'react-redux';

class Drawer extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={styles.container}>
        <ScrollView>
          <SafeAreaView
            style={{flex:1}}
            forceInset={{ top: 'always', horizontal: 'never' }}
          >
            <View style={{ alignItems: 'center'}}>
              <Text h4 style={{ color: 'white'}}>
                
              </Text>
            </View>
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    backgroundColor: colors.primary.light
  },
  footerContainer: {
    padding: 20,
  },
  button: {
    width: 30,
  },
});

const mapStateToProps = ({ auth: { logIn }}) => ({
  user: logIn.data,
})
const mapDispatchToProps = dispatch => ({
  logOut: () => {
    dispatch({type:'LOG_OUT'})
  }
})

export default connect(mapStateToProps,mapDispatchToProps)(Drawer);