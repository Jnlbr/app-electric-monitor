import React from 'react';
import PropTypes from 'prop-types';
import { 
    TextInput, 
    View,
    Image,
    StyleSheet
} from 'react-native';

const Input = (props) => (
  <View style={[styles.container, props.containerStyle]}>
    <Image source={props.source} style={styles.icon} />
    <TextInput
      style={[props.inputStyle, styles.input]}
      onChangeText={props.onChangeText}
      defaultValue={props.defaultValue}
      value={props.value}
      textContentType={props.textContentType}
      placeholder={props.placeholder}
      placeholderTextColor={props.placeholderTextColor}            
      secureTextEntry={props.secureTextEntry}
      underlineColorAndroid="transparent"
      autoCapitalize={props.autoCapitalize}
      editable={props.editable}            
    />
  </View>
);

Input.propTypes = {
  // Required props
  onChangeText: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
  source: PropTypes.number.isRequired,
  // Styles props
  containerStyle: PropTypes.number,
  inputStyle: PropTypes.number,
  // Optional props that has default values
  textContentType: PropTypes.string,
  secureTextEntry: PropTypes.bool,
  editable: PropTypes.bool,
  // Idk what to do with this props
  placeholder: PropTypes.string,
  placeholderTextColor: PropTypes.string,
  defaultValue: PropTypes.string,
}

Input.defaultProps = {
  textContentType: 'none',
  secureTextEntry: false,
  editable: true,
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#D9D9D3',
    opacity: 0.5,
    borderRadius: 30,
    height: 50,
  },
  input: {
    flex: 1,
    fontSize: 20
  },
  icon: {
    height: 22,
    width: 22,
    marginLeft: 15,
    marginRight: 10,
    marginTop: 10,
    marginBottom: 10,
  }
});

export default Input