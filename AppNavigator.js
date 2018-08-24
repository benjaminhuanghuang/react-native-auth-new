import React from "react";
import {
    createStackNavigator,
    createSwitchNavigator,
    createBottomTabNavigator
} from "react-navigation";

import Ionicons from "react-native-vector-icons/Ionicons";

//
import ListScreen from "./screens/ListScreen";
import CreateScreen from "./screens/CreateScreen";

// Navigator for the screens related to contacts
const StackNavigator = createStackNavigator({
    List: ListScreen,
    Create: CreateScreen,
}, {
        initialRouteName: 'List',
        navigationOptions: {
            headerTintColor: "#2A73E0"
        }
    });

StackNavigator.navigationOptions = {
    tabBarIcon: ({ focused, tintColor }) => (
        <Ionicons name={`ios-contacts${focused ? '' : '-outline'}`} size={25} color={tintColor} />
    ),
};


// Main navigator for the stack navigator add settings
import SettingsScreen from "./screens/SettingsScreen";
import MapScreen from "./screens/MapScreen";

const MainTabNavigator = createBottomTabNavigator({
    Data: StackNavigator,
    Map: MapScreen,
    Settings: SettingsScreen,
}, {
        tabBarOptions: {
            activeTabColor: "#a41034"
        }
    });


// Navigator for login sreen and the main navigator
import LonginScreen from "./screens/LoginScreen";

const AppNavigator = createSwitchNavigator({
    Main: MainTabNavigator,
    Login: LonginScreen
}, {
        initialRouteName: 'Login'
    });

export default AppNavigator;