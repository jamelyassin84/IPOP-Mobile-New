
import React, { FC } from 'react';
import { Text } from 'react-native';
import Container from '../../constants/Layout';

type Props = {};

const AboutHeader: FC<Props> = ( props ) => {
    return (
        <Container>
            <Text>AboutHeader</Text>
        </Container>
    );
};

export default AboutHeader;
