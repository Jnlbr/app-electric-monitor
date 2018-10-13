import React, { Component } from 'react';
import { ActivityIndicator } from 'react-native';

class Loading extends Component {
  constructor(props) {
    super(props);

    this.isAuth();
  }

  isAuth = async () => {    
    setTimeout(() => {
      console.log('TIMEOUT')
      this.props.navigation.navigate('UserRoutes'); 
    }, 5000)
  }

   render() {

    return (      
      <ActivityIndicator 
        size="large" 
        color="#F04A58"
      />
    )
  }
}

export default Loading;