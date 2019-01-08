import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text } from 'react-native-elements';
import PureChart from 'react-native-pure-chart';

const ChartContainer = ({ data, title }) => (
  <View style={styles.container}>
    <View style={styles.title}>
      <Text h4>{title}</Text>
    </View>
    <View style={styles.chart}>
      <PureChart
        data={data}
        width="100%"
        height={100}
        type='line'
      />
    </View>
  </View>
)

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderColor: 'blue',
  },
  title: {
    marginBottom: 10,
    alignItems: 'center'
  },
  chart: {
    marginRight: 35,
  },
})

export default ChartContainer;