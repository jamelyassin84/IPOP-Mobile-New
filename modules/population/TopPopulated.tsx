
import React, { FC } from 'react';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import CommonHeader from '../../components/headers/CommonHeader';
import WithRefreshComponent from '../../components/utils/WithRefreshComponent';
import Container from '../../constants/Layout';
import useColorScheme from '../../hooks/useColorScheme';

type Props = {};

const TopPopulated: FC<Props> = ( props ) => {

    const colorScheme = useColorScheme();

    const [ isLoading, setLoading ] = React.useState( false )


    React.useEffect( () => {

    }, [] )

    const onRefresh = () => {

    };

    return (
        <Container>
            <CommonHeader title="Top Populated Municipalities" backgroundColor={Colors[ colorScheme ].background} />
            <WithRefreshComponent onRefresh={() => onRefresh} loading={isLoading} backgroundColor={Colors[ colorScheme ].background}>

            </WithRefreshComponent>
        </Container>
    );
};

export default TopPopulated;