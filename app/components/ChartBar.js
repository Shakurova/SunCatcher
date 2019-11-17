import React from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity
} from "react-native";
import { StackedBarChart, XAxis, YAxis } from "react-native-svg-charts";
import * as scale from "d3-scale";
import * as d3Line from 'd3-shape';
import moment from "moment";


export default class ChartBar extends React.PureComponent {
  render() {
    const data = [
      { "month": new Date(2019, 11, 11), "walked": 19, "walked_in_the_sun": 10 },
      {
        month: new Date(2015, 11, 12),
        walked: 16,
        walked_in_the_sun: 4,
      },
      {
        month: new Date(2015, 11, 13),
        walked: 18,
        walked_in_the_sun: 9,
      },
      {
        month: new Date(2015, 11, 14),
        walked: 45,
        walked_in_the_sun: 30,
      },
      {
        month: new Date(2015, 11, 15),
        walked: 70,
        walked_in_the_sun: 45,
      },
      {
        month: new Date(2015, 11, 16),
        walked: 30,
        walked_in_the_sun: 10,
      },
      {
        month: new Date(2015, 11, 17),
        walked: 10,
        walked_in_the_sun: 0,
      }];

    const colors = ['#ffc843', '#ececea']
    const keys = ['walked', 'walked_in_the_sun']
    return (
      <View style={styles.container}>
        <YAxis
          data={data}
          svg={{
            fill: "grey",
            fontSize: 10
          }}
          numberOfTicks={10}
          formatLabel={value => `${value}`}
        />

        <StackedBarChart
          style={{ height: "100%" }}
          keys={keys}
          colors={colors}
          data={data}
          showGrid={false}
          contentInset={{ top: 30, bottom: 30 }}
          curve={d3Line.line()}
        />
        <XAxis
          style={{ marginTop: 10 }}
          data={data}
          contentInset={{ left: 10, right: 10 }}
          scale={scale.scaleBand}
          formatLabel={(value, index) =>
            moment()
              .isoWeekday(index + 1)
              .format("ddd")
          }
          labelStyle={{ color: "black" }}
        />
      </View>
    );
  }

  async componentDidMount() {

      const response = await fetch(`http://167.172.241.205/week?user_id=${Constants.installationId}`);
      const data = await response.json();
      this.setState({
        data: data.map(obj => ({
          date: moment(obj["date"]),
          walked: obj["walked"],
          walked_in_the_sun: obj["walked_in_the_sun"]
        }))
      })
  }
}


const styles = StyleSheet.create({
  container: {
    height: 400,
    padding: 20

  }
  
  
});
