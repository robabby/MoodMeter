import React, { Component } from "react";
import { AsyncStorage, StyleSheet,  ScrollView } from "react-native";
import { Button, InputItem, List, WingBlank } from "@ant-design/react-native";
import { login } from "../lib/auth";
import { connect } from "react-redux";
import * as actions from "../actions";

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
    // await AsyncStorage.removeItem("token");
    const userToken = await AsyncStorage.getItem("token");

    // This will switch to the App screen or Auth screen and this loading
    // screen will be unmounted and thrown away.
    this.props.navigation.navigate(userToken ? 'App' : 'Auth');
  };

  handleLogin = async () => {
    const { username, password } = this.state;
    await login(username, password).then(async data => {
      const token = await AsyncStorage.getItem("token");

      if (token) {
        this.onAuthComplete();
      }
    })
  }

  onAuthComplete() {
    this.props.navigation.navigate('Home');
  }

  render() {
    return (
      <ScrollView 
        contentContainerStyle={styles.container}
        keyboardShouldPersistTaps="never"
      >
        <List style={{ marginTop: 15, width: "100%" }}>
          <InputItem
            clear
            onChange={username => {
              this.setState({
                username,
              });
            }}
            placeholder="Username or Email"
            value={this.state.username}
          />
          <InputItem
            clear
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
              onPress={this.handleLogin}
              size="large"
              style={{ marginTop: 15 }}
              type="primary"
            >
              Login
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
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  },
});

function mapStateToProps({ auth }) {
  return { token: auth.token };
}

export default connect(mapStateToProps, actions)(AuthScreen);
