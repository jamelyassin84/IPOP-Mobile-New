import React, { FC, useMemo } from 'react'
import { TouchableOpacity, View, StyleSheet, Dimensions, Text } from 'react-native'
import { AntDesign } from '@expo/vector-icons'
import useColorScheme from '../../../hooks/useColorScheme'
import Colors from '../../../constants/Colors'
// import BottomSheet from 'react-native-animated-bottom-sheet'
import Menu from '../../bottom-sheets/Menu'
import { LocationChoices, years } from '../../../constants/AppConstants'
import ScrollableMenu from '../../bottom-sheets/ScrollableMenu'
import MunicipalityPicker from '../MunicipalityPicker'
import BarangayPicker from '../BarangayPicker'
import Map from '../../../components/Map'
import { MaterialIcons } from '@expo/vector-icons'
import LocationTitle from '../../top-titles/LocationTitle'
import BottomSheet from '@gorhom/bottom-sheet'

type Props = {
	location: Function
	menu: any[]
	choice: Function
}

type municipalityType = {
	code: number
	name: string
}

const AddressPicker: FC<Props> = (props) => {
	const MenuRef: any = React.useRef<BottomSheet>(null)
	const MenuSheet = () => (
		<ScrollableMenu
			title="what to view"
			choices={props.menu}
			calback={(choice: number) => {
				props.choice(choice)
				MenuRef?.current.close()
			}}
			blur={() => MenuRef?.current.close()}
			icon={<MaterialIcons name="menu-open" size={24} color="#ccc" />}
		/>
	)

	const colorScheme = useColorScheme()
	const [choice, setCurrentChoice] = React.useState(LocationChoices[0])
	const [year, setYear] = React.useState(new Date(Date.now()).getFullYear())
	const [code, setCode]: any = React.useState(null)
	const [municipality, setmunicipality]: any = React.useState(null)
	const [barangay, setBarangay]: any = React.useState(null)

	React.useEffect(() => {
		props.location({
			year: year,
			barangay: barangay,
			municipality: municipality,
		})
	}, [])

	const TabRef: any = React.useRef<BottomSheet>(null)
	const TabSheet = () => (
		<Menu
			choices={LocationChoices}
			calback={(choice: string) => {
				setCurrentChoice(choice)
				setTimeout(() => {
					setChoice(choice)
				}, 600)
				TabRef?.current.close()
			}}
			blur={() => TabRef?.current.close()}
		/>
	)

	const setChoice = (choice: string) => {
		setYear(new Date(Date.now()).getFullYear())
		setCode(null)
		setmunicipality(null)
		setBarangay(null)
		if (choice === LocationChoices[0]) YearRef?.current.snapToIndex(1)
		if (choice === LocationChoices[1]) MunicipalityRef?.current.snapToIndex(1)
		if (choice === LocationChoices[2]) MunicipalityRef?.current.snapToIndex(1)
	}

	const YearRef: any = React.useRef<BottomSheet>(null)
	const YearSheet = () => (
		<ScrollableMenu
			title="Year"
			choices={years()}
			calback={(choice: number) => {
				setYear(choice)
				YearRef?.current.close()
				props.location({
					year: year,
					barangay: barangay,
					municipality: municipality,
				})
			}}
			blur={() => TabRef?.current.close()}
			icon={<AntDesign name="calendar" size={24} color="#1049A2" />}
		/>
	)

	const MunicipalityRef: any = React.useRef<BottomSheet>(null)
	const MunicipalitySheet = () => (
		<MunicipalityPicker
			onSelect={(municipality: municipalityType) => {
				MunicipalityRef?.current.close()
				setCode(municipality.code)
				setmunicipality(municipality.name)
				setTimeout(() => {
					if (choice === LocationChoices[1]) YearRef?.current.snapToIndex(1)
					if (choice === LocationChoices[2]) BarangayRef?.current.snapToIndex(1)
				}, 1000)
			}}
			blur={() => MunicipalityRef?.current.close()}
		/>
	)

	const BarangayRef: any = React.useRef<BottomSheet>(null)
	const BarangaySheet = () => (
		<BarangayPicker
			code={code}
			onSelect={(name: number) => {
				setBarangay(name)
				BarangayRef?.current.close()
				setTimeout(() => {
					YearRef?.current.snapToIndex(1)
				}, 600)
			}}
			blur={() => BarangayRef?.current.close()}
		/>
	)

	const snapPoints = useMemo(() => ['5%', '50%', '100%'], [])

	return (
		<>
			<LocationTitle
				location={{
					municipality: municipality,
					barangay: barangay,
					year: year,
				}}
			/>
			<View style={style.container}>
				<TouchableOpacity onPress={() => TabRef?.current.snapToIndex(1)} style={[style.iconHolder, { backgroundColor: Colors[colorScheme].background }]}>
					<AntDesign name="search1" size={24} color={Colors[colorScheme].text} />
				</TouchableOpacity>

				<TouchableOpacity onPress={() => MenuRef?.current.snapToIndex(1)} style={[style.iconHolder, { backgroundColor: Colors[colorScheme].background }]}>
					<MaterialIcons name="expand-more" size={24} color={Colors[colorScheme].text} />
				</TouchableOpacity>

				{/* <BottomSheet ref={YearSheet} renderContent={YearSheet} visibleHeight={Dimensions.get('window').height - 150} />
				<BottomSheet ref={MunicipalityRef} renderContent={MunicipalitySheet} visibleHeight={Dimensions.get('window').height - 150} /> */}
				{/* <BottomSheet ref={BarangayRef} renderContent={BarangaySheet} visibleHeight={Dimensions.get('window').height - 150} />
				<BottomSheet ref={MenuRef} renderContent={MenuSheet} visibleHeight={Dimensions.get('window').height - 150} /> */}
			</View>
			<Map
				location={{
					year: year,
					municipality: municipality,
					barangay: barangay,
				}}
			/>

			<BottomSheet enablePanDownToClose={true} ref={TabRef} snapPoints={snapPoints}>
				<TabSheet />
			</BottomSheet>

			<BottomSheet enablePanDownToClose={true} ref={YearSheet} snapPoints={snapPoints}>
				<YearSheet />
			</BottomSheet>

			<BottomSheet enablePanDownToClose={true} ref={MunicipalityRef} snapPoints={snapPoints}>
				<MunicipalitySheet />
			</BottomSheet>

			<BottomSheet enablePanDownToClose={true} ref={BarangayRef} snapPoints={snapPoints}>
				<BarangaySheet />
			</BottomSheet>

			<BottomSheet enablePanDownToClose={true} ref={MenuRef} snapPoints={snapPoints}>
				<MenuSheet />
			</BottomSheet>
		</>
	)
}

const style = StyleSheet.create({
	container: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'flex-end',
		paddingTop: 16,
		backgroundColor: 'transparent',
	},
	iconHolder: {
		borderRadius: 50,
		padding: 10,
		marginRight: 16,
		shadowColor: 'rgba(150,150,150,.9)',
		shadowOffset: {
			width: 0,
			height: 4,
		},
		shadowOpacity: 0.3,
		shadowRadius: 4.65,
		elevation: 8,
	},
	title: {
		width: Dimensions.get('screen').width,
		padding: 16,
		backgroundColor: '#1049A2',
		color: 'white',
		fontWeight: 'bold',
	},
})

export default AddressPicker
