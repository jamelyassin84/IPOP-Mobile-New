
import React, { FC } from 'react';
import StepContainer from '../../components/steps/StepContainer';
import { useNavigation } from '@react-navigation/native';
import { FontAwesome5 } from '@expo/vector-icons';
import StepDescription from '../../components/steps/StepDescription';
import { View } from 'react-native';
import style from '../../styles/steps/step.style'
import Dot from '../../components/steps/Dot';
import ActiveDot from '../../components/steps/ActiveDot';

type Props = {};

const Step4: FC<Props> = ( props ) => {

    const navigation = useNavigation();

    return (
        <StepContainer callback={() => {
            navigation.navigate( 'Step5' )
        }}>

            <FontAwesome5 name="users"
                style={style.icon}
                size={170} color="#07B1E8"
            />

            <StepDescription text="be Updated on the latest population data like brths, deaths, migrations and marriages"></StepDescription>

            <View style={style.tab}>
                <Dot></Dot>
                <Dot></Dot>
                <Dot></Dot>
                <ActiveDot></ActiveDot>
                <Dot></Dot>
            </View>
        </StepContainer>
    );
};

export default Step4;
