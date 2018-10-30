import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
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

class SignUp extends React.Component {
	state = {
		username: '',
		name: '',
		password: '',
		verification: '',
		email: '',
	}

	handleTextChange = (input) => (value) => this.setState({[input]: value});

	render() {

		const disabled = emptyFields(this.state);
		return (
			// <ImageBackground source={backgroundImg} style={{width: '100%', height: '100%'}} blurRadius={2.5}>
				<KeyboardAvoidingView style={styles.container} behavior="padding" enabled>
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
					<View style={styles.div}>
						<TouchableOpacity
							activeOpacity={0.5}
							style={[styles.button, disabled && {opacity: 0.5}]}
							onPress={this.handleSignUp}
							disabled={disabled}
						>
							{/* { (!fetching) ? ( */}
								<Text style={styles.buttonText}> Register </Text>
							{/* ) : ( */}
								{/* <ProgressBarAndroid styleAttr="Small" color="white"/> */}
							{/* )} */}
						</TouchableOpacity>
					</View>
				</KeyboardAvoidingView>
			// </ImageBackground>
		);
	}
}

SignUp.propTypes = {
	// fetching: PropTypes.bool,
	// signUp: PropTypes.func,
	// signUpRedirect: PropTypes.bool,
	// error: PropTypes.bool,
	// errorMessage: PropTypes.string,
}

export default SignUp;