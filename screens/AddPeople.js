import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';

class AddPeaopleScreen extends Component {
  static navigationOptions = (props) => ({
    title: 'New Entry'
  })

  constructor(props) {
    super(props);
  }
}
