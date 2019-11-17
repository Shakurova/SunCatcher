import React from 'react';
import {
  Image, Text, View, StyleSheet,
  Platform, StatusBar
 } from 'react-native';
import { Asset } from 'expo-asset';
import { AppLoading } from 'expo';
import * as Location from 'expo-location';
import * as TaskManager from "expo-task-manager";
import Constants from "expo-constants";
import AppNavigator from './navigation/AppNavigator';


export default class App extends React.Component {
  state = {
    isReady: false
  };

  render() {
    if (!this.state.isReady) {
      return (
        <AppLoading
          startAsync={this._cacheResourcesAsync}
          onFinish={() => this.setState({ isReady: true })}
          onError={console.warn}
        />
      );
    }

    return (
      <View style={styles.container}>
        {Platform.OS === 'ios' && <StatusBar barStyle="default" />}
        <AppNavigator />
      </View>
    );
  }

  componentDidMount = async () => {
    await Location.startLocationUpdatesAsync("GET_LOCATION", {
      accuracy: Location.Accuracy.Highest,
    });
  }

  async _cacheResourcesAsync() {
    // const images = [require('./assets/snack-icon.png')];

    // const cacheImages = images.map(image => {
    //   return Asset.fromModule(image).downloadAsync();
    // });
    // return Promise.all(cacheImages);
    return new Promise((res, rej) => setTimeout(res, 10))
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});


TaskManager.defineTask("GET_LOCATION", async ({ data, error }) => {
  if (error) {
    // Error occurred - check `error.message` for more details.
    return;
  }
  if (data) {
    const { locations } = data;
    if (locations.length > 0 && false) {
      const data = {
        "latitude": locations[0]["coords"]["latitude"],
        "longitude": locations[0]["coords"]["longitude"],
        "user_id": Constants.installationId,
        "timestamp": locations[0]["timestamp"]
      }
      console.log("data", data);
      const response = await fetch(`http://127.0.0.1/location`, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        method: "POST",
        body: JSON.stringify(data)
      });
      const res = await response.json();
    }
  }
});