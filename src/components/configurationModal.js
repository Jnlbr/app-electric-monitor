import React from 'react';
import {
   Modal,
   View
} from 'react-native';
import { 
  Button,
  CheckBox
} from 'react-native-elements';
import styles from './styles/configurationModal';
import Input from './input';
import usernameImg from '../assets/icons/user-input.png';

const ConfigurationModal = ({ modalVisible, setModalVisible }) => (
  <Modal
    animationType="fade"
    transparent={true}
    visible={modalVisible}
    onRequestClose={() => setModalVisible(false)}>
    <View style={styles.container}>
      <View style={styles.modal}>
        <View style={{paddingHorizontal: 15, flex: 1}}>
          <Input
            source={usernameImg}
            textContentType="username"
            placeholder="Device name"
            placeholderTextColor="white"
            // Change name
            onChangeText={() => console.log('Do something else')}
            value=""
            containerStyle={styles.input}
          />
          <CheckBox
            center
            title='ON OFF NOTIFICATION'
            checked={true}
          />
        </View>
        <View style={{flexDirection:'row'}}>          
          <Button
            title="Accept"
            // FETCH TO EMIT THE CHANGES
            onPress={() => console.log('ACCEPT')}
            backgroundColor='#F04A58'
            containerViewStyle={{paddingVertical: 5, flex: 1}}
            borderRadius={5}
          />
          <Button
            title="cancel"
            onPress={() => setModalVisible(false)}
            containerViewStyle={{paddingVertical: 5, flex: 1}}
            borderRadius={5}           
          />
        </View>
      </View>
    </View>
  </Modal>
);

export default ConfigurationModal;