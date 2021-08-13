
import React, { FC } from 'react';
import { Text, View, StyleSheet, Dimensions } from 'react-native';
import { AntDesign } from '@expo/vector-icons';

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
    return (
        <View style={style.container}>
            <AntDesign name="user" size={40} color="black" />
            <View style={style.center}>
                <Text style={{ fontSize: 18, fontWeight: 'bold' }}>{props.personnel.name}</Text>
                <Text style={{ color: '#1049A2' }}>{props.personnel.position}</Text>
                <Text>{props.personnel.email}</Text>
                <Text>{props.personnel.phone}</Text>
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
