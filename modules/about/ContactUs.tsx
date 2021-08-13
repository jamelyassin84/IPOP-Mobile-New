

import React, { FC } from 'react';
import { Text } from 'react-native';
import CommonHeader from '../../components/headers/CommonHeader';
import Colors from '../../constants/Colors';
import Container from '../../constants/Layout';
import useColorScheme from '../../hooks/useColorScheme';

type Props = {};

const ContactUs: FC<Props> = ( props ) => {

    const colorScheme = useColorScheme();

    return (
        <Container>
            <CommonHeader title="Contact Us" backgroundColor={Colors[ colorScheme ].background} />

        </Container>
    );
};

export default ContactUs;
