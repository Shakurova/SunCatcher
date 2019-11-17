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
    title: "Home"
  }
  render() {
    return (
      <View style={styles.container}>
        <ScrollView
          style={styles.container}
          contentContainerStyle={styles.contentContainer}>
            <View style={styles.outerMargin}>
              <CircleProgress style={styles.circleProgress} />
            </View>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#eee"
  },
  outerMargin: {
    margin: 15
  }
});
