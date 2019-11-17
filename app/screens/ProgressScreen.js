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
    title: ""
  }
  render() {  
    return (
      <View style={styles.progress}>
        <View style={styles.weeklyView}>
          <Text style={styles.weeklyText}>Weekly Progress</Text>
        </View>
        <ChartBar />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  weeklyView: {
    justifyContent: "flex-start"
  },
  weeklyText: {
    fontSize: 42,
    marginTop: -20,
    textAlign: "center",
  },
  container: {
    flex: 1,
    paddingTop: 15,
  },

  progress: {
    margin: 10,
    height: "100%",
    justifyContent: "center"
  }
});
