
import React, { FC } from 'react';
import { Dimensions } from 'react-native';
import { Text, StyleSheet } from 'react-native';
import CardWithImage from '../../components/about/CardWithImage';
import CommonHeader from '../../components/headers/CommonHeader';
import WithRefreshComponent from '../../components/utils/WithRefreshComponent';
import Colors from '../../constants/Colors';
import Container from '../../constants/Layout';
import useColorScheme from '../../hooks/useColorScheme';

type Props = {};

const Mandate: FC<Props> = ( props ) => {

    const colorScheme = useColorScheme();


    return (
        <Container>
            <CommonHeader title="Mandate" backgroundColor={Colors[ colorScheme ].background} />
            <Text style={style.title}>Mandate (Local Government Code of 1991, Sec. 488)</Text>
            <WithRefreshComponent loading={false} onRefresh={() => { void 0 }}>

                <CardWithImage image={require( '../../assets/app/mandate/2.png' )}
                    text="Formulate measures for the consideration of the sanggunian and provide technical assistance and support to the governor or mayor, as the case may be, in carrying out measures to ensure the delivery of basic services and provision of adequate facilities relative to the integration of the population development principles and in providing access to said services and facilities."
                />

                <CardWithImage image={require( '../../assets/app/mandate/1.png' )}
                    text="Develop plans and strategies and upon approval thereof by the governor or mayor, as the case may be, implement the same, particularly those which have to do with the integration of population development principles and methods in programs and projects which the governor or mayor is empowered to implement and which sanggunian is empowered to provide for under this Code."
                />

                <Text style={style.break}>In addition to the foregoing duties and function, the Population Office shall:</Text>

                <CardWithImage image={require( '../../assets/app/mandate/5.png' )}
                    text="Assist the governor or mayor, as the case may be, in the implementation of the constitutional provisions relative to population development and the promotion of responsible parenthood"
                />

                <CardWithImage image={require( '../../assets/app/mandate/4.png' )}
                    text="Assist the governor or mayor, as the case may be, in the implementation of the constitutional provisions relative to population development and the promotion of responsible parenthood"
                />

                <CardWithImage image={require( '../../assets/app/mandate/3.png' )}
                    text="Implement appropriate training programs responsive to the cultural heritage of the inhabitants;"
                />
            </WithRefreshComponent>
        </Container>
    );
};

const style = StyleSheet.create( {
    title: {
        textAlign: 'center',
        width: Dimensions.get( 'screen' ).width,
        padding: 16,
        backgroundColor: '#1049A2',
        color: 'white'
    },
    break: {
        color: '#1049A2',
        textAlign: 'center',
        width: Dimensions.get( 'screen' ).width,
        fontWeight: 'bold',
        padding: 16,
    }
} )

export default Mandate;
