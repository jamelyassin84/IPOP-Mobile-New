
import React, { FC } from 'react';
import { Text, View, StyleSheet, Dimensions } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import Colors from '../../constants/Colors';
import useColorScheme from '../../hooks/useColorScheme';

export type Personnel = {
    name: string,
    position: string,
    phone: string,
    email: string,
};

type Props = {
    personnel: Personnel
};
const PersonnelDirectoryCard: FC<Props> = ( props ) => {
    const colorScheme = useColorScheme()
    return (
        <View style={style.container}>
            <AntDesign name="user" size={40} color={Colors[ colorScheme ].text} />
            <View style={style.center}>
                <Text style={{ fontSize: 18, fontWeight: 'bold', color: Colors[ colorScheme ].text }}>{props.personnel.name}</Text>
                <Text style={{ color: '#1049A2' }}>{props.personnel.position}</Text>
                <Text style={{ color: Colors[ colorScheme ].text }}>{props.personnel.email}</Text>
                <Text style={{ color: Colors[ colorScheme ].text }}>{props.personnel.phone}</Text>
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

export default PersonnelDirectoryCard;
