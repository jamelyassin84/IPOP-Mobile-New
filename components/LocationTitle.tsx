import { Dimensions, StyleSheet, Text } from "react-native";
import React, { FC } from 'react';

type Props = {
    location: any
};
const LocationTitle: FC<Props> = ( props ) => {
    return <Text style={style.title}>{props.location.municipality === null && props.location.barangay === null ? 'Province' : ''} {props.location.municipality || ''} {props.location.barangay || ''} {props.location.year}</Text>
};

const style = StyleSheet.create( {
    title: {
        width: Dimensions.get( 'screen' ).width,
        padding: 16,
        backgroundColor: '#1049A2',
        color: 'white',
        fontWeight: 'bold'
    },
} )

export default LocationTitle;


