import React, { Component, Fragment } from 'react';
import { 
  View,
  Picker,
  ActivityIndicator,
  ScrollView,
  TouchableOpacity
} from 'react-native';
import { Text, Divider, Badge } from 'react-native-elements';
import colors from '../../contants/colors';
import SocketIOClient from 'socket.io-client';
import { API_URL } from "../../utils/config";
import monthLabel from "../../utils/monthLabel";
import styles from './styles';
import HeaderRight from "./HeaderRight";
import { ChartContainer } from '../../components';
import MessageHandler from '../../utils/messageHandler';

class Device extends Component {

  constructor(props) {
    super(props);
    this.state = {
      device: this.props.navigation.getParam('device', {}),
      
      current: [],
      power: [],

      actual: null,
      selected: 0, // To selected between current and power (0 = current, 1 = power)
      record: null,

      isEmpty: false,
      active: false
    }
    this.messageHandler = new MessageHandler();
    this.socket = SocketIOClient.connect(API_URL + '/user');
  }

  static navigationOptions = ({ navigation }) => {
    const device = navigation.getParam('device', {name:'Device'});
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
        <View style={{ marginRight: 3 }}>
          <HeaderRight device={device}/>
        </View>
      )
    }
  }

  componentDidMount() {
    const { id, active } = this.state.device;
    this.props.getMonths(id);

    if(active) {
      this.socket.on('params:' + id, (data) => {
        let { current, power } = this.state;
        if (current.length > 40) {
          current.shift();
        }
        if (power.length > 40) {
          power.shift();
        }
        this.setState({
          current: [...current, data.amps],
          power: [...power, data.watts]
        });
      });
    }
    this.setState({ active });
  }

  componentDidUpdate(prevProps) {
    if (prevProps.monthsFetching && !this.props.monthsFetching) {
      const months = this.props.months;
      if(months.length > 0) {
        this.getRecord(months[months.length - 1]);
      } else {
        this.setState({
          isEmpty: true,
        })
      }      
    }
    if(prevProps.recordFetching && !this.props.recordFetching) {
      const record = this.props.record;
      if(record.length > 0) {
        this.setState({
          record: record[this.state.selected]
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

  handleBadgePress = (record,i) => this.setState({ record, selected: i })

  render() {
    let { months } = this.props;
    let { isEmpty, active, current, power } = this.state;

    return (
      <ScrollView style={styles.root}>
        <View style={styles.realTime}>
          <Text h3> Consumo a tiempo real </Text>
          {(active) ? (
            <View>
              {(current.length > 0) ? (
                <View style={{ marginTop: 15, marginHorizontal: 5 }}>
                  <ChartContainer
                    title="Lectura de corriente"
                    data={current}
                    type="line"
                  />
                  <View style={{ marginVertical: 10 }} />
                  <ChartContainer
                    title="Lectura de potencia"
                    data={power}
                    type="line"
                  />
                </View>
              ) : (
                  <View style={styles.waiting}>
                    <Text> Esperando por datos... </Text>
                    <ActivityIndicator color="red" />
                  </View>
                )}
            </View>
          ) : (
              <View>
                <Text> El dispositivo no se encuentra disponible </Text>
              </View>
            )}
        </View>

        <Divider style={styles.divider} />

        <View style={styles.record}>
          <Text h3> Historial de consumo </Text>
          {(isEmpty) ? (            
            <Text> No hay informacion disponible </Text>
          ) : (
            <Fragment>
              {(!this.props.recordFetching && this.state.record != null) ? (
                <Fragment>
                  <Picker
                    mode="dropdown"
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
                  <View style={styles.recordData}>
                    <View style={styles.badges}>
                      {this.props.record.map((r,i) => (
                        <Badge
                          key={i}
                          component={TouchableOpacity}
                          onPress={() => this.handleBadgePress(r,i)}
                          containerStyle={{
                            backgroundColor: r.color,
                            marginBottom: 2.5
                          }}
                          value={r.seriesName}
                        />  
                      ))}
                    </View>
                    <View style={styles.recordChart}>
                      <ChartContainer
                        title={this.state.record.seriesName}
                        data={this.state.record.data}
                        type="line"
                      />
                    </View>
                  </View>                  
                  </Fragment>
              ) : (
                <ActivityIndicator 
                  size="large" 
                  color="red"
                />
              )}
            </Fragment>
          )}
        </View>
      </ScrollView>
    )
  }
}

export default Device;