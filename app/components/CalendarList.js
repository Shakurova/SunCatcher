import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  Modal,
  ScrollView,
  Picker,
  StatusBar,
  SafeAreaView
} from "react-native";
import * as Calendar from "expo-calendar";
import * as Permissions from "expo-permissions";

import moment from "moment";

class CalendarList extends Component {

    state = {
        refresh: false,
        data: [
            {"from": "2019-11-17T12:00:00.000Z", "type": "sunny", "title": "Sunny Weather"},
            {"from": "2019-11-19T12:00:00.000Z", "type": "sunny", "title": "Sunny Weather"},
            {"from": "2019-11-20T12:00:00.000Z", "type": "sunny", "title": "Sunny Weather"},
            {"from": "2019-11-20T13:00:00.000Z", "type": "sunny", "title": "Sunny Weather"},
            {"from": "2019-11-20T14:00:00.000Z", "type": "sunny", "title": "Sunny Weather"},
            {"from": "2019-11-20T15:00:00.000Z", "type": "sunny", "title": "Sunny Weather"}
        ],
        calendars: [],
        selectedCalendar: "",
        modalVisible: false,
        stickyHeaderIndices: []
    }
    
  addEvent = (event, title, from) => {
    
  };
  setModalVisible = (visible) => {
    this.setState({ modalVisible: visible });
  }
  render() {
    const emptyList = (
      <View key={"-1"} style={styles.topText}>
        <Text>
          You don't have any calendar events yet.
        </Text>
      </View>
    );
    return (
        <View>

          <Modal
            animationType="slide"
            transparent={false}
            visible={this.state.modalVisible}
            onRequestClose={() => {
              // Alert.alert('Modal has been closed.');
            }}>
            <View style={{ marginTop: 22 }}>
              <View>
                <Text>Hello World!</Text>
                <Picker
                  selectedValue={this.state.selectedCalendar}
                  style={{ height: 50, width: 100 }}
                  onValueChange={(itemValue, itemIndex) => this.setState({ calendarSelection: itemValue })}>
                  {this.state.calendars.map(obj => <Picker.Item label={obj.title} value={obj.id} />)}
                </Picker>

                <TouchableHighlight
                  onPress={() => {
                    this.setCalendarEvent(itemValue )
                    this.setModalVisible(!this.state.modalVisible);
                  }}>
                  <Text>Submit</Text>
                </TouchableHighlight>
              </View>
            </View>
          </Modal>

          <FlatList
            styles={styles.timeline}
            data={this.state.data}
            ListEmptyComponent={emptyList}
            refreshing={this.state.refresh}
            onRefresh={() => this.setState({refresh: false})}
            keyExtractor={(_, index) => index.toString()}
            onEndReached={() => this.fetchTimeline()}
            stickyHeaderIndices={stickyHeaderIndices}
            removeClippedSubviews={false}
            renderItem={({ item }) => {
              if (item.type === "sunny") {
                return (
                  <TouchableOpacity onPress={event => this.addEvent(event, item.title, item.from)}>
                    <View style={[styles.calendarItem, styles.sunny]}>
                        <Text style={styles.title}>{item.title}</Text>
                        <Text style={styles.dateobject}>{moment(item.from).format("dddd, MMMM Do, hA")}</Text>
                    </View>
                  </TouchableOpacity>
                );
              } else {
                return (
                  <View style={styles.calendarItem}>
                    <Text style={styles.title}>{item.title}</Text>
                    <Text style={styles.dateobject}>{moment(item.from).format("dddd, MMMM Do, hA")}</Text>
                  </View>
                );
              }
            }}
          />
        </View>
    );
  }


  getCalendarPermissions = async () => {
    const { status, expires, permissions } = await Permissions.getAsync(
      Permissions.CALENDAR
    );
    console.log("status", status);
    console.log("permissions", permissions);
    if (status !== "denied") {
      if (status === "undetermined") {
        const { newStatus, newPermissions } = await Permissions.askAsync(Permissions.CALENDAR);
        console.log("newStatus", newStatus);
        const { status2, expires2, permissions2 } = await Permissions.getAsync(
          Permissions.CALENDAR
        );
        console.log("status2", status2);
        return (status === "granted" || newStatus === "granted" || status2 === "granted")
      }
      if(status === "granted"){
        return true
      }
    }
    return false
  }

  compareDates = (a, b) => {
    let keyA = new Date(a.from);
    let keyB = new Date(b.from);
    if (keyA < keyB) return -1;
    if (keyA > keyB) return 1;
    return 0;
  }

  checkEventoverlap = (weatherData, events) => {
    let newEvents = weatherData.filter(obj => {
      let weatherFrom = new Date(obj["from"]);
      events.forEach(event => {
        if(weatherFrom > new Date(event["startDate"]) && 
            weatherFrom < new Date(event["endDate"])) {
              return false
            }
      })
      return true
    })

    return newEvents
  }

  addStickyHeaderIndices = sortedEvents => {
    stickyHeaderIndices = [];
      sortedEvents.reduce((acc, item, index, arr) => {

      let currentTime = moment(item["from"]).startOf("day");
      let previousTime = moment(arr[index + 1]["from"]).startOf("day");
      let diff = currentTime.diff(previousTime, "days");
      if (diff > 0) {
        acc.push({
          from: previousTime.clone(),
          dateobject: true
        });

        stickyHeaderIndices.push(
          index + 1
        );
      }
    })
    this.setState({
      stickyHeaderIndices: stickyHeaderIndices
    })


  }


  async componentDidMount() {
    const res = await this.getCalendarPermissions();
    if(res){
      calendars = await Calendar.getCalendarsAsync(Calendar.EntityTypes.EVENT);
      this.setState({
        calendars: calendars
      });
      console.log("calendar", calendars);
      let new_date = new Date().setDate(new Date().getDate() + 7)
      let events = await Calendar.getEventsAsync([calendars.map(obj => obj["id"])], new Date(), new_date);
      console.log("events", events);
      let newWeatherData = this.checkEventoverlap(this.state.data, events);


      this.setState({
        data: [
          ...newWeatherData,
          ...events.map(obj => ({ "from": obj["startDate"], "type": "event", "title": obj["title"] }))
        ]
      });

      const sortedEvents = this.state.data.sort(this.compareDates)

      this.addStickyHeaderIndices(sortedEvents);

      this.setState({
        data: sortedEvents
      })
      
    }

    // this.props.refreshTimeline();
  }
  componentWillReceiveProps(nextProps) {
    console.log("stickyHeaderIndices", nextProps.stickyHeaderIndices);
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  dateobject: {
    fontSize: 14,
    color: "#32214e"
  },
  title: {
    color: "#32214e",
    fontWeight: "bold"
  },
  sunny: {
    backgroundColor: "rgba(253, 184, 19, 0.5)"
  },
  calendarItem: {
    marginTop: 10,
    marginBottom: 10,
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
    paddingRight: 10
  }
});


export default CalendarList;
