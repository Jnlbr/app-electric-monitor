import React, { Component } from 'react';
import { ActivityIndicator, View } from 'react-native';
import styles from './styles/loading';
import colors from '../../contants/colors';

class Loading extends Component {
  constructor(props) {
    super(props);

    this.isAuth();
  }

  isAuth = async () => {    
    setTimeout(() => {
      console.log('TIMEOUT')
      this.props.navigation.navigate('AuthRoutes'); 
    }, 5000)
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