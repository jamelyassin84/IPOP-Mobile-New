
import React, { FC } from 'react';
import StepContainer from '../../components/steps/StepContainer';
import useColorScheme from '../../hooks/useColorScheme';
import { useNavigation } from '@react-navigation/native';
import style from '../../styles/steps/step.style'
import { Image, Text, View } from 'react-native';
import ActiveDot from '../../components/steps/ActiveDot';
import Dot from '../../components/steps/Dot';

type Props = {};

const Step1: FC<Props> = ( props ) => {
    const navigation = useNavigation();
    return (
        <StepContainer callback={() => {
            navigation.navigate( 'Step2' )
        }}>
            <Text
                style={{
                    color: 'white',
                    zIndex: 9,
                    alignSelf: 'center', position: 'absolute',
                    top: '45%',
                    fontSize: 22,
                    textAlign: 'center',
                }}>
                Welcome to
            </Text>
            <Text
                style={{
                    color: 'white',
                    zIndex: 9,
                    alignSelf: 'center', position: 'absolute',
                    top: '48%',
                    fontSize: 25,
                    fontWeight: 'bold',
                    textAlign: 'center',
                    padding: 20,

                }}>
                Iloilo Population Office
            </Text>
            <Image
                style={{
                    resizeMode: 'contain',
                    position: 'absolute',
                    top: '25%',
                    zIndex: 9,
                    alignSelf: 'center',
                    height: 100,
                    width: 100,
                }}
                source={require( '../../assets/logo/app1.png' )}
            />
            <View style={style.tab}>
                <ActiveDot></ActiveDot>
                <Dot></Dot>
                <Dot></Dot>
                <Dot></Dot>
                <Dot></Dot>
            </View>
        </StepContainer>
    );
};

export default Step1;
