import React from 'react';
import {
  StyleSheet,
  ScrollView,
  Text,
  View,
  FlatList,
  TouchableOpacity
} from "react-native";

import Calendar from "../components/Calendar";
// import Agenda from "../components/Agenda";

export default class ScheduleScreen extends React.Component {
  static navigationOptions = {
    title: "Schedule"
  }
  render() {
    return (
      <ScrollView style={styles.container}>
        <Calendar/>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: '#fff',
  },
});
