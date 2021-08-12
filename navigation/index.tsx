import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';
import { ColorSchemeName } from 'react-native';
import ShowArticle from '../modules/home/ShowArticle';
import Step1 from '../screens/steps/Step1';
import Step2 from '../screens/steps/Step2';
import Step3 from '../screens/steps/Step3';
import Step4 from '../screens/steps/Step4';
import Step5 from '../screens/steps/Step5';

import { RootStackParamList } from '../types';
import BottomTabNavigator from './bottom-navigations/BottomTabNavigator';
import LinkingConfiguration from './bottom-navigations/LinkingConfiguration';

export default function Navigation( { colorScheme }: { colorScheme: ColorSchemeName } ) {
    return (
        <NavigationContainer
            linking={LinkingConfiguration}
            theme={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
            <RootNavigator />
        </NavigationContainer>
    );
}

const Stack = createStackNavigator<RootStackParamList>();
function RootNavigator() {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Step1" component={Step1} />
            <Stack.Screen name="Step2" component={Step2} />
            <Stack.Screen name="Step3" component={Step3} />
            <Stack.Screen name="Step4" component={Step4} />
            <Stack.Screen name="Step5" component={Step5} />
            <Stack.Screen name="ShowArticle" component={ShowArticle} />
            <Stack.Screen name="home" component={BottomTabNavigator} />
        </Stack.Navigator>
    );
}
