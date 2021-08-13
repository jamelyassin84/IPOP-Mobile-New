
import * as React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { BottomTabParamList } from '../../types/NavTpyes';
import Colors from '../../constants/Colors';
import useColorScheme from '../../hooks/useColorScheme';

import AboutScreen from "../../modules/about/About";
import HomeScreen from "../../modules/home/Home";
import MenuScreen from "../../modules/menus/Menus";
import ProgramAreaScreen from "../../modules/programs/ProgramArea";
import ServicesScreen from "../../modules/services/Services";

import { AntDesign } from '@expo/vector-icons';
import { SimpleLineIcons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';

const BottomTab = createBottomTabNavigator<BottomTabParamList>();

export default function BottomTabNavigator() {
    const colorScheme = useColorScheme();

    return (
        <BottomTab.Navigator
            initialRouteName="Home"
            tabBarOptions={{
                activeTintColor: Colors[ colorScheme ].tint,
                style: {
                    backgroundColor: 'black',
                },

            }}>
            <BottomTab.Screen
                name="Home"
                component={HomeNavigator}
                options={{
                    tabBarIcon: ( { color } ) => <AntDesign name="home" size={26} color={color} />,
                }}
            />
            <BottomTab.Screen
                name="Program Areas"
                component={ProgramAreaNavigator}
                options={{
                    tabBarIcon: ( { color } ) => <MaterialCommunityIcons name="radar" size={26} color={color} />,
                }}
            />
            <BottomTab.Screen
                name="About Us"
                component={AboutNavigator}
                options={{
                    tabBarIcon: ( { color } ) => <Feather name="users" size={26} color={color} />,
                }}
            />
            <BottomTab.Screen
                name="Services"
                component={ServicesNavigator}
                options={{
                    tabBarIcon: ( { color } ) => <SimpleLineIcons name="notebook" size={26} color={color} />,
                }}
            />
            <BottomTab.Screen
                name="More"
                component={MenuNavigator}
                options={{
                    tabBarIcon: ( { color } ) => <SimpleLineIcons name="menu" size={26} color={color} />,
                }}
            />
        </BottomTab.Navigator>
    );
}

const Home = createStackNavigator<any>();
export function HomeNavigator() {
    return (
        <Home.Navigator>
            <Home.Screen
                name="Home"
                component={HomeScreen}
                options={{ headerShown: false }}
            />
        </Home.Navigator>
    );
}

const About = createStackNavigator<any>();
export function AboutNavigator() {
    return (
        <About.Navigator>
            <About.Screen
                name="About Us"
                component={AboutScreen}
                options={{ headerShown: false }}
            />
        </About.Navigator>
    );
}

const Program = createStackNavigator<any>();
export function ProgramAreaNavigator() {
    return (
        <Program.Navigator>
            <Program.Screen
                name="Program Areas"
                component={ProgramAreaScreen}
                options={{ headerShown: false }}
            />
        </Program.Navigator>
    );
}

const Services = createStackNavigator<any>();
export function ServicesNavigator() {
    return (
        <Services.Navigator>
            <Services.Screen
                name="Services Offered"
                component={ServicesScreen}
                options={{ headerShown: false }}
            />
        </Services.Navigator>
    );
}

const Menu = createStackNavigator<any>();
export function MenuNavigator() {
    return (
        <Menu.Navigator>
            <Menu.Screen
                name="More"
                component={MenuScreen}
                options={{ headerShown: false }}
            />
        </Menu.Navigator>
    );
}
