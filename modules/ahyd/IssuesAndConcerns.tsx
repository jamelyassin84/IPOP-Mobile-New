
import { FontAwesome5 } from '@expo/vector-icons';
import React, { FC } from 'react';
import { Text, TouchableOpacity } from 'react-native';
import CommonHeader from '../../components/headers/CommonHeader';
import Colors from '../../constants/Colors';
import Container from '../../constants/Layout';
import useColorScheme from '../../hooks/useColorScheme';
import * as Linking from 'expo-linking';

type Props = {};

const IssuesAndConcerns: FC<Props> = ( props ) => {
    const colorScheme = useColorScheme();
    return (
        <Container>
            <CommonHeader title="Issues & Concerns" backgroundColor={Colors[ colorScheme ].background} />
            <Text style={{ padding: 16 }}>For issues and concerns navigate on IPOP Facebook Page</Text>
            <TouchableOpacity
                onPress={() => Linking.openURL( 'https://www.facebook.com/iloilocitypopulationoffice/' )}
                style={{
                    padding: 16,
                    backgroundColor: '#0039A9',
                    flexDirection: 'row',
                    alignItems: 'center'
                }}>
                <FontAwesome5 name="facebook-f" size={24} color="white" />
                <Text style={{ color: 'white', marginLeft: 16 }}>Visit IPOP Facebook Page</Text>
            </TouchableOpacity>
        </Container>
    )
};

export default IssuesAndConcerns;
