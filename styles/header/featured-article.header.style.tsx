import { Platform } from 'react-native';
import { StyleSheet } from 'react-native';
export default StyleSheet.create( {
    header: {
        flexDirection: 'row',
        borderBottomWidth: 1,
        borderBottomColor: 'rgba(150,150,150,.2)',
        alignItems: 'center',
        padding: 10,
        paddingTop: 20,
        marginTop: Platform.OS === 'ios' ? 11 : 5

    },
    icon: {
        fontSize: 30,
        marginRight: 16
    },
    text: {
        fontSize: 20,
        fontWeight: 'bold'
    },
} )