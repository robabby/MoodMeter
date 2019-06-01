import React, { Component } from 'react';
import { View, Text, AsyncStorage } from 'react-native';
import { Button, InputItem, List, WingBlank } from '@ant-design/react-native';
import { strapiRegister } from "../lib/auth";
import { connect } from 'react-redux';
import * as actions from '../actions';

class AuthScreen extends Component {
  state = {
    email: '',
    password: '',
    username: ''
  };

  constructor(props) {
    super(props);
    this._bootstrapAsync();
  }

  _bootstrapAsync = async () => {
    // await AsyncStorage.clear();
    // await AsyncStorage.removeItem('fb_token');
    const userToken = await AsyncStorage.getItem('fb_token');

    console.log(userToken)

    // This will switch to the App screen or Auth screen and this loading
    // screen will be unmounted and thrown away.
    this.props.navigation.navigate(userToken ? 'App' : 'Auth');
  };

  // Captures the case when someone successfully logs into the application
  componentWillReceiveProps(nextProps) {
    this.onAuthComplete(nextProps);
  }

  handleFacebookLogin = () => {
    this.props.facebookLogin();
    this.onAuthComplete(this.props);
  }

  handleSignup = () => {
    const { username, email, password } = this.state;
    strapiRegister(username, email, password)
  }

  onAuthComplete(props) {
    if (props.token) {
      this.props.navigation.navigate('Home');
    }
  }

  render() {
    return (
      <View>
        <List style={{ marginTop: 15 }}>
          <InputItem
            clear
            error
            onChange={username => {
              this.setState({
                username,
              });
            }}
            placeholder="Username"
            value={this.state.username}
          />
          <InputItem
            clear
            error
            onChange={email => {
              this.setState({
                email,
              });
            }}
            placeholder="Email"
            value={this.state.email}
          />
          <InputItem
            clear
            error
            onChange={password => {
              this.setState({
                password,
              });
            }}
            placeholder="Password"
            type="password"
            value={this.state.password}
          />
          <WingBlank size="md">
            <Button
              onPress={this.handleSignup}
              size="large"
              style={{ marginTop: 15 }}
              type="primary"
            >
              Sign Up
            </Button>
          </WingBlank>
          <WingBlank size="md">
            <Button
              onPress={this.handleFacebookLogin}
              size="large"
              style={{ marginTop: 15 }}
              type="primary"
            >
              Facebook
            </Button>
          </WingBlank>
        </List>
      </View>
    );
  }
}

function mapStateToProps({ auth }) {
  return { token: auth.token };
}

export default connect(mapStateToProps, actions)(AuthScreen);
