
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import React, { FC } from 'react';
import { View } from 'react-native';
import ActiveDot from '../../components/steps/ActiveDot';
import Dot from '../../components/steps/Dot';
import StepContainer from '../../components/steps/StepContainer';
import StepDescription from '../../components/steps/StepDescription';
import style from '../../styles/steps/step.style'

type Props = {};

const Step2: FC<Props> = ( props ) => {
    const navigation = useNavigation();
    return (
        <StepContainer callback={() => {
            navigation.navigate( 'Step3' )
        }}>
            <MaterialIcons name="update"
                style={style.icon}
                size={170}
            />
            <StepDescription text="be updated on IPOP's latest news and featured articles"></StepDescription>
            <View style={style.tab}>
                <Dot></Dot>
                <ActiveDot></ActiveDot>
                <Dot></Dot>
                <Dot></Dot>
                <Dot></Dot>
            </View>
        </StepContainer>
    );
};

export default Step2;
