import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity
} from "react-native";
import ChartBar from "../components/ChartBar";


export default class ProgressScreen extends React.Component {
  static navigationOptions = {
    title: "Your Progress"
  }
  render() {  
    return (
      <View style={styles.progress}>
        <ChartBar/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: "#fff"
  },
  progress: {
    margin: 10
  }
});
