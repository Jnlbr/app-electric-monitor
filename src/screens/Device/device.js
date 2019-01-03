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
      actual: null,
      isEmpty: false,
    }
    this.messageHandler = new MessageHandler();
    this.socket = SocketIOClient.connect(API_URL + '/user');
  }

  round(num) {
    return Math.round(num*100) / 100;
  }

  componentDidMount() {
    const id = this.state.device.id;
    this.props.getMonths(id);
    console.log('didmount')
    this.socket.on('params:' + id, (data) => {
      this.setState({
        amps: this.round(data.amps),
        watts: this.round(data.watts)
      });
    });
  }

  componentDidUpdate(prevProps) {
    if (prevProps.monthsFetching && !this.props.monthsFetching) {
      const months = this.props.months;
      console.log(months);
      if(months.length > 0) {
        this.getRecord(months[months.length - 1]);
      } else {
        this.setState({
          isEmpty: true,
        })
      }      
    }
    if (!prevProps.monthsError && this.props.monthsError) {
      this.messageHandler.errorMessage(this.props.monthsErrorMessage);
    }
    if (!prevProps.recordError && this.props.recordError) {
      this.messageHandler.errorMessage(this.props.recordErrorMessage);
    }
  }

  componentWillUnmount() {
    this.socket.close();
  }

  getRecord(actual) {
    this.setState({      
      actual: actual
    })
    this.props.getRecord({
      id: this.state.device.id,
      year: actual.year,
      month: actual.month
    })
  }

  render() {
    let { months } = this.props;
    let { isEmpty } = this.state;

    return (
      <View style={styles.root}>
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
          {(isEmpty) ? (
            <View>
              <Text> No hay informacion disponible </Text>
            </View>
          ) : (
            <View>
              {(!this.props.recordFetching) ? (
              <View>
                <Picker
                  selectedValue={this.state.actual}
                  style={{ height: 50, width: 200 }}
                  onValueChange={(item) => this.getRecord(item)}
                >
                  {months.map((m, i) =>
                    <Picker.Item
                      key={i}
                      label={monthLabel(m.month) + " " + m.year}
                      value={m}
                    />
                  )}
                </Picker>
                <PureChart
                  data={this.props.record}
                  type='line'
                />
              </View>
            ) : (
              <ActivityIndicator 
                size="large" 
                color="red"
              />
            )}
            </View>
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
          </View>
        </View>
      </View>
    )
  }
}

export default Device;