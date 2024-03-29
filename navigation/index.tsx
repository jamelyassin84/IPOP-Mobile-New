import * as React from 'react'
import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { ColorSchemeName } from 'react-native'
import { NavParamList } from '../types/NavTpyes'
import BottomTabNavigator from './bottom-navigations/BottomTabNavigator'
import LinkingConfiguration from './bottom-navigations/LinkingConfiguration'

import Step1 from '../screens/steps/Step1'
import Step2 from '../screens/steps/Step2'
import Step3 from '../screens/steps/Step3'
import Step4 from '../screens/steps/Step4'
import Step5 from '../screens/steps/Step5'

import Awards from '../modules/about/Awards'
import ContactUs from '../modules/about/ContactUs'
import CoreValues from '../modules/about/CoreValues'
import Directory from '../modules/about/Directory'
import Goals from '../modules/about/Goals'
import Mandate from '../modules/about/Mandate'
import OrgStructure from '../modules/about/OrgStructure'
import VMG from '../modules/about/VMG'
import ShowArticle from '../modules/home/ShowArticle'

import IssuesAndConcerns from '../modules/ahyd/IssuesAndConcerns'
import TeenCenter from '../modules/ahyd/teen-centers/TeenCenter'
import Births from '../modules/demographics/births/Births'
import Deaths from '../modules/demographics/deaths/Deaths'
import Marraiges from '../modules/demographics/marriages/Marraiges'
import Migrations from '../modules/demographics/migrations/Migrations'
import KeyFiles from '../modules/others/KeyFiles'
import PopulationData from '../modules/population/PopulationData'
import MPFCFDC from '../modules/rpfp/mpc-fdc/MPFCFDC'
import PMOC from '../modules/rpfp/pmoc/PMOC'
import Activities from '../modules/programs/Activities'
import TechnicalNotes from '../components/TechnicalNotes'
import AgeDistributionAndAgeDependencyRatioByMunicipality from '../modules/population/AgeDistributionAndAgeDependencyRatioByMunicipality'
import AgeDependecy from '../modules/population/AgeDependecy'
import AgeDistribution from '../modules/population/AgeDistribution'
import PopulationProfile from '../modules/population/PopulationProfile'
import AgeDistributionTable from '../components/AgeDistributionTable'
import Pyramid from '../components/Pyramid'
import TopPopulated from '../modules/population/TopPopulated'
import PopulationProfileByMuncipality from '../modules/population/PopulationProfileByMuncipality'
import ByMunicipalityTable from '../components/demographics/ByMunicipalityTable'
import Incidence from '../components/demographics/Incidence'
import BirthData from '../modules/demographics/births/BirthData'
import MonthChart from '../components/demographics/MonthChart'
import BirthSummary from '../modules/demographics/births/BirthSummary'
import DeathSummary from '../modules/demographics/deaths/DeathSummary'
import DeathData from '../modules/demographics/deaths/DeathData'
import TypeofWeddings from '../modules/demographics/marriages/TypeofWeddings'
import MarriageSummary from '../modules/demographics/marriages/MarriageSummary'
import MarriageData from '../modules/demographics/marriages/MarriageData'
import MigrationSummary from '../modules/demographics/migrations/MigrationSummary'
import MigrationData from '../modules/demographics/migrations/MigrationData'
import MigrationChart from '../modules/demographics/migrations/MigrationChart'
import NumberOfCouples from '../modules/rpfp/pmoc/NumberOfCouples'
import PMOCData from '../modules/rpfp/pmoc/PMOCData'
import AgeGroup from '../modules/rpfp/pmoc/AgeGroup'
import EmployemntStatus from '../modules/rpfp/pmoc/EmployemntStatus'
import FamilyPlanning from '../modules/rpfp/pmoc/FamilyPlanning'
import CivilStatus from '../modules/rpfp/pmoc/CivilStatus'
import MonthlyIncome from '../modules/rpfp/pmoc/MonthlyIncome'
import MPCFDCData from '../modules/rpfp/mpc-fdc/MPCFDCData'
import MPCFDCTeam from '../modules/rpfp/mpc-fdc/MPCFDCTeam'
import MPCFDCPersonnelIncharge from '../modules/rpfp/mpc-fdc/MPCFDCPersonnelIncharge'
import TeenCenterData from '../modules/ahyd/teen-centers/TeenCenterData'
import TCFocalPerson from '../modules/ahyd/teen-centers/TCFocalPerson'
import AHYDTeam from '../modules/ahyd/teen-centers/AHYDTeam'
import MPCFDCDetails from '../modules/rpfp/mpc-fdc/MPCFDCDetails'
import TeenCenterDetails from '../modules/ahyd/teen-centers/TeenCenterDetails'

export default function Navigation({ colorScheme }: { colorScheme: ColorSchemeName }) {
	return (
		<NavigationContainer theme={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
			<RootNavigator />
		</NavigationContainer>
	)
}

const Stack = createStackNavigator<NavParamList>()
const RootNavigator = () => {
	return (
		<Stack.Navigator screenOptions={{ headerShown: false }}>
			<Stack.Screen name="Step1" component={Step1} />
			<Stack.Screen name="Step2" component={Step2} />
			<Stack.Screen name="Step3" component={Step3} />
			<Stack.Screen name="Step4" component={Step4} />
			<Stack.Screen name="Step5" component={Step5} />
			<Stack.Screen name="ShowArticle" component={ShowArticle} />
			<Stack.Screen name="home" options={{ headerShown: false }} component={BottomTabNavigator} />

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

			<Stack.Screen name="Activities" component={Activities} />

			<Stack.Screen name="TopPopulated" component={TopPopulated} />
			<Stack.Screen name="Pyramid" component={Pyramid} />
			<Stack.Screen name="AgeDistributionTable" component={AgeDistributionTable} />
			<Stack.Screen name="PopulationProfile" component={PopulationProfile} />
			<Stack.Screen name="PopulationProfileByMuncipality" component={PopulationProfileByMuncipality} />
			<Stack.Screen name="AgeDistribution" component={AgeDistribution} />
			<Stack.Screen name="AgeDependecy" component={AgeDependecy} />
			<Stack.Screen name="AgeDistributionAndAgeDependencyRatioByMunicipality" component={AgeDistributionAndAgeDependencyRatioByMunicipality} />
			<Stack.Screen name="TechnicalNotes" component={TechnicalNotes} />

			<Stack.Screen name="BirthSummary" component={BirthSummary} />
			<Stack.Screen name="MonthChart" component={MonthChart} />
			<Stack.Screen name="BirthData" component={BirthData} />
			<Stack.Screen name="Incidence" component={Incidence} />
			<Stack.Screen name="ByMunicipalityTable" component={ByMunicipalityTable} />

			<Stack.Screen name="DeathSummary" component={DeathSummary} />
			<Stack.Screen name="DeathData" component={DeathData} />

			<Stack.Screen name="MarriageSummary" component={MarriageSummary} />
			<Stack.Screen name="MarriageData" component={MarriageData} />
			<Stack.Screen name="TypeofWeddings" component={TypeofWeddings} />

			<Stack.Screen name="MigrationSummary" component={MigrationSummary} />
			<Stack.Screen name="MigrationData" component={MigrationData} />
			<Stack.Screen name="MigrationChart" component={MigrationChart} />

			<Stack.Screen name="NumberOfCouples" component={NumberOfCouples} />
			<Stack.Screen name="PMOCData" component={PMOCData} />
			<Stack.Screen name="AgeGroup" component={AgeGroup} />
			<Stack.Screen name="EmployemntStatus" component={EmployemntStatus} />
			<Stack.Screen name="FamilyPlanning" component={FamilyPlanning} />
			<Stack.Screen name="CivilStatus" component={CivilStatus} />
			<Stack.Screen name="MonthlyIncome" component={MonthlyIncome} />

			<Stack.Screen name="MPCFDCData" component={MPCFDCData} />
			<Stack.Screen name="MPCFDCDetails" component={MPCFDCDetails} />
			<Stack.Screen name="MPCFDCTeam" component={MPCFDCTeam} />
			<Stack.Screen name="MPCFDCPersonnelIncharge" component={MPCFDCPersonnelIncharge} />

			<Stack.Screen name="TeenCenterData" component={TeenCenterData} />
			<Stack.Screen name="TeenCenterDetails" component={TeenCenterDetails} />
			<Stack.Screen name="TCFocalPerson" component={TCFocalPerson} />
			<Stack.Screen name="AHYDTeam" component={AHYDTeam} />
		</Stack.Navigator>
	)
}
