
import React, { FC } from 'react';
import MapView from 'react-native-maps';
import { StyleSheet, View, Dimensions } from 'react-native';

type Props = {};

const Map: FC<Props> = ( props ) => {
    return (
        <View style={styles.container}>
            <MapView style={styles.map} />
        </View>
    );
};

const styles = StyleSheet.create( {
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
        zIndex: -1,
        marginTop: 50

    },
    map: {
        width: Dimensions.get( 'window' ).width,
        height: Dimensions.get( 'window' ).height,
    },
} );
export default Map;
