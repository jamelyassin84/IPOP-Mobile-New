import React, { FC } from 'react';
import { Text } from 'react-native';
import { View } from 'react-native';
import Container from '../../constants/Layout';

type Props = {};

const AboutScreen: FC<Props> = ( props ) => {
    return (
        <Container>
            <Text>AboutScreen</Text>
        </Container>
    );
};

export default AboutScreen;
