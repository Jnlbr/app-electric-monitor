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

class Monitor extends Component {

  static navigationOptions = {
    title: 'Monitor',
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

    this.state = {
      actual: null,
      current: [],
      power: []
    }
    this.messageHandler = new MessageHandler();
  }

  componentDidMount() {
    this.props.getAllMonths();
  }

  componentDidUpdate(prevProps) {    
    if(prevProps.monthsFetching && !this.props.monthsFetching) {
      const months = this.props.months;
      this.getRecord(months[months.length-1])
      console.log('GET RECORD')
    }
    if(!prevProps.record && this.props.record) {
      console.log(this.props.record)
      this.setState({
        current: this.props.record.current,
        power: this.props.record.power
      })
    }
    if(!prevProps.monthsError && this.props.monthsError) {
      this.messageHandler.errorMessage(this.props.monthsErrorMessage);
    }
    if(!prevProps.recordError && this.props.recordError) {
      this.messageHandler.errorMessage(this.props.recordErrorMessage);
    }
  }

  getRecord(actual) {
    this.setState({
      actual: actual
    });
    this.props.getAllRecord({
      year: actual.year,
      month: actual.month
    })
  }

  render() {
    const {months} = this.props;

    return (
      <View style={styles.root}>
        <Picker
          selectedValue={this.state.actual}
          style={{ height: 50, width: 200, marginTop: 20 }}
          onValueChange={(item) => this.getRecord(item)}
        >
          {months.map((m,i) => 
            <Picker.Item
              key={i}
              label={monthLabel(m.month) + " " + m.year}
              value={m}
            />
          )}
        </Picker>
        <View style={styles.chartContainer}>          
          {(!this.props.recordFetching) ? (
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