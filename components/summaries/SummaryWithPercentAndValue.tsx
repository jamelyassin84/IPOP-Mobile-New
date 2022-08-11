import React, { FC } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import Colors from '../../constants/Colors'
import useColorScheme from '../..//hooks/useColorScheme'
import { get_percentage, toNumber } from '../../constants/helpers'
type Props = {
	icon?: any
	backgroundColor: string
	municipality: any
	municipalities: any[]
}

const SummaryWithPercentAndValue: FC<Props> = (props) => {
	const colorScheme = useColorScheme()

	const { icon, backgroundColor, municipality, municipalities } = props

	return (
		<View style={[style.container, { backgroundColor: Colors[colorScheme].background }]}>
			<View style={style.iconContainer}>
				<View style={[style.iconHolder, { backgroundColor: props.backgroundColor }]}>{props.icon}</View>
			</View>

			<View>
				<Text style={{ fontSize: 16, color: Colors[colorScheme].text, fontWeight: 'bold' }}>{props.municipality.name}</Text>

				<Text style={{ color: 'gray', marginVertical: 4 }}>{toNumber(props.municipality.total)}</Text>

				<Text style={{ color: props.backgroundColor }}>{get_percentage(municipalities, municipality.name)}%</Text>
			</View>
		</View>
	)
}

const style = StyleSheet.create({
	container: {
		margin: 5,
		borderRadius: 10,
		padding: 10,
		flexDirection: 'row',
		borderBottomWidth: 1,
		borderBottomColor: 'rgba(150,150,150,.2)',
		alignItems: 'center',
	},
	iconContainer: {
		width: 70,
		height: 70,
		marginRight: 20,
	},
	iconHolder: {
		height: '100%',
		width: '100%',
		alignItems: 'center',
		justifyContent: 'center',
	},
})

export default SummaryWithPercentAndValue
