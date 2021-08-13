import { StyleSheet } from 'react-native'
export default StyleSheet.create({
	container: {
		borderBottomWidth: 1,
		borderBottomColor: 'rgba(150,150,150,.2)',
		flexDirection: 'row',
		alignItems: 'center',
		padding: 15,
	},
	title: {
		fontSize: 20,
		flex: 1,
		marginLeft: 16,
	},
	icon: {
		shadowColor: 'rgba(16,73,162,.5)',
		shadowOffset: {
			width: 0,
			height: 3,
		},
		shadowOpacity: 0.57,
		shadowRadius: 4.65,
		elevation: 6,
	},
})
