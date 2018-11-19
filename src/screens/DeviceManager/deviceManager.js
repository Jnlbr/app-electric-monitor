import React, { Component } from 'react';
import { 
  View,
  Text,
} from 'react-native';
import MessageHandler from '../../utils/messageHandler';
import { List, ListItem, Header } from 'react-native-elements';
import { ToggleSwitch } from '../../components';
import colors from '../../contants/colors';
import updateStatus from "../../api/device/updateStatus";

class DeviceManager extends Component {
  constructor(props) {
    super(props);
    this.messageHandler = new MessageHandler();
  }
  handleChange = async (id,status) => {
    try {
      await updateStatus({id,status:!status}, this.props.token);
      this.setState({
      devices: this.state.devices.map(d => {
        return d.id === id ? { ...d, status: !d.status } : d;
      })
    })
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
      <View>
        {/* <Header
          leftComponent={{ icon: 'menu', color: '#fff' }}
          centerComponent={{ text: 'Devices', style: { color: '#fff' } }}
          outerContainerStyles={{ backgroundColor: colors.primary.main }}
        /> */}
        <List containerStyle={{marginBottom: 20}}>
          {
            this.props.devices.map((device) => (
              <ListItem
                onPress={() => this.props.navigation.navigate('Device', device)}
                rightIcon={
                  <ToggleSwitch
                    isOn={device.status}
                    onColor='green'
                    offColor='red'
                    size='small'
                    onToggle={(isOn) => {
                      this.handleChange(device.id, device.status);
                    }}
                  />
                }
                roundAvatar
                key={device.id}
                title={device.name}
              />
            ))
          }
        </List>
      </View>
    )
  }
}

export default DeviceManager;