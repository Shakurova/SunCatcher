import React from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity
} from "react-native";
import { BarChart, XAxis } from "react-native-svg-charts";
import * as scale from "d3-scale";

export default class ChartBar extends React.PureComponent {
  render() {
    const fill = "rgb(134, 65, 244)";
    const data = [14, 80, 100, 55];

    return (
      <View style={{ height: 200, padding: 20 }}>
        <BarChart
          style={{ flex: 1 }}
          data={data}
          gridMin={0}
          svg={{ fill: "rgb(134, 65, 244)" }}
        />
        <XAxis
          style={{ marginTop: 10 }}
          data={data}
          contentInset={{left: 10, right: 10}}
          scale={scale.scaleBand}
          formatLabel={(value, index) => index}
          labelStyle={{ color: "black" }}
        />
      </View>
    );
  }
}
