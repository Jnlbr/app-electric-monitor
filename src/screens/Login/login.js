import React, { Component } from 'react';
import { 
	KeyboardAvoidingView,
	TouchableOpacity,
	View,
	Text,
	ProgressBarAndroid
} from 'react-native';
import styles from './styles/logIn';
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
      console.log(`
        PACKAGE: screens/LogIn
        CLASS: LogIn
        DATA: ${JSON.stringify(user)}
      `);
      this.props.setAuth(user);
      this.props.navigation.navigate('UserRoutes');
    }
    if(this.props.error && !prevProps.error) {
      this.messageHandler.errorMessage(this.props.errorMessage);
    }
  }

  render() {
    const disabled = emptyFields(this.state);
    const { fetching } = this.props;

    return (
      <View style={styles.root}>
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
                  <Text style={styles.buttonText}> Iniciar sesion! </Text>
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
            > REGISTRAR!
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

export default LogIn