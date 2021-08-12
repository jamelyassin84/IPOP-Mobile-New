
import React, { FC } from 'react';
import { Text, StyleSheet, TouchableOpacity, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import Colors from '../../constants/Colors';
import useColorScheme from '../../hooks/useColorScheme';
import { Ionicons } from '@expo/vector-icons';
import * as Linking from 'expo-linking';


type Props = {
    links: Link[]
}

type Link = {
    title: string
    url: string
}
const Quicklinks: FC<Props> = ( props ) => {

    const colorScheme = useColorScheme();

    return (
        <View style={style.view}>
            <Text style={{ color: Colors[ colorScheme ].text, marginLeft: 10, fontSize: 20, fontWeight: 'bold' }}>Links you may visit</Text>
            <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} style={{ padding: 10 }}>
                {
                    props.links.map( ( link: Link, index: number ) => (
                        <TouchableOpacity key={index}
                            style={style.container}
                            onPress={() => {
                                Linking.openURL( link.url )
                            }}>
                            <Ionicons name="shuffle-outline" size={44} color="#07B1E8" />
                            <Text style={{ color: Colors[ colorScheme ].text, textAlign: 'center', marginTop: 16 }}>{link.title}</Text>
                        </TouchableOpacity>
                    ) )
                }
            </ScrollView>
        </View>
    );
};

const style = StyleSheet.create( {
    container: {
        width: 150,
        borderWidth: 1,
        borderColor: 'rgba(150,150,150,.2)',
        padding: 10,
        paddingVertical: 20,
        borderRadius: 10,
        alignItems: 'center',
        marginRight: 16
    },
    view: {
        marginTop: 20
    }
} )

export default Quicklinks;

