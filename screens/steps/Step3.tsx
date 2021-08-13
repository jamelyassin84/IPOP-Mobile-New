
import React, { FC } from 'react';
import StepContainer from '../../components/steps/StepContainer';
import { useNavigation } from '@react-navigation/native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import StepDescription from '../../components/steps/StepDescription';
import { View } from 'react-native';
import style from '../../styles/steps/step.style'
import Dot from '../../components/steps/Dot';
import ActiveDot from '../../components/steps/ActiveDot';

type Props = {};

const Step3: FC<Props> = ( props ) => {

    const navigation = useNavigation();

    return (
        <StepContainer callback={() => {
            navigation.navigate( 'Step4' )
        }}>

            <MaterialCommunityIcons name="trophy-award"
                style={style.icon}
                size={170}
            />

            <StepDescription text="view latest awards, services, and all data related to Iloilo Population Office"></StepDescription>

            <View style={style.tab}>
                <Dot></Dot>
                <Dot></Dot>
                <ActiveDot></ActiveDot>
                <Dot></Dot>
                <Dot></Dot>
            </View>
        </StepContainer>
    );
};

export default Step3;
