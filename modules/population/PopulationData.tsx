
import React, { FC } from 'react';
import CommonHeader from '../../components/headers/CommonHeader';
import Colors from '../../constants/Colors';
import Container from '../../constants/Layout';
import useColorScheme from '../../hooks/useColorScheme';

type Props = {};

const PopulationData: FC<Props> = ( props ) => {

    const colorScheme = useColorScheme();


    return (
        <Container>
            <CommonHeader title="Population Data" backgroundColor={Colors[ colorScheme ].background} />

        </Container>
    );
};

export default PopulationData;
