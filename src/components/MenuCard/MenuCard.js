import React, { Component } from 'react';
import { View, TouchableOpacity } from 'react-native';
import { Card } from 'react-native-elements';
import styles from './styles';
import styled from 'styled-components/native';

export default ({ title, image, onPress }) => (
  <TouchableOpacity 
    onPress={onPress}
    style={{
      marginTop: 20,
      marginLeft: 40,
      marginRight: 40,
      backgroundColor: 'blue'
    }}
  >
    <Card
      containerStyle={{
        margin: 0,
      }}
      imageProps={{
        resizeMode: 'contain'
      }}
      title={title}
      image={image}
    >

    </Card>
  </TouchableOpacity>
);