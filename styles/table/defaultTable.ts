import { StyleSheet } from 'react-native'
export default StyleSheet.create({
	tbody: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
	},
	row: {
		flex: 1,
		alignSelf: 'stretch',
		flexDirection: 'row',
	},
	column: {
		flex: 1,
		alignSelf: 'stretch',
		borderWidth: 1,
		borderColor: 'rgba(250,250,250,.5)',
		padding: 10,
	},
	headerText: {
		textAlign: 'center',
		color: 'white',
	},
	center: {
		textAlign: 'center',
	},
})
