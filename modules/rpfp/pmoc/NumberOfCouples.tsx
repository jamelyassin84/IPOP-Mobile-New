import { useNavigation } from '@react-navigation/native';
import React, { FC } from 'react';
import { Dimensions } from 'react-native';
import { View } from 'react-native';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import CommonHeader from '../../../components/headers/CommonHeader';
import { DataParams } from '../../../components/Pyramid';
import WithRefreshComponent from '../../../components/utils/WithRefreshComponent';
import { paramifyLocation } from '../../../constants/AppConstants';
import Container from '../../../constants/Layout';
import { BaseService } from '../../../environments/base.service';
import { PMOC_API } from '../../../environments/Enums';
import useColorScheme from '../../../hooks/useColorScheme';
import * as process from './Processes'
import { BarChart, LineChart, } from 'react-native-chart-kit';
import chartConfig from '../../../components/demographics/ChartConfig';
import LocationTitle from '../../../components/LocationTitle';
import style from '../../../styles/charts/Chart'

type Props = {};

const NumberOfCouples: FC<Props> = ( { route }: any ) => {

    const data: DataParams = route.params
    const navigation = useNavigation()
    const colorScheme = useColorScheme();
    const { width } = Dimensions.get( 'screen' );

    const dummy = {
        labels: [ 0, 0, 0, 0, 0 ],
        datasets: [ { data: [ 0, 0, 0, 0, 0 ] } ]
    }

    const [ isLoading, setLoading ] = React.useState( false )
    const [ chartdataMale, setchartdataMale ]: any = React.useState( dummy )

    React.useEffect( () => {
        getData()
    }, [] )

    const onRefresh = () => {
        getData()
    };

    const getData = () => {
        setLoading( true )
        new BaseService( PMOC_API.PmocData ).fetchWithParams( paramifyLocation( data.location ) ).then( ( data: any ) => {
            const chartData: any = process.NumberofCouples( data.month )
            setchartdataMale(
                {
                    labels: chartData.labels,
                    datasets: [ { data: chartData.couples } ]
                }
            )
            setLoading( false )
            if ( Object.keys( data ).length === 0 ) {
                alert( `${ route.params.title } on this location is not yet set` )
                navigation.goBack()
                setLoading( false )
            }
        } )
    }

    return (
        <Container>
            <CommonHeader title={data.title} backgroundColor={Colors[ colorScheme ].background} />
            <LocationTitle location={data.location} />
            <WithRefreshComponent onRefresh={() => onRefresh} loading={isLoading} backgroundColor={Colors[ colorScheme ].background}>
                <View style={style.chartContainer}>
                    <LineChart
                        data={chartdataMale}
                        width={width}
                        height={500}
                        chartConfig={chartConfig( PMOCColors.total )}
                        fromZero={true}
                        withHorizontalLabels={true}
                        withInnerLines={false}
                        withDots={true}
                        withShadow={true}
                        withOuterLines={true}
                        withVerticalLines={true}
                        withHorizontalLines={false}
                        bezier={true}
                    />
                </View>
            </WithRefreshComponent>
        </Container>
    );
}

export enum PMOCColors {
    male = '#0039A9',
    female = '#A30010',
    total = '#C79500',
}

export default NumberOfCouples;
