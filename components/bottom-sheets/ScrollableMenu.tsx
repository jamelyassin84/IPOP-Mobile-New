import { AntDesign } from '@expo/vector-icons'
import React, { FC } from 'react'
import { StyleSheet, TouchableOpacity, View } from 'react-native'
import { Dimensions } from 'react-native'
import { Text } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import Colors from '../../constants/Colors'
import useColorScheme from '../../hooks/useColorScheme'
import BottomSheetTopStyle from '../extras/BottomSheetTopStyle'

type Props = {
	choices: any
	calback: Function
	blur: Function
	icon?: any
	title?: string
}

const ScrollableMenu: FC<Props> = (props) => {
	const colorScheme = useColorScheme()
	return (
		<View style={style.bottomSheetContainer}>
			<BottomSheetTopStyle />

			<View style={[style.choicesContainer, { backgroundColor: Colors[colorScheme].background }]}>
				<View style={{ flexDirection: 'row', alignItems: 'center' }}>
					<Text style={[style.title, { color: Colors[colorScheme].text }]}>Select {props.title}</Text>
					<TouchableOpacity onPress={() => props.blur()}>
						<AntDesign style={{ marginRight: 26, marginLeft: -26 }} name="close" size={24} color="black" />
					</TouchableOpacity>
				</View>
				<View>
					{props.choices.map((choice: any, index: any) => {
						return (
							<TouchableOpacity
								key={index}
								onPress={() => {
									props.calback(choice)
								}}
								style={[
									style.choicesButton,
									{ borderTopColor: props.choices.length == 1 ? 'transparent' : 'rgba(150,150,150,.3)', backgroundColor: Colors[colorScheme].background },
								]}
							>
								{props.icon}
								<Text style={[style.choicesText]}>{choice}</Text>
							</TouchableOpacity>
						)
					})}
					<View style={{ height: 150 }} />
				</View>
			</View>
		</View>
	)
}

const style = StyleSheet.create({
	bottomSheetContainer: {
		height: '100%',
		width: Dimensions.get('screen').width,
		position: 'absolute',
		bottom: 0,
		minHeight: Dimensions.get('screen').height / 2,
	},
	choicesContainer: {
		borderRadius: 10,
		width: '100%',
		marginBottom: 10,
	},
	choicesButton: {
		borderRadius: 10,
		width: '100%',
		padding: 16,
		borderTopWidth: 1,
		flexDirection: 'row',
		alignItems: 'center',
	},
	choicesText: {
		fontSize: 16,
		fontWeight: '300',
		marginLeft: 16,
		paddingRight: 25,
		color: 'gray',
	},
	title: {
		textAlign: 'center',
		padding: 16,
		flex: 1,
	},
})

export default ScrollableMenu
