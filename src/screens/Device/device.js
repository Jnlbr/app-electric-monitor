import React, { Component } from 'react';
import { 
  View,
  Text,
  Picker,
  ActivityIndicator
} from 'react-native';
import {
  Divider,
  Badge,
  Button,
} from 'react-native-elements';
import colors from '../../contants/colors';
import SocketIOClient from 'socket.io-client';
import { API_URL } from "../../utils/config";
import monthLabel from "../../utils/monthLabel";
import styles from './styles/device';
import PureChart from 'react-native-pure-chart';
import HeaderRight from "./headerRight";
import MessageHandler from '../../utils/messageHandler';
import { ConfigurationModal } from "../../components";
import getDeviceParams from "../../api/params/getDeviceParams";

class Device extends Component {

  static navigationOptions = ({ navigation }) => {
    const device = navigation.getParam('device', { name: 'Device' });
    return {
      title: device.name,
      headerStyle: {
        backgroundColor: colors.primary.main,
      },
      headerTintColor: 'white',
      headerTitleStyle: {
        fontWeight: 'bold',
      },
      headerRight: (
        <View style={{marginRight: 3}}>
          <HeaderRight device={device} />
        </View>
      )
    }
  }

  constructor(props) {
    super(props);
    this.state = {
      device: this.props.navigation.getParam('device', {}),
      amps: 0,
      watts: 0,
      historial: [],
      modalVisible: false,
      fetching: true,
      historial: [],
      actual: null
    }
    this.messageHandler = new MessageHandler();
    this.socket = SocketIOClient.connect(API_URL + '/user');
  }

  setModalVisible(visible) {
    this.setState({
      modalVisible: visible
    });
  }

  round(num) {
    return Math.round(num*100) / 100;
  }

  componentDidMount() {
    console.log('DID MOUNT')
    const id = this.state.device.id;
    this.props.getDeviceMonth(id);
    this.socket.on('params:' + id, (data) => {
      this.setState({
        amps: this.round(data.amps),
        watts: this.round(data.watts)
      });
    });
  }

  componentDidUpdate(prevProps) {
    const data = this.props.data;    
    if(prevProps.fetching && !this.props.fetching) {
      this.props.setDeviceMonths(data);
      console.log('DID UPDATING SHIT');
      this.fetchMonthData(data[data.length-1])
    }
    if(!prevProps.error && this.props.error) {
      this.messageHandler.errorMessage(this.props.errorMessage);
    }
  }

  componentWillUnmount() {
    this.socket.close();
    this.props.setDeviceMonths([]);
  }

  fetchMonthData(actual) {
    console.log('MONTH SELECTED: ');
    console.log(actual);
    this.setState({
      fetching: true,
      actual: actual
    })
    getDeviceParams({
      id: this.state.device.id,
      year: actual.year,
      month: actual.month
    }, this.props.token)
    .then((data) => {
      console.log('MONTH DATA: ');
      console.log(data);
      this.setState({
        fetching: false,
        historial: data,
        actual: actual
      })
    })
    .catch(err => {
      console.log(data);
      this.messageHandler.errorMessage(err.message);
    })
  }

  render() {
    let { deviceMonths } = this.props;

    return (
      <View style={styles.root}>      
        <ConfigurationModal 
          setModalVisible={this.setModalVisible} 
          modalVisible={this.state.modalVisible}
        />
        <View style={styles.params}>
        <View style={styles.amps}>
          <Text style={styles.valueContainer}>
            Corriente:
          <Text style={styles.value}>
            {this.state.amps}
          </Text>
          <Text>a</Text>
          </Text>
        </View>
        <View style={styles.watts}>
          <Text style={styles.valueContainer}>
            Potencia:
          <Text style={styles.value}>
            {this.state.watts}
          </Text>
          <Text>w</Text>
          </Text>
        </View>
        </View>
        <Divider style={styles.divider}/>
        <View style={styles.chartContainer}>
          <Picker
            selectedValue={this.state.actual}
            style={{ height: 50, width: 200 }}
            onValueChange={(item) => this.fetchMonthData(item)}>
            {deviceMonths.map((m,i) => 
              <Picker.Item
                key={i}
                label={monthLabel(m.month) + " " + m.year} 
                value={m}
              />
            )}
          </Picker>
          {(!this.state.fetching) ? (
            <PureChart
              data={this.state.historial}
              type='line'
            />
          ) : (
            <ActivityIndicator 
              size="large" 
              color="red"
            />
          )}
          <View style={styles.badgesContainer}>            
            <View style={{flexDirection:'row'}}>
              <Badge
                containerStyle={{backgroundColor:'blue'}}
                value="Current"
              />
              <Badge
                containerStyle={{backgroundColor: 'green'}}
                value="Power"
              />
            </View>
            <Button
              title="Configuracion"
              onPress={() => this.setModalVisible(true)}
              backgroundColor='#F04A58'
              containerViewStyle={{paddingVertical: 10}}
              borderRadius={5}
            />
          </View>
        </View>
      </View>
    )
  }
}

export default Device;