import React, { Component } from 'react';
import { 
  View,
  ActivityIndicator,
  Button
} from 'react-native';
import { 
  List, 
  ListItem
} from 'react-native-elements';
import MessageHandler from '../../utils/messageHandler';
import { ToggleSwitch } from '../../components';
import updateStatus from "../../api/device/updateStatus";
import styles from "./styles/deviceManager";
import colors from '../../contants/colors';
import RightIcon from './RightIcon';

class DeviceManager extends Component {
  
  static navigationOptions = {
    title: 'Device Manager',
    headerStyle: {
      backgroundColor: colors.primary.main,
    },
    headerTintColor: 'white',
    headerTitleStyle: {
      fontWeight: 'bold',
    },
  };

  constructor(props) {
    super(props);
    this.messageHandler = new MessageHandler();
    this.state = {
      devices: [],
      token: '',
    }
  }
  componentDidMount() {
   this.props.getAll();
   this.setState({
     token: this.props.token
   })
  }
  componentDidUpdate(prevProps) {
    if(this.props.error && !prevProps.error) {
      this.messageHandler.errorMessage(this.props.errorMessage);
    }
  }

  handleStatusChange = async (id,status) => {
    try {
      await updateStatus({id,status:!status}, this.props.token);
      this.props.stateChange(id);
    } catch(err) {
      this.messageHandler.errorMessage(err);
    }
  }
  handleOption = async (device) => this.props.navigation.navigate('Configuration', {device});


  render() {
    console.log(this.props.devices)
    return (
      <View style={styles.root}>
        {(this.props.fetching) ? (
          <ActivityIndicator 
            size="large" 
            color={colors.secondary.main}
          /> ) 
          : (
          <List containerStyle={{margin: 20}}>
            {this.props.devices.map(device => (
              <ListItem
                onPress={() => {this.props.navigation.push('Device', {device})}}
                rightIcon={
                  <RightIcon
                    device={device}                 
                    onStatusChange={(isOn) => {
                      this.handleStatusChange(device.id, device.status);
                    }}
                    onOption={() =>
                      this.handleOption(device)
                    }
                  />
                }
                roundAvatar
                key={device.id}
                title={device.name}
              />
            ))}
          </List>
        )}
        <Button onPress={() => this.props.navigation.navigate('AddDevice')} title="Add new device" />
      </View>
    )
  }
}

export default DeviceManager;