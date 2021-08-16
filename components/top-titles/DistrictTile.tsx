import { Dimensions, StyleSheet, Text } from "react-native";
import React, { FC } from 'react';

type Props = {
    location: any
};
const DistrictTile: FC<Props> = ( props ) => {
    return <Text style={style.title}>{props.location.district !== null ? 'District ' + props.location.district : 'Please Select a District'}</Text>
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

export default DistrictTile;


