import React from 'react';
import {
  StyleSheet,
  ScrollView,
  Text,
  View,
  FlatList,
  TouchableOpacity
} from "react-native";
// import AddTimeSlots from "../components/AddTimeSlots";
import CalendarList from "../components/CalendarList";

// import Calendar from "../components/Calendar";
// import Agenda from "../components/Agenda";

export default class ScheduleScreen extends React.Component {
  static navigationOptions = {
    title: "Schedule"
  }
  render() {
    return (
      <ScrollView style={styles.container}>
        <View style={styles.outerMargin}>
          <CalendarList/>
        </View>
      </ScrollView>
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
