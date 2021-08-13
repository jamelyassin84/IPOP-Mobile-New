

import { AntDesign, Feather, FontAwesome5 } from '@expo/vector-icons';
import React, { FC } from 'react';
import { Text, View } from 'react-native';
import CommonHeader from '../../components/headers/CommonHeader';
import WithRefreshComponent from '../../components/WithRefreshComponent';
import Colors from '../../constants/Colors';
import Container from '../../constants/Layout';
import useColorScheme from '../../hooks/useColorScheme';
import style from '../../styles/app/about/contact.style'

type Props = {};

const ContactUs: FC<Props> = ( props ) => {

    const colorScheme = useColorScheme();

    return (
        <Container>
            <CommonHeader title="Contact Us" backgroundColor={Colors[ colorScheme ].background} />
            <WithRefreshComponent loading={false} onRefresh={() => { void 0 }}>

                <View style={style.contacts}>
                    <View style={[ style.iconHolder, { backgroundColor: '#EDC333' }, ]}>
                        <Feather name='phone' size={24} color='white' />
                    </View>
                    <Text style={{ color: Colors[ colorScheme ].text, }}>
                        (033) 509 5081 | 328 7913
                    </Text>
                </View>

                <View style={style.contacts}>
                    <View style={[ style.iconHolder, { backgroundColor: '#425B89' }, ]}>
                        <FontAwesome5
                            name='facebook-f'
                            size={24}
                            color='white'
                        />
                    </View>
                    <Text style={{ color: Colors[ colorScheme ].text, }}>
                        PPO Iloilo
                    </Text>
                </View>

                <View style={style.contacts}>
                    <View style={[ style.iconHolder, { backgroundColor: '#AF381C' }, ]}>
                        <AntDesign name='mail' size={24} color='white' />
                    </View>
                    <Text style={{ color: Colors[ colorScheme ].text, }}>
                        ppo@iloilo.gov.phsvv
                    </Text>
                </View>


                <View style={style.contacts}>
                    <View style={[ style.iconHolder, { backgroundColor: '#44A6CB' }, ]}>
                        <AntDesign name='twitter' size={24} color='white' />
                    </View>
                    <Text style={{ color: Colors[ colorScheme ].text, }}>
                        ppo@iloilo
                    </Text>
                </View>

            </WithRefreshComponent>
        </Container>
    );
};

export default ContactUs;
