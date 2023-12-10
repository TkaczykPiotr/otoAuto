import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import 'react-native-gesture-handler';
import Main from './Screen/Main';
import Login from './Screen/Login';
import Registration from './Screen/Registration';
import DrawerPanel from './Screen/DrawerPanel';
import ChoosePhoto from "./Screen/ChoosePhoto";
import DetailsScreen from "./Screen/DetailsScreen";
import NoticeAll from "./Screen/NoticeAll";
import Notice from "./Screen/Notice";
import Account from "./Screen/Account";
import Search from "./Screen/Search";
import MyNotice from "./Screen/MyNotice";
import MyDetailsScreen from "./Screen/MyDetailsScreen";

const Stack = createStackNavigator();

function App() {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen
                    name="Main"
                    component={Main}
                    options={{headerShown: false}}
                />
                <Stack.Screen
                    name="Login"
                    component={Login}
                    options={{headerShown: false}}
                />
                <Stack.Screen
                    name="Registration"
                    component={Registration}
                    options={{headerShown: false}}
                />
                <Stack.Screen
                    name="DrawerPanel"
                    component={DrawerPanel}
                    options={{headerShown: false}}
                />
                <Stack.Screen
                    name="ChoosePhoto"
                    component={ChoosePhoto}
                    options={{headerShown: false}}
                />
                <Stack.Screen
                    name="DetailsScreen"
                    component={DetailsScreen}
                    options={{headerShown: false}}
                />
                <Stack.Screen
                    name="NoticeAll"
                    component={NoticeAll}
                    options={{headerShown: false}}
                />
                <Stack.Screen
                    name="Notice"
                    component={Notice}
                    options={{headerShown: false}}
                />
                <Stack.Screen
                    name="Account"
                    component={Account}
                    options={{headerShown: false}}
                />
                <Stack.Screen
                    name="Search"
                    component={Search}
                    options={{headerShown: false}}
                />
                <Stack.Screen
                    name="MyNotice"
                    component={MyNotice}
                    options={{headerShown: false}}
                />
                <Stack.Screen
                    name="MyDetailsScreen"
                    component={MyDetailsScreen}
                    options={{headerShown: false}}
                />
            </Stack.Navigator>
        </NavigationContainer>
    );
}

export default App;
