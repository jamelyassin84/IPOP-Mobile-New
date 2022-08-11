import React, { FC } from 'react'
import { TouchableOpacity, View, StyleSheet, Dimensions } from 'react-native'
import { AntDesign } from '@expo/vector-icons'
import useColorScheme from '../../hooks/useColorScheme'
import Colors from '../../constants/Colors'
// import BottomSheetScreen from 'react-native-animated-bottom-sheet'
import { districts } from '../../constants/AppConstants'
import ScrollableMenu from '../bottom-sheets/ScrollableMenu'
import Map from '../../components/Map'
import { MaterialIcons } from '@expo/vector-icons'
import DistrictTile from '../top-titles/DistrictTile'
import BottomSheet from '@gorhom/bottom-sheet'
import { Foundation } from '@expo/vector-icons'

type Props = {
	location: Function
	menu: any[]
	choice: Function
}

const DistrictPicker: FC<Props> = (props) => {
	const MenuRef: any = React.useRef<BottomSheet>(null)
	const MenuSheet = () => {
		return (
			<ScrollableMenu
				title="what to view"
				choices={props.menu}
				calback={(choice: number) => {
					props.choice(choice)
					MenuRef?.current.close()
				}}
				blur={() => MenuRef?.current.close()}
				icon={<Foundation name="graph-bar" size={24} color="#0D47A1" />}
			/>
		)
	}

	const DistrictRef: any = React.useRef<BottomSheet>(null)
	const DistrictSheet = () => (
		<ScrollableMenu
			title="District"
			choices={districts}
			calback={(choice: number) => {
				DistrictRef?.current.close()
				setDistrict(choice)
				props.location({ district: district })
			}}
			blur={() => DistrictRef?.current.close()}
			icon={<Foundation name="graph-bar" size={24} color="#0D47A1" />}
		/>
	)

	const colorScheme = useColorScheme()
	const [district, setDistrict]: any = React.useState(null)

	const snapPoints = React.useMemo(() => ['5%', '50%', '100%'], [])

	return (
		<>
			<DistrictTile location={{ district: district }} />
			<View style={style.container}>
				<TouchableOpacity onPress={() => DistrictRef.current?.snapToIndex(1)} style={[style.iconHolder, { backgroundColor: Colors[colorScheme].background }]}>
					<AntDesign name="search1" size={24} color={Colors[colorScheme].text} />
				</TouchableOpacity>

				<TouchableOpacity onPress={() => MenuRef.current?.snapToIndex(1)} style={[style.iconHolder, { backgroundColor: Colors[colorScheme].background }]}>
					<MaterialIcons name="expand-more" size={24} color={Colors[colorScheme].text} />
				</TouchableOpacity>

				{/* <BottomSheetScreen
                    ref={DistrictRef}
                    renderContent={DistrictSheet}
                    visibleHeight={Dimensions.get( 'window' ).height / 2}
                />
                <BottomSheetScreen
                    ref={MenuRef}
                    renderContent={MenuSheet}
                    visibleHeight={Dimensions.get( 'window' ).height - 150}
                /> */}
			</View>
			<Map
				location={{
					year: null,
					municpality: null,
					barangay: null,
				}}
			/>

			<BottomSheet enablePanDownToClose={true} ref={DistrictRef} snapPoints={snapPoints}>
				<DistrictSheet />
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
	},
})

export default DistrictPicker
