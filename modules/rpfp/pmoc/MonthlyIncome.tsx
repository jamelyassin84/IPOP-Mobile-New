import React, { FC } from 'react';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import CommonHeader from '../../../components/headers/CommonHeader';
import LocationTitle from '../../../components/top-titles/LocationTitle';
import { DataParams } from '../../../components/Pyramid';
import Container from '../../../constants/Layout';
import { PMOC_API } from '../../../environments/Enums';
import useColorScheme from '../../../hooks/useColorScheme';
import { PMOCChart } from './ChartEnum';
import DynamicChart from './DynamicChart';

type Props = {};

const MonthlyIncome: FC<Props> = ( { route }: any ) => {

    const data: DataParams = route.params
    const colorScheme = useColorScheme();

    return (
        <Container>
            <CommonHeader title={data.title} backgroundColor={Colors[ colorScheme ].background} />
            <LocationTitle location={data.location} />
            <DynamicChart api={PMOC_API.AverageMonthlyIncome} type={PMOCChart.MonthlyIncome} location={data.location} />
        </Container>
    );
};

export default MonthlyIncome;
