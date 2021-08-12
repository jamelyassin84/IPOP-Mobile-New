import React, { FC } from 'react';
import { Text } from 'react-native';
import { View } from 'react-native';
import Container from '../../constants/Layout';

type Props = {};

const ProgramAreaScreen: FC<Props> = ( props ) => {
    return (
        <Container>
            <Text>ProgramAreaScreen</Text>
        </Container>
    );
};

export default ProgramAreaScreen;
