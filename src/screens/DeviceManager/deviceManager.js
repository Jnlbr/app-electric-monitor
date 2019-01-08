import React, { Component, Fragment } from 'react';
import { 
  View,
  Text,
  ActivityIndicator
} from 'react-native';
import { ListItem, Button } from 'react-native-elements';
import MessageHandler from '../../utils/messageHandler';
import updateStatus from "../../api/device/updateStatus";
import styles from "./styles/deviceManager";
import colors from '../../contants/colors';
import RightIcon from './RightIcon';
import { Loading } from '../../components';

class DeviceManager extends Component {
  
  static navigationOptions = {
    title: 'Dispositivos',
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
    console.log(id, status)
    try {
      await updateStatus({id,status:!status}, this.props.token);
      this.props.stateChange(id);
    } catch(err) {
      this.messageHandler.errorMessage(err);
    }
  }
  handleOption = async (device) => this.props.navigation.navigate('Configuration', {device});


  render() {
    return (
      <View style={styles.root}>
        {(this.props.fetching) ? (
          <Loading /> ) 
          : (
          <View style={styles.list}>
            {(this.props.devices.length > 0) ? (
              <Fragment>
              {this.props.devices.map(device => (
                <ListItem
                  rightElement={
                    <RightIcon
                      device={device}
                      onOption={() =>
                        this.handleOption(device)
                      }
                    />
                  }
                  onPress={() => { this.props.navigation.push('Device', { device }) }}
                  switch={{
                    trackColor: {true:'blue', false:'red'},
                    disabled: !device.active,
                    value: device.status, 
                    onValueChange: () => this.handleStatusChange(device.id, device.status)
                  }}
                  roundAvatar
                  key={device.id}
                  title={device.name}
                />
              ))}
              </Fragment>
            ) : (
              <Text> No hay dispositivos disponibles </Text>
            )}
              <View style={{ alignItems: 'center' }}>
                <Button
                  onPress={() => this.props.navigation.navigate('AddDevice')}
                  title="Agregar dispositivo"
                  buttonStyle={{
                    backgroundColor: '#1194f6',
                    width: 300,
                    height: 45,
                    borderColor: "transparent",
                    borderWidth: 0,
                    borderRadius: 5
                  }}
                  containerStyle={{ margin: 20 }}
                />
              </View>
          </View>
        )}
      </View>
    )
  }
}

export default DeviceManager;