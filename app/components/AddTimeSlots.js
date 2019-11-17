import React, { Component } from 'react';
import { StyleSheet, Text, View, FlatList, TouchableOpacity, Button, Modal } from 'react-native';
import * as Calendar from "expo-calendar";
class AddTimeSlots extends Component {
    constructor(props) {
        super(props);
    }

    askWhichCalendar = (data) => {
      
    }
    render() {
        return (
          <View style={styles.addTimeSlots}>
            <View style={styles.tableGrid}>
              <View style={styles.child}>
                <Text style={[styles.text, styles.textHeader]}>From:</Text>
              </View>
              <View style={styles.child}>
                <Text style={[styles.text, styles.textHeader]}>To:</Text>
              </View>
              <View style={styles.child}></View>
              <View style={styles.child}>
                <Text style={styles.text}>12:00</Text>
              </View>
              <View style={styles.child}>
                <Text style={styles.text}>14:00</Text>
              </View>
              <View style={styles.child}>
                <Button
                  title="Add"
                  onPress={() => Alert.alert("Simple Button pressed")}
                />
              </View>
              <View style={styles.child}>
                <Text style={styles.text}>12:00</Text>
              </View>
              <View style={styles.child}>
                <Text style={styles.text}>14:00</Text>
              </View>
              <View style={styles.child}>
                <Button
                  title="Add"
                  onPress={() => Alert.alert("Simple Button pressed")}
                />
              </View>
            </View>
          </View>
        );
    }
    componentDidMount() {
      
    }
}

const styles = StyleSheet.create({
  addTimeSlots: {
    marginTop: 20,
    marginBottom: 20,
    borderRadius: 5,
    backgroundColor: "#fff",
    shadowColor: "rgba(204, 204, 204, 0.5)",
    shadowOffset: {
      width: 2,
      height: 4
    },
    paddingTop: 10,
    paddingBottom: 16,
    shadowRadius: 8,
    shadowOpacity: 1,
    paddingLeft: 10,
    paddingRight: 10,
    alignItems: "center"
  },
  tableGrid: {
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap"
  },
  child: {
    width: "33.33%",
    fontSize: 18,
    marginTop: 4,
    marginBottom: 4
  },
  text: {
    textAlign: "center",
    fontSize: 18,
    margin: 8
  },
  textHeader: {
    fontWeight: "bold",
    marginBottom: 0
  }
});

export default AddTimeSlots;
