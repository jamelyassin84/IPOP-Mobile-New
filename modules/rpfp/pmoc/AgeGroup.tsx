import React, { FC } from 'react';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import CommonHeader from '../../../components/headers/CommonHeader';
import WithRefreshComponent from '../../../components/utils/WithRefreshComponent';
import Container from '../../../constants/Layout';
import useColorScheme from '../../../hooks/useColorScheme';
import { PMOCChart } from './ChartEnum';

type Props = {};

const AgeGroup: FC<Props> = ( props ) => {
    const colorScheme = useColorScheme();

    const [ isLoading, setLoading ] = React.useState( false )


    React.useEffect( () => {

    }, [] )

    const onRefresh = () => {

    };

    return (
        <Container>
            <CommonHeader title={PMOCChart.AgeGroup} backgroundColor={Colors[ colorScheme ].background} />
            <WithRefreshComponent onRefresh={() => onRefresh} loading={isLoading} backgroundColor={Colors[ colorScheme ].background}>

            </WithRefreshComponent>
        </Container>
    );
};

export default AgeGroup;
