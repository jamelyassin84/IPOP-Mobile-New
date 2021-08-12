import { Platform } from 'react-native';
import { StyleSheet } from 'react-native';
export default StyleSheet.create( {
    header: {
        flexDirection: 'row',
        borderBottomWidth: 1,
        borderBottomColor: 'rgba(150,150,150,.2)',
        alignItems: 'center',
        padding: 10,
        marginTop: Platform.OS === 'ios' ? 11 : 5

    },
    image: {
        height: 40,
        width: 40,
        marginRight: 10,
        resizeMode: 'contain',

    }
} )