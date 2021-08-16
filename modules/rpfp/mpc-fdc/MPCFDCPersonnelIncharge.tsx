import { AntDesign } from '@expo/vector-icons';
import React, { FC } from 'react';
import { Dimensions, StyleSheet, Text, View } from 'react-native';
import Colors from '../../../constants/Colors';
import useColorScheme from '../../../hooks/useColorScheme';


type Props = {
    personnel: any
};

const MPCFDCPersonnelIncharge: FC<Props> = ( props ) => {
    const colorScheme = useColorScheme()
    return (
        <View style={style.container}>
            <AntDesign name="user" size={40} color={Colors[ colorScheme ].text} />
            <View style={style.center}>
                <Text style={{ fontSize: 18, fontWeight: 'bold', color: Colors[ colorScheme ].text }}>{props.personnel.name}</Text>
                <Text style={{ color: '#1049A2' }}>{props.personnel.position}</Text>
            </View>

        </View>
    );
};

const style = StyleSheet.create( {
    container: {
        borderBottomWidth: 1,
        borderBottomColor: 'rgba(150,150,150,.1)',
        flexDirection: 'row',
        alignItems: 'center',
        padding: 16,
        width: Dimensions.get( 'screen' ).width
    },
    center: {
        flex: 1,
        marginLeft: 26
    },
} )

export default MPCFDCPersonnelIncharge;
