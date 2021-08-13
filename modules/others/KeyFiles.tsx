
import React, { FC } from 'react';
import CommonHeader from '../../components/headers/CommonHeader';
import Colors from '../../constants/Colors';
import Container from '../../constants/Layout';
import useColorScheme from '../../hooks/useColorScheme';
type Props = {};

const KeyFiles: FC<Props> = ( props ) => {
    const colorScheme = useColorScheme();


    return (
        <Container>
            <CommonHeader title="Key Files" backgroundColor={Colors[ colorScheme ].background} />

        </Container>
    )
};

export default KeyFiles;
