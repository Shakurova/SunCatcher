import React from 'react';
import {
  StyleSheet,
  ScrollView,
  Text,
  View,
  FlatList,
  TouchableOpacity
} from "react-native";

export default class ScheduleScreen extends React.Component {
  static navigationOptions = {
    title: "Links"
  }
  render() {
    return (
      <ScrollView style={styles.container}>
        <View>
          <Text>
            ScheduleScreen
          </Text>
        </View>
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
