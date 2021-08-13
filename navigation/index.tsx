import * as React from 'react';
import {
    NavigationContainer,
    DefaultTheme,
    DarkTheme
} from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { ColorSchemeName } from 'react-native';
import { RootStackParamList } from '../types';
import BottomTabNavigator from './bottom-navigations/BottomTabNavigator';
import LinkingConfiguration from './bottom-navigations/LinkingConfiguration';

import Step1 from '../screens/steps/Step1';
import Step2 from '../screens/steps/Step2';
import Step3 from '../screens/steps/Step3';
import Step4 from '../screens/steps/Step4';
import Step5 from '../screens/steps/Step5';

import Awards from '../modules/about/Awards';
import ContactUs from '../modules/about/ContactUs';
import CoreValues from '../modules/about/CoreValues';
import Directory from '../modules/about/Directory';
import Goals from '../modules/about/Goals';
import Mandate from '../modules/about/Mandate';
import OrgStructure from '../modules/about/OrgStructure';
import VMG from '../modules/about/VMG';
import ShowArticle from '../modules/home/ShowArticle';

import IssuesAndConcerns from '../modules/ahyd/IssuesAndConcerns';
import TeenCenter from '../modules/ahyd/TeenCenter';
import Births from '../modules/demographics/births/Births';
import Deaths from '../modules/demographics/deaths/Deaths';
import Marraiges from '../modules/demographics/marriages/Marraiges';
import Migrations from '../modules/demographics/migrations/Migrations';
import KeyFiles from '../modules/others/KeyFiles';
import PopulationData from '../modules/population/PopulationData';
import MPFCFDC from '../modules/rpfp/MPFCFDC';
import PMOC from '../modules/rpfp/PMOC';

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

            <Stack.Screen name="Mandate" component={Mandate} />
            <Stack.Screen name="VMG" component={VMG} />
            <Stack.Screen name="CoreValues" component={CoreValues} />
            <Stack.Screen name="Goals" component={Goals} />
            <Stack.Screen name="OrgStructure" component={OrgStructure} />
            <Stack.Screen name="Directory" component={Directory} />
            <Stack.Screen name="Awards" component={Awards} />
            <Stack.Screen name="ContactUs" component={ContactUs} />

            <Stack.Screen name="IssuesAndConcerns" component={IssuesAndConcerns} />
            <Stack.Screen name="TeenCenter" component={TeenCenter} />
            <Stack.Screen name="Births" component={Births} />
            <Stack.Screen name="Deaths" component={Deaths} />
            <Stack.Screen name="Marraiges" component={Marraiges} />
            <Stack.Screen name="Migrations" component={Migrations} />
            <Stack.Screen name="KeyFiles" component={KeyFiles} />
            <Stack.Screen name="PopulationData" component={PopulationData} />
            <Stack.Screen name="MPFCFDC" component={MPFCFDC} />
            <Stack.Screen name="PMOC" component={PMOC} />

        </Stack.Navigator>
    );
}
