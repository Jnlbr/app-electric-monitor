import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { 
	KeyboardAvoidingView,
	TouchableOpacity,
	View,
	Text,
	ProgressBarAndroid
} from 'react-native';
import styles from './styles/login';
import { Input } from '../../components';
import emptyFields from '../../utils/emptyFields';
import MessageHandler from '../../utils/messageHandler';
import usernameImg from '../../assets/icons/user-input.png';
import passwordImg from '../../assets/icons/password-input.png';

class LogIn extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: 'jnlbr',
      password: '1234',
    }
    this.messageHandler = new MessageHandler();
  }
  handleTextChange = (input) => (value) => this.setState({[input]: value});

  componentDidUpdate(prevProps) {
    const user = this.props.user
    if (user && !prevProps.user) {
      this.props.setAuth(user);
      if(user.hasLicense) {
        this.props.navigation.navigate('UserRoutes');
      } else {
        this.props.navigation.navigate('License');
      }
    }
    if(this.props.error && !prevProps.error) {
      this.messageHandler.errorMessage(this.props.errorMessage);
    }
  }

  render() {
    const disabled = emptyFields(this.state);
    const { fetching } = this.props;
    console.log(this.props.user)

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
              onPress={() => this.props.logIn({form:this.state, token:false})}
              disabled={disabled}
            >
              { (!fetching) ? ( 
                  <Text style={styles.buttonText}> LOG IN! </Text>
               ) : (
                  <ProgressBarAndroid styleAttr="Small" color="white"/>
              )}
            </TouchableOpacity>        
          </View>
        </View>
        <View style={styles.optionsContainer}>
          <TouchableOpacity
            activeOpacity={0.1}
            style={{}}
            onPress={() => this.props.navigation.push('SignUp')}
          >
            <Text
              style={styles.text}              
            > SIGN UP!
            </Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    );
  }
}

export default LogIn