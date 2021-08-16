
import { AntDesign } from '@expo/vector-icons';
import React, { FC } from 'react';
import { Text, TouchableOpacity } from 'react-native';
import CommonHeader from '../../components/headers/CommonHeader';
import Colors from '../../constants/Colors';
import Container from '../../constants/Layout';
import useColorScheme from '../../hooks/useColorScheme';
import * as Linking from 'expo-linking';
type Props = {};

const KeyFiles: FC<Props> = ( props ) => {
    const colorScheme = useColorScheme();
    return (
        <Container>
            <CommonHeader title="Issues & Concerns" backgroundColor={Colors[ colorScheme ].background} />
            <Text style={{ padding: 16 }}>Your mobile doesn't support some document format</Text>
            <TouchableOpacity
                onPress={() => Linking.openURL( 'https://ipop-test.tk/home/index/others' )}
                style={{
                    padding: 16,
                    backgroundColor: '#0039A9',
                    flexDirection: 'row',
                    alignItems: 'center'
                }}>
                <AntDesign name="link" size={24} color="white" />
                <Text style={{ color: 'white', marginLeft: 16 }}>Navigate to IPOP Website instead</Text>
            </TouchableOpacity>
        </Container>
    )
};

export default KeyFiles;
