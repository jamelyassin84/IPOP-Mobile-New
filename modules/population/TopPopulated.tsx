
import React, { FC } from 'react';
import { Text } from 'react-native';
import Container from '../../constants/Layout';

type Props = {};

const TopPopulated: FC<Props> = ( props ) => {
    return (
        <Container>
            <Text>TopPopulated</Text>
        </Container>
    );
};

export default TopPopulated;
