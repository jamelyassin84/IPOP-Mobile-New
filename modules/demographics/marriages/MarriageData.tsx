
import React, { FC } from 'react';
import { Text } from 'react-native';
import Container from '../../../constants/Layout';

type Props = {};

const Component: FC<Props> = ( props ) => {
    return (
        <Container>
            <Text>Component</Text>
        </Container>
    );
};

export default Component;
