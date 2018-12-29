import React, { Component } from 'react';
import { ActivityIndicator, View } from 'react-native';
import styles from './styles/loading';
import colors from '../../contants/colors';
import verifyToken from '../../api/auth/verifyToken';

class Loading extends Component {
  constructor(props) {
    super(props);

    this.isAuth();
  }

  isAuth = async () => {
    try {
      const data = await verifyToken();
      if(data) {
        this.props.setAuth(data);
        this.props.navigation.navigate('UserRoutes');
      } else {
        this.props.navigation.navigate('AuthRoutes');  
      }
    } catch(err) {
      console.log(`
        PACKAGE: screens/Loading/loading.js
        CLASS: Loading component
        METHOD: isAuth
        API: verifyToken
        ERROR: ${err}
      `);
      this.props.navigation.navigate('AuthRoutes');
    }
  }

   render() {

    return (      
      <View style={styles.container}>
        <ActivityIndicator 
          size="large" 
          color={colors.secondary.main}
        />
      </View>
    )
  }
}

export default Loading;