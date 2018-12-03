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
import monthLabel from "../../utils/monthLabel";
import PureChart from 'react-native-pure-chart';
import MessageHandler from '../../utils/messageHandler';
import styles from './styles/monitor';
import getAllParams from "../../api/params/getAllParams";

class Monitor extends Component {

  constructor(props) {
    super(props);

    this.state = {
      actual: null,
      fetching: true,
      historial: [],
      current: [],
      power: [],
    }
    this.messageHandler = new MessageHandler();
  }

  componentDidMount() {
    this.props.getAllMonths();
  }

  componentDidUpdate(prevProps) {
    const data = this.props.data;
    if(prevProps.fetching && !this.props.fetching) {
      console.log('MONITOR DID MOUNT UPDATED');
      this.props.setAllMonths(data);
      this.getMonthParams(data[data.length-1])
    }
    if(!prevProps.error && this.props.error) {
      this.messageHandler.errorMessage(this.props.errorMessage);
    }
  }

  getMonthParams(actual) {
    console.log('FETCH MONTH PARAMS: ');
    this.setState({
      actual: actual
    });
    getAllParams({
      year: actual.year,
      month: actual.month
    }, this.props.token)
    .then(data => {
      console.log(data[0].data)
      this.setState({
        fetching: false,
        historial: data,
        current: data[0].data,
        power: data[1].data
      })
    })
    .catch(err => {
      this.setState({
        fetching: false
      })
      this.messageHandler.errorMessage(err.message);
    })
  }

  render() {
    const {dates} = this.props;

    return (
      <View style={styles.root}>
        <Picker
          selectedValue={this.state.actual}
          style={{ height: 50, width: 200, marginTop: 20 }}
          onValueChange={(item) => this.getMonthParams(item)}
        >
          {dates.map((m,i) => 
            <Picker.Item
              key={i}
              label={monthLabel(m.month) + " " + m.year}
              value={m}
            />
          )}
        </Picker>
        <View style={styles.chartContainer}>          
          {(!this.state.fetching) ? (
            <View>
              <View style={styles.chart}>
                <Text> Corriente </Text>
                <PureChart
                  data={this.state.current}
                  type='line'
                />
                <View style={styles.badgesContainer}>
                  {this.state.current.map(c => (
                    <Badge
                      key={c.id}
                      containerStyle={{backgroundColor:c.color}}
                      value={c.seriesName}
                    />
                  ))}
                </View>
              </View>
              <View style={styles.chart}>
                <Text> Potencia </Text>
                <PureChart
                  data={this.state.power}
                  type='line'
                />
                <View style={styles.badgesContainer}>
                  {this.state.power.map(c => (
                    <Badge
                      key={c.id}
                      containerStyle={{backgroundColor:c.color}}
                      value={c.seriesName}
                    />
                  ))}                  
                </View>
              </View>
            </View>
          ) : (
            <ActivityIndicator 
              size="large" 
              color="red"
            />
          )}
        </View>
      </View>
    )
  }
}

export default Monitor;