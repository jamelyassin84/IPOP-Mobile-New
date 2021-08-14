
import React, { FC } from 'react';
import CommonHeader from '../../components/headers/CommonHeader';
import AddressPicker from '../../components/pickers/address-picker/AddressPicker';
import WithRefreshComponent from '../../components/utils/WithRefreshComponent';
import Colors from '../../constants/Colors';
import Container from '../../constants/Layout';
import useColorScheme from '../../hooks/useColorScheme';

type Props = {};

const PopulationData: FC<Props> = ( props ) => {

    const colorScheme = useColorScheme();

    React.useEffect( () => {

    }, [] )


    return (
        <Container>
            <CommonHeader title="Population Data" backgroundColor={Colors[ colorScheme ].background} />
            <AddressPicker location={( location: any ) => {
                alert( JSON.stringify( location ) )
            }} />
        </Container>
    );
};

export default PopulationData;
