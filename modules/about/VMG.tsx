
import React, { FC } from 'react';
import { Dimensions, Text, StyleSheet } from 'react-native';
import CardWithImage from '../../components/about/CardWithImage';
import CommonHeader from '../../components/headers/CommonHeader';
import WithRefreshComponent from '../../components/utils/WithRefreshComponent';
import Colors from '../../constants/Colors';
import Container from '../../constants/Layout';
import useColorScheme from '../../hooks/useColorScheme';

type Props = {};

const VMG: FC<Props> = ( props ) => {
    const colorScheme = useColorScheme();
    return (
        <Container>
            <CommonHeader title="Mission & Vision" backgroundColor={Colors[ colorScheme ].background} />
            <WithRefreshComponent loading={false} onRefresh={() => { void 0 }}>

                <Text style={style.title}>Vision</Text>
                <CardWithImage image={require( '../../assets/app/vmg/3.png' )}
                    text="By 2020, the Provincial Population Office (PPO), as the implementing arm of the Philippine Population Management Program in the Province of Iloilo, will be dynamic, reliable, people-centered, and culturally-sensitive population information resource agency in Region VI."
                />

                <Text style={style.title}>Mission</Text>
                <CardWithImage image={require( '../../assets/app/vmg/2.png' )}
                    text="To provide technical assistance and information needs to the Local Government Units (LGUs), partner agencies and stakeholders in carrying out measures relative to the integration of population and development, through the generation and utilization of reliable and updated data, and implementation of population management programs and projects to uplift the quality of life of the Ilonggo population."
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

} )

export default VMG;
