import * as WebBrowser from 'expo-web-browser';
import React from 'react';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import CircleProgress from "../components/CircleProgress";


export default class HomeScreen extends React.Component {
  static navigationOptions = {
  }
  render() {
    return (
      <View style={styles.container}>
        <ScrollView
          style={styles.container}
          contentContainerStyle={styles.contentContainer}
        >
          <View style={styles.outerMargin}>
            <Text style={styles.weeklyText}>Daily Progress</Text>

            <CircleProgress style={styles.circleProgress} />
          </View>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  weeklyText: {
    fontSize: 42,
    marginTop: -20,
    textAlign: "center"
  },
  outerMargin: {
    paddingTop: 30,
    margin: 15
  }
});
