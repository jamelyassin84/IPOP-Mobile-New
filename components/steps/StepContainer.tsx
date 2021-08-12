
import React, { FC } from 'react';
import { TouchableOpacity } from 'react-native';
import Colors from '../../constants/Colors';
import useColorScheme from '../../hooks/useColorScheme';
import style from '../../styles/steps/step.style'

type Props = {
    callback: Function
};

const StepContainer: FC<Props> = ( props ) => {
    const colorScheme = useColorScheme();

    return (
        <TouchableOpacity style={[ style.container, {
            backgroundColor: Colors[ colorScheme ].background

        } ]} onPress={() => props.callback()}>
            {props.children}
        </TouchableOpacity>
    );
};

export default StepContainer;
