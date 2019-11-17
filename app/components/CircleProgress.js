import React, { Component } from 'react';
import { StyleSheet, Text, View, FlatList, TouchableOpacity } from 'react-native';
import Svg, { Circle, Rect, ClipPath, Defs } from "react-native-svg";
import Constants from "expo-constants";

class CircleProgress extends Component {
    constructor(props) {
        super(props);
    }
    state = {
      minutes: 0,
      percentage: 0,
      topText: "Hey! Today you've already walked for"
    }
    render() {
        return (
          <View style={styles.circleProgress}>
            <View>
              <Text style={styles.text}>{this.state.topText}</Text>
            </View>

            <View style={[StyleSheet.absoluteFill, styles.graph]}>
              <Text style={styles.percentage}>{this.state.minutes} minutes</Text>
              <Svg height="100%" width="100%" viewBox="0 0 100 100">
                <Defs>
                  <ClipPath id="clip">
                    <Rect x="0" y={100 - this.state.percentage} width="100" height="100" />
                  </ClipPath>
                </Defs>
                <Circle
                  cx="50"
                  cy="50"
                  r="45"
                  stroke="#A17200"
                  strokeWidth="0.5"
                  fill="transparent"
                />
                <Circle
                  cx="50"
                  cy="50"
                  r="45"
                  stroke="#A17200"
                  strokeWidth="0.5"
                  fill="#FFC843"
                  clipPath="#clip"
                />
              </Svg>
              <View style={styles.extraSpace}>
                <Text style={styles.text}>{this.state.minutes > 15 ? "We are proud of you!" : "Don't forget to enjoy the Sun!"}</Text>
              </View>
            </View>
          </View>
        );
    }
    async componentDidMount() {
      if(this.state.minutes >= 30){
        this.setState({
          percentage: 100
        })
      } else {
        this.setState({
          percentage: Math.round((this.state.minutes / 30) * 100)
        })
      }


      const response = await fetch(`http://167.172.241.205/today?user_id=${Constants.installationId}`);
      const data = await response.json();
      this.setState({
        minutes: data["walked_in_the_sun"]
      })
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
  percentage: {
    position: "absolute",
    textAlign: "center",
    top: "40%",
    fontSize: 42,
    zIndex: 100
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
