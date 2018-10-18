import React, { Component } from 'react';
import { 
	KeyboardAvoidingView,
	TouchableOpacity,
	View,
	Text,
	ProgressBarAndroid,
	ImageBackground
} from 'react-native';
import styles from './styles/logIn';
import { Input } from '../../components';
import emptyFields from '../../utils/emptyFields';
import MessageHandler from '../../utils/messageHandler';
import PropTypes from 'prop-types';

import usernameImg from '../../assets/icons/user-input.png';
import passwordImg from '../../assets/icons/password-input.png';
// import logoImg from '../../assets/images/Logo.png';

class LogIn extends Component {
   
	state = {
		username: '',
    password: '',
    messageHandler: new MessageHandler()
	}
  handleTextChange = (input) => (value) => this.setState({[input]: value});

  componentDidUpdate(prevProps) {
    
  }

  render() {
    const disabled = emptyFields(this.state);

    return (
      <KeyboardAvoidingView style={styles.root} behavior="padding" enabled>
        <View style={styles.loginContainer}>
          <Input
            source={usernameImg}
            textContentType="username"
            placeholder="Username"
            placeholderTextColor="white"
            onChangeText={this.handleTextChange('username')}
            value={this.state.username}
            containerStyle={styles.input}
          />
          <Input
            source={passwordImg}
            textContentType="password"
            placeholder="Password"
            placeholderTextColor="white"
            onChangeText={this.handleTextChange('password')}
            value={this.state.password}
            secureTextEntry={true}
            containerStyle={styles.input}
          />
          <View style={styles.options}>
            <TouchableOpacity
              activeOpacity={0.1}
              style={[styles.button, disabled && {opacity: 0.5}]}
              onPress={this.handleLogin}
              disabled={disabled}
            >
              {/* { (!fetching) ? ( */}
                  <Text style={styles.buttonText}> LOG IN! </Text>
              {/* ) : (
                  <ProgressBarAndroid styleAttr="Small" color="white"/>
              )} */}
            </TouchableOpacity>        
          </View>
        </View>
        <View style={styles.optionsContainer}>
          <Text
            style={styles.text}
            onPress={() => navigation.push('SignUp')}
          > SIGN UP!
          </Text>
        </View>
      </KeyboardAvoidingView>
    );
  }
}

LogIn.propTypes = {
	// fetching: PropTypes.bool,
	// isLoggedIn: PropTypes.bool,
	// login: PropTypes.func,
	// error: PropTypes.bool,
	// errorMessage: PropTypes.string,
}

export default LogIn