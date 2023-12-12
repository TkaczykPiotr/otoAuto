import * as React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import 'react-native-gesture-handler';
import Home from './Home';
import Account from './Account';;
import NoticeAll from './NoticeAll';
import Add_Off from './Add_Off';
import Search from "./Search";
import MyNotice from "./MyNotice";

const Drawer = createDrawerNavigator();

function DrawerPanel() {
    return (
        <Drawer.Navigator >
            <Drawer.Screen name="Strona Domowa" component={Home}/>
            <Drawer.Screen name="Konto" component={Account}/>
            <Drawer.Screen name="Wyszukaj" component={Search}/>
            <Drawer.Screen name="Ogłoszenia" component={NoticeAll}/>
            <Drawer.Screen name="Moje Ogłoszenia" component={MyNotice}/>
            <Drawer.Screen name='Dodaj Ogłoszenie' component={Add_Off}/>
        </Drawer.Navigator>
    );
}
export default DrawerPanel;
