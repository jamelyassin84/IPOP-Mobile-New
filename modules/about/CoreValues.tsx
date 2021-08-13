
import React, { FC } from 'react';
import { Dimensions, Text, StyleSheet } from 'react-native';
import CardWithImage from '../../components/about/CardWithImage';
import CommonHeader from '../../components/headers/CommonHeader';
import WithRefreshComponent from '../../components/utils/WithRefreshComponent';
import Colors from '../../constants/Colors';
import Container from '../../constants/Layout';
import useColorScheme from '../../hooks/useColorScheme';

type Props = {};

const CoreValues: FC<Props> = ( props ) => {

    const colorScheme = useColorScheme();

    return (
        <Container>
            <CommonHeader title="Core Values" backgroundColor={Colors[ colorScheme ].background} />
            <Text style={style.title}>We the constituents of the Provincial Population Office (PPO) , commit ourselves to the following core values and endeavours to LIVE IT :</Text>
            <WithRefreshComponent loading={false} onRefresh={() => { void 0 }}>

                <Text style={style.break}>Love of Service</Text>
                <CardWithImage image={require( '../../assets/app/corevalues/1.png' )}
                    text="Love of fellowmen expressed through service beyond self is the over-arching principle that guides all other actions and endeavours."
                />

                <Text style={style.break}>Innovation</Text>
                <CardWithImage image={require( '../../assets/app/corevalues/6.png' )}
                    text="We believe that the creation of new ideas ad initiative in the context of our cultural heritage, is the noblest response to the challenge of change in our communities."
                />

                <Text style={style.break}>Vigor and Enthusiasm</Text>
                <CardWithImage image={require( '../../assets/app/corevalues/2.png' )}
                    text="Will be our most profound expression of our commitment to our vision, mission, and goals."
                />

                <Text style={style.break}>Excellence</Text>
                <CardWithImage image={require( '../../assets/app/corevalues/5.png' )}
                    text="Our efforts and actions will be guided by the highest standards of quality and excellence."
                />

                <Text style={style.break}>Integrity</Text>
                <CardWithImage image={require( '../../assets/app/corevalues/4.png' )}
                    text="We uphold the principle of truth and honesty, realizing that in our dealings, we are accountable to each other and to our clients, partners, and stakeholders."
                />

                <Text style={style.break}>Team Work</Text>
                <CardWithImage image={require( '../../assets/app/corevalues/3.png' )}
                    text="Given our diverse talent and skills, we will work together to achieve PPO goals."
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


export default CoreValues;
