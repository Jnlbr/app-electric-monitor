import React, { Component, Fragment } from 'react';
import { 
  View,
  Picker,
  Button,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator
} from 'react-native';
import {
  Text,
  Badge,
} from 'react-native-elements';
import colors from '../../contants/colors';
import monthLabel from "../../utils/monthLabel";
import PureChart from 'react-native-pure-chart';
import MessageHandler from '../../utils/messageHandler';
import styles from './styles';
import { ChartContainer, Loading } from '../../components';

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
      selected: 0,

      record: null,
      current: [],
      power: [],
      isEmpty: false
    }
    this.messageHandler = new MessageHandler();
  }

  componentDidMount() {
    this.props.getAllMonths();
  }

  componentDidUpdate(prevProps) {    
    if(prevProps.monthsFetching && !this.props.monthsFetching) {
      const months = this.props.months;
      if(months.length > 0) {
        this.getRecord(months[months.length - 1])
        this.setState({ isEmpty: false });
      } else {
        this.setState({ isEmpty: true });
      }
    }
    if(prevProps.recordFetching && !this.props.recordFetching) {
      let record = this.props.record[this.state.selected];
      const total = this.props.record[0].total;

      this.setState({
        record,
        current: total.current,
        power: total.power
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

  handleBadgePress = (record, selected) => this.setState({record,selected})

  render() {
    const { months } = this.props;
    console.log(this.state.current)
    return (
      <ScrollView style={styles.root}>
        {(this.state.isEmpty) ? (
          <View style={{marginTop: 20, alignItems: 'center', flex: 1, justifyContent: 'center'}}>
            <Text h4 style={{ marginBottom: 10 }}>
              No hay datos disponibles
            </Text>
            <Button title="Ir atras" onPress={() => this.props.navigation.goBack()} />
          </View>
        ) : (
          <Fragment>
            {(this.props.monthsFetching || this.props.recordFetching) ? (
          <View style={{flex: 1, marginTop: 250, alignItems: 'center', justifyContent: 'center'}}>
            <ActivityIndicator 
              size="large"
              color={colors.secondary.main}
            />
          </View>
        ) : (
          <Fragment>
            <Picker
              mode="dropdown"
              selectedValue={this.state.actual}
              style={styles.picker}
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
            {(this.state.record != null) && (
              <Fragment>
                <View style={styles.devices}>
                  <Badges data={this.state.record.data} />
                </View>
                  <View style={styles.badgesContainer}>
                    {this.props.record.map((r, i) => (
                      <Badge
                        onPress={() => this.handleBadgePress(r, i)}
                        component={TouchableOpacity}
                        key={i}
                        containerStyle={{
                          backgroundColor: colors.secondary.main,
                          marginBottom: 2.5
                        }}
                        value={r.seriesName}
                      />
                    ))}
                  </View>
                <View style={styles.chartContainer}>
                  <View style={styles.chart}>
                    <ChartContainer
                      title={this.state.record.seriesName}
                      data={this.state.record.data}
                    />
                  </View>
                </View>
                <View style={styles.totalChart}>
                  <Text h4 style={{ marginBottom: 10}}> Consumo total </Text>
                  {(this.state.selected === 0) ? (
                    <PureChart
                      type="pie"
                      data={this.state.current}
                    />
                  ):(
                    <PureChart
                      type="pie"
                      data={this.state.power}
                    />
                  )}
                </View>
              </Fragment>
            )}
          </Fragment>
        )}
          </Fragment>
        )}
      </ScrollView>
    )
  }
}

const Badges = ({data}) => (
  <Fragment>
    {data.map(d => (
      <Badge
        key={d.id}
        containerStyle={{ 
          backgroundColor:d.color,
          marginRight: 2.5,
        }}
        value={d.seriesName}
      />
    ))}
  </Fragment>
)

export default Monitor;