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
      console.log(data);
      if(data) {
        console.log('LOADING SCREEN: isAuth - User routes');
        this.props.navigation.navigate('UserRoutes');
      } else {
        console.log('LOADING SCREEN: isAuth - Auth routes');
        this.props.navigation.navigate('AuthRoutes');  
      }
    } catch(err) {
      console.log('LOADING SCREEN: isAuth - Auth routes x2');
      console.log(err);
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