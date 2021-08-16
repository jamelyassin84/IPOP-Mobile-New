
import { useNavigation } from '@react-navigation/native';
import React, { FC } from 'react';
import { Dimensions, Text, View } from 'react-native';
import { BarChart } from 'react-native-chart-kit';
import chartConfig from '../../../components/demographics/ChartConfig';
import { LocationType } from '../../../components/Pyramid';
import WithRefreshComponent from '../../../components/utils/WithRefreshComponent';
import { paramifyLocation } from '../../../constants/AppConstants';
import Colors from '../../../constants/Colors';
import Container from '../../../constants/Layout';
import { BaseService } from '../../../environments/base.service';
import useColorScheme from '../../../hooks/useColorScheme';
import style from '../../../styles/charts/Chart'
import { PMOCChart } from './ChartEnum';
import { PMOCColors } from './NumberOfCouples';
import * as process from './Processes'


type Props = {
    api: string
    type: string
    location: LocationType
};

const DynamicChart: FC<Props> = ( props ) => {

    const navigation = useNavigation()
    const colorScheme = useColorScheme();
    const { width } = Dimensions.get( 'screen' );

    const dummy = {
        labels: [ 0, 0, 0, 0, 0 ],
        datasets: [ { data: [ 0, 0, 0, 0, 0 ] } ]
    }

    const [ isLoading, setLoading ] = React.useState( false )
    const [ chartdataMale, setchartdataMale ]: any = React.useState( dummy )
    const [ chartdataFemale, setchartdataFemale ]: any = React.useState( dummy )
    const [ chartdataTotal, setchartdataTotal ]: any = React.useState( dummy )

    React.useEffect( () => {
        getData()
    }, [] )

    const onRefresh = () => {
        getData()
    };

    const getData = () => {
        setLoading( true )
        new BaseService( props.api ).fetchWithParams( paramifyLocation( props.location ) ).then( ( data: any ) => {
            let chartData: any = ''
            if ( props.type === PMOCChart.AgeGroup ) chartData = process.AgeGroup( data )
            if ( props.type === PMOCChart.EmployemntStatus ) chartData = process.EmploymentStatus( data )
            if ( props.type === PMOCChart.FamilyPlanning ) chartData = process.KnowLedgeOnFP( data )
            if ( props.type === PMOCChart.CivilStatus ) chartData = process.CivilStatus( data )
            if ( props.type === PMOCChart.MonthlyIncome ) chartData = process.AverageMonthlyIncome( data )
            setchartdataMale(
                {
                    labels: chartData.labels,
                    datasets: [ { data: chartData.male } ]
                }
            )
            setchartdataFemale(
                {
                    labels: chartData.labels,
                    datasets: [ { data: chartData.female } ]
                }
            )
            setchartdataTotal(
                {
                    labels: chartData.labels,
                    datasets: [ { data: chartData.total } ]
                }
            )
            setLoading( false )
            if ( Object.keys( data ).length === 0 ) {
                alert( `${ props.type } on this location is not yet set` )
                navigation.goBack()
                setLoading( false )
            }
        } )
    }

    return (
        <Container>
            <WithRefreshComponent onRefresh={() => onRefresh} loading={isLoading} backgroundColor={Colors[ colorScheme ].background}>
                <View style={style.chartContainer}>
                    <Text style={[ style.chartTitle, { color: Colors[ colorScheme ].text } ]}>Males </Text>
                    <BarChart
                        data={chartdataMale}
                        width={width - 20}
                        height={200}
                        chartConfig={chartConfig( PMOCColors.male )}
                        fromZero={true}
                        showBarTops={false}
                        withHorizontalLabels={true}
                        withInnerLines={false}
                        withDots={true}
                        withShadow={true}
                        withOuterLines={true}
                        withVerticalLines={true}
                        withHorizontalLines={false}
                        showValuesOnTopOfBars={true}
                    />
                </View>
                <View style={style.chartContainer}>
                    <Text style={[ style.chartTitle, { color: Colors[ colorScheme ].text } ]}>Females </Text>
                    <BarChart
                        data={chartdataFemale}
                        width={width - 20}
                        height={200}
                        chartConfig={chartConfig( PMOCColors.female )}
                        fromZero={true}
                        showBarTops={false}
                        withHorizontalLabels={true}
                        withInnerLines={false}
                        withDots={true}
                        withShadow={true}
                        withOuterLines={true}
                        withVerticalLines={true}
                        withHorizontalLines={false}
                        showValuesOnTopOfBars={true}
                    />
                </View>
                <View style={style.chartContainer}>
                    <Text style={[ style.chartTitle, { color: Colors[ colorScheme ].text } ]}>Total </Text>
                    <BarChart
                        data={chartdataTotal}
                        width={width - 20}
                        height={200}
                        chartConfig={chartConfig( PMOCColors.total )}
                        fromZero={true}
                        showBarTops={false}
                        withHorizontalLabels={true}
                        withInnerLines={false}
                        withDots={true}
                        withShadow={true}
                        withOuterLines={true}
                        withVerticalLines={true}
                        withHorizontalLines={false}
                        showValuesOnTopOfBars={true}
                    />
                </View>
            </WithRefreshComponent>
        </Container>
    );
};


export default DynamicChart;



