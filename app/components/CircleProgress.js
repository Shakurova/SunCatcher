import React, { Component } from 'react';
import { StyleSheet, Text, View, FlatList, TouchableOpacity } from 'react-native';
import Svg, { Circle, Rect, ClipPath, Defs } from "react-native-svg";

class CircleProgress extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
          <View style={styles.circleProgress}>
            <View>
              <Text style={styles.text}>Hang in there!</Text>
            </View>

            <View
              style={[
                StyleSheet.absoluteFill,
                styles.graph
              ]}
            >
              <Svg height="100%" width="100%" viewBox="0 0 100 100">
                <Defs>
                  <ClipPath id="clip">
                    <Rect x="0" y="50" width="100" height="50" />
                  </ClipPath>
                </Defs>
                <Circle
                  cx="50"
                  cy="50"
                  r="45"
                  stroke="blue"
                  strokeWidth="2.5"
                  fill="transparent"
                //   clipPath="#clip"
                />
              </Svg>
              <View style={styles.extraSpace}>
                <Text style={styles.text}>15/30</Text>
              </View>
            </View>
          </View>
        );
    }
    componentDidMount() {

    }
}

const styles = StyleSheet.create({
  circleProgress: {
    marginTop: 20,
    marginBottom: 20,
    height: 500,
    borderRadius: 5,
    backgroundColor: "#ffffff",
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
  graph: {
    alignItems: "center",
    justifyContent: "center",
    height: 450,
    marginTop: 24
  },
  text: {
    fontSize: 18,
    marginBottom: 24
  },
  extraSpace: {}
});

export default CircleProgress;
