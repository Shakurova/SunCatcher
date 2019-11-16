import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';

import TabBarIcon from '../components/TabBarIcon';
import HomeScreen from '../screens/HomeScreen';
import ScheduleScreen from '../screens/ScheduleScreen';
import ProgressScreen from '../screens/ProgressScreen';

const config = Platform.select({
  web: { headerMode: 'screen' },
  default: {},
});

const HomeStack = createStackNavigator(
  {
    Home: HomeScreen,
  },
  config
);

HomeStack.navigationOptions = {
  tabBarLabel: 'Home',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={
        Platform.OS === 'ios'
          ? `ios-home`
          : 'md-home'
      }
    />
  ),
};

HomeStack.path = '';

const ScheduleStack = createStackNavigator(
  {
    Schedule: ScheduleScreen,
  },
  config
);

ScheduleStack.navigationOptions = {
  tabBarLabel: 'Schedule',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon focused={focused} name={Platform.OS === 'ios' ? 'ios-calendar' : 'md-calendar'} />
  ),
};

ScheduleStack.path = '';

const ProgressStack = createStackNavigator(
  {
    Progress: ProgressScreen,
  },
  config
);

ProgressStack.navigationOptions = {
  tabBarLabel: 'Progress',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon focused={focused} name={Platform.OS === 'ios' ? 'ios-podium' : 'md-podium'} />
  ),
};

ProgressStack.path = '';

const tabNavigator = createBottomTabNavigator({
  HomeStack,
  ScheduleStack,
  ProgressStack,
});

tabNavigator.path = '';

export default tabNavigator;
