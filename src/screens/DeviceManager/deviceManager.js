import React, { Component } from 'react';
import { 
  View,
  Text,
} from 'react-native';
import MessageHandler from '../../utils/messageHandler';
import { List, ListItem, Header } from 'react-native-elements';
import { ToggleSwitch } from '../../components';
import updateStatus from "../../api/device/updateStatus";
import styles from "./styles/deviceManager";

class DeviceManager extends Component {
  constructor(props) {
    super(props);
    this.messageHandler = new MessageHandler();
    this.state = {
      devices: [],
    }
  }
  handleChange = async (id,status) => {
    try {
      await updateStatus({id,status:!status}, this.props.token);
      this.props.changeState(id);
    } catch(err) {
      this.messageHandler.errorMessage(err);
    }
  } 

  componentDidMount() {
   this.props.getAll();
  }
  componentDidUpdate(prevProps) {
    const data = this.props.data;
    if (data && !prevProps.data) {
      this.props.setDevices(data);
    }
    if(this.props.error && !prevProps.error) {
      this.messageHandler.errorMessage(this.props.errorMessage);
    }
  }

  render() {
    return (
      <View style={styles.root}>
        <List containerStyle={{margin: 20}}>
          {this.props.devices.map(device => (
            <ListItem
              onPress={() => this.props.navigation.navigate('Device', device)}
              rightIcon={
                <ToggleSwitch
                  isOn={device.status}
                  onColor="green"
                  offColor="red"
                  size="small"
                  onToggle={(isOn) => {
                    this.handleChange(device.id, device.status);
                  }}
                />
              }
              roundAvatar
              key={device.id}
              title={device.name}
            />))
          }
        </List>
      </View>
    )
  }

}

export default DeviceManager;