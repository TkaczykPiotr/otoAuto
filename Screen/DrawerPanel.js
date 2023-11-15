import * as React from 'react';
import {StyleSheet} from 'react-native';
import {createDrawerNavigator} from '@react-navigation/drawer';
import 'react-native-gesture-handler';
import Home from './Home';
import Account from './Account';
import Offer from './Offer';
import NoticeAll from './NoticeAll';
import Add_Off from './Add_Off';
import Camera from './Camera';
import Search from "./Search";
import ChoosePhoto from "./ChoosePhoto";

const Drawer = createDrawerNavigator();

function DrawerPanel() {
    return (
        <Drawer.Navigator>
            <Drawer.Screen name="Home" component={Home}/>
            <Drawer.Screen name="Offer" component={Offer}/>
            <Drawer.Screen name="Account" component={Account}/>
            <Drawer.Screen name="Search" component={Search}/>
            <Drawer.Screen name="Notice" component={NoticeAll}/>
            <Drawer.Screen name='Add Offer' component={Add_Off}/>
            <Drawer.Screen name='Camera' component={Camera}/>
            <Drawer.Screen name='Choose Photo' component={ChoosePhoto}/>
        </Drawer.Navigator>
    );
}

const styles = StyleSheet.create({});

export default DrawerPanel;
