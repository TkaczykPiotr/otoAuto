import * as React from 'react';
import {StyleSheet} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import 'react-native-gesture-handler';
import Home from './Home';
import Main from './Main';
import Notice from './Notice';


const Tab = createBottomTabNavigator();

function TabPanel() {
    return (
            <Tab.Navigator>
                <Tab.Screen name="Home" component={Main}/>
                <Tab.Screen name="Profile" component={Home}/>
                <Tab.Screen name="Settings" component={Notice}/>
            </Tab.Navigator>
    );
}

const styles = StyleSheet.create({});

export default TabPanel;
