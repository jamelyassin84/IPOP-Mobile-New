
import React, { FC } from 'react';
import { Text } from 'react-native';
import CommonHeader from '../../components/headers/CommonHeader';
import Colors from '../../constants/Colors';
import Container from '../../constants/Layout';
import useColorScheme from '../../hooks/useColorScheme';

type Props = {};

const Goals: FC<Props> = ( props ) => {

    const colorScheme = useColorScheme();

    return (
        <Container>
            <CommonHeader title="Goals" backgroundColor={Colors[ colorScheme ].background} />

        </Container>
    );
};

export default Goals;
