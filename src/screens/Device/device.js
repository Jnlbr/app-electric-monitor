import React, { Component } from 'react';
import { 
  View,
  Text,
  Picker
} from 'react-native';
import {
  Divider,
  Badge,
  Button
} from 'react-native-elements';
import colors from '../../contants/colors';
import SocketIOClient from 'socket.io-client';
import { API_URL } from "../../utils/config";
import styles from './styles/device';
import PureChart from 'react-native-pure-chart';
import HeaderRight from "./headerRight";
import MessageHandler from '../../utils/messageHandler';
import { ConfigurationModal } from "../../components";

let sampleData = [
  {
    seriesName: 'current',
    data: [
      {x: '2018-02-01', y: 20},
      {x: '2018-02-02', y: 100},
      {x: '2018-02-03', y: 140},
      {x: '2018-02-04', y: 200},
      {x: '2018-02-05', y: 40},
      {x: '2018-02-06', y: 40},
      {x: '2018-02-07', y: 120},
      {x: '2018-02-08', y: 80},
      {x: '2018-02-09', y: 230},
      {x: '2018-02-10', y: 80}
    ],
    color: 'blue'
  },
  {
    seriesName: 'power',
    data: [
      {x: '2018-02-01', y: 80},
      {x: '2018-02-02', y: 10},
      {x: '2018-02-03', y: 40},
      {x: '2018-02-04', y: 50},
      {x: '2018-02-05', y: 80},
      {x: '2018-02-06', y: 10},
      {x: '2018-02-07', y: 30},
      {x: '2018-02-08', y: 80},
      {x: '2018-02-09', y: 60},
      {x: '2018-02-10', y: 90}
    ],
    color: 'green'
  }
]

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
      amps: 12,
      watts: 12*110,
       // Algo asi podria ser el formato para trabajar o el array completo de datos
      historial: {
        values: [{ amps: 12, watts: 200 }, { amps: 15, watts: 220 }],
        date: 'September 2018',
      },
      modalVisible: false,
    }
    this.messageHandler = new MessageHandler();
    this.socket = SocketIOClient.connect(API_URL + '/user');
    
  }

  setModalVisible(visible) {
    this.setState({
      modalVisible: visible
    });
  }

  onParams(data) {
    this.setState({
      amps: data.amps,
      watts: data.watts
    });
    console.log(data)
  }

  componentDidMount() {
    // Fetch de la data
    // this.socket.on('params:' + this.state.device.id, this.onParams);
    this.socket.on('params:' + this.state.device.id, (data) => {
      this.setState({
        amps: data.amps,
        watts: data.watts
      });
    });
  }

  render() {
    return (
      <View style={styles.root}>      
        <ConfigurationModal 
          setModalVisible={this.setModalVisible} 
          modalVisible={this.state.modalVisible}
        />
        <View style={styles.params}>
        <View style={styles.amps}>
          <Text style={styles.valueContainer}>
            Current:
          <Text style={styles.value}>
            {this.state.amps}
          </Text>
          <Text>A</Text>
          </Text>
        </View>
        <View style={styles.watts}>
          <Text style={styles.valueContainer}>
            Power:
          <Text style={styles.value}>
            {this.state.watts}
          </Text>
          <Text>W</Text>
          </Text>
        </View>
        </View>
        <Divider style={styles.divider}/>
        <View style={styles.chartContainer}>
          <Picker
            selectedValue={this.state.historial.date}
            style={{ height: 50, width: 200 }}
            onValueChange={(item) => this.setState({historial: item})}>
            {/* Aqui hacer un FOR de las fechas disponibles con sus respectivos values */}
            <Picker.Item 
              label="September 2018" 
              value={{
                values: [{ amps: 12, watts: 200 }, { amps: 15, watts: 220 }],
                date: 'September 2018',
              }} 
            />
            <Picker.Item 
              label="October 2018" 
              value={{
                values: [{ amps: 12, watts: 200 }, { amps: 15, watts: 220 }],
                date: 'October 2018',
              }}
            />
          </Picker>
          <PureChart
            data={sampleData}
            type='line'
          />
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
              title="Configuration"
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