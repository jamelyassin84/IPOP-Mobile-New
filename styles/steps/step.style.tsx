import { StyleSheet } from 'react-native';
export default StyleSheet.create( {
    container: {
        flex: 1, position: 'relative',
        zIndex: 99,
        backgroundColor: '#1049A2'
    },
    dot: {
        width: 10,
        height: 10,
        borderRadius: 50,
        margin: 5,
        opacity: .5,
        backgroundColor: 'white'
    },
    active: {
        width: 10,
        height: 10,
        borderRadius: 50,
        margin: 5,
        backgroundColor: 'white'
    },
    tab: {
        width: '100%',
        height: 90,
        zIndex: 100,
        position: 'absolute',
        bottom: '0%',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row'
    },
    icon: {
        top: '25%',
        alignSelf: 'center',
        position: 'absolute',
        color: 'white'
    }
} )