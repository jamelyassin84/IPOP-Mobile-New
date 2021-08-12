import React, { FC } from 'react';
import { Text } from 'react-native';
import Container from '../../constants/Layout';

type Props = {};

const MenuScreen: FC<Props> = ( props ) => {
    return (
        <Container>
            <Text>MenuScreen</Text>
        </Container>
    );
};

export default MenuScreen;
