import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity
} from "react-native";
import BarChart from "../components/BarChart";


export default class ProgressScreen extends React.Component {
  static navigationOptions = {
    title: "Your Progress"
  }
  render() {  
    return (
    <View>
      <BarChart />
    </View>
    );
  }
}