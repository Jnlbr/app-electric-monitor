import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
    ScrollView,
		KeyboardAvoidingView,
		TouchableOpacity,
		View,
		Text,
		ProgressBarAndroid
} from 'react-native';
import usernameImg from '../../assets/icons/user-input.png';
import passwordImg from '../../assets/icons/password-input.png';
import emailImg from '../../assets/icons/email-outline.png';
import verificationImg from '../../assets/icons/lock-reset.png';
import emptyFields from '../../utils/emptyFields';
import { Input } from '../../components';
import styles from './styles/signUp';
import MessageHandler from '../../utils/messageHandler';

class SignUp extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      username: 'aaasd',
      name: 'asdasd',
      password: '1234',
      verification: '1234',
      email: 'sosme@gmasdadsasdasail.com',
      code: '123s'
    }
    this.messageHandler = new MessageHandler();
  }

  handleTextChange = (input) => (value) => this.setState({[input]: value});
  
  componentDidUpdate(prevProps) {
    const data = this.props.data
    console.log(data)
    if (data && !prevProps.data) {
      
      this.props.setAuth(data);
      this.props.navigation.navigate('UserRoutes');
    }
    if (this.props.error && !prevProps.error) {
      this.messageHandler.errorMessage(this.props.errorMessage);
    }
  }

	render() {
    const disabled = emptyFields(this.state);
    
		return (
      <ScrollView style={styles.root}>
        <KeyboardAvoidingView style={styles.container} behavior="position" enabled>
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
            source={usernameImg}
            textContentType="name"
            placeholder="Name"
            placeholderTextColor="white"
            onChangeText={this.handleTextChange('name')}
            value={this.state.name}
            containerStyle={styles.input}
            autoCapitalize="words"
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
          <Input
            source={verificationImg}
            textContentType="password"
            placeholder="Confirm Password"
            placeholderTextColor="white"
            onChangeText={this.handleTextChange('verification')}
            value={this.state.verification}
            secureTextEntry={true}
            containerStyle={styles.input}
          />
          <Input
            source={emailImg}
            textContentType="emailAddress"
            placeholder="Email@example.com"
            placeholderTextColor="white"
            onChangeText={this.handleTextChange('email')}
            value={this.state.email}
            containerStyle={styles.input}
          />
          <Input
            source={passwordImg}
            textContentType="name"
            placeholder="Code"
            placeholderTextColor="white"
            onChangeText={this.handleTextChange('code')}
            value={this.state.code}
            containerStyle={styles.input}
          />
          <View style={styles.div}>
            <TouchableOpacity
              activeOpacity={0.5}
              style={[styles.button, disabled && { opacity: 0.5 }]}
              onPress={() => this.props.signUp(this.state)}
              disabled={disabled}
            >
              {(!this.props.fetching) ? (
                <Text style={styles.buttonText}> Registrar! </Text>
              ) : (
                  <ProgressBarAndroid styleAttr="Small" color="white" />
                )}
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </ScrollView>
		);
	}
}

export default SignUp;