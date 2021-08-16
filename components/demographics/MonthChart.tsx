import { useNavigation } from '@react-navigation/native';
import React, { FC } from 'react';
import CommonHeader from '../../components/headers/CommonHeader';
import WithRefreshComponent from '../../components/utils/WithRefreshComponent';
import Container from '../../constants/Layout';
import useColorScheme from '../../hooks/useColorScheme';
import LocationTitle from '../LocationTitle';
import { DataParams, PYramidType } from '../Pyramid';
import { BarChart, } from 'react-native-chart-kit';
import { Dimensions, StyleSheet, View } from 'react-native';
import { Text } from 'react-native';
import chartConfig from './ChartConfig';
import { dummy, paramifyLocation } from '../../constants/AppConstants';
import { BaseService } from '../../environments/base.service';
import { Demographic_API } from '../../environments/Enums';
import Colors from '../../constants/Colors';


type Props = {};

const MonthChart: FC<Props> = ( { route }: any ) => {

    const data: DataParams = route.params
    const navigation = useNavigation()
    const colorScheme = useColorScheme();
    const { width, height } = Dimensions.get( 'screen' );

    const [ isLoading, setLoading ] = React.useState( false )

    const [ chartdataMale, setchartdataMale ] = React.useState( {
        labels: dummy.labels,
        datasets: [ { data: dummy.data } ]
    } )

    const [ chartdataFemale, setchartdataFemale ] = React.useState( {
        labels: dummy.labels,
        datasets: [ { data: dummy.data } ]
    } )

    const [ chartdataTotal, setchartdataTotal ] = React.useState( {
        labels: dummy.labels,
        datasets: [ { data: dummy.data } ]
    } )

    React.useEffect( () => {
        getData()

    }, [] )

    const onRefresh = () => {
        getData()
    };

    const getData = () => {
        setLoading( true );
        let chartdataMaleTemp: any = {
            labels: dummy.labels,
            datasets: [ { data: [] } ]
        }

        let chartdataFemaleTemp: any = {
            labels: dummy.labels,
            datasets: [ { data: [] } ]
        }

        let chartdataTotalTemp: any = {
            labels: dummy.labels,
            datasets: [ { data: [] } ]
        }
        new BaseService( Demographic_API.MonthChart ).fetchWithParams( `${ paramifyLocation( data.location ) }&type=${ data.type }` ).then( ( data: any ) => {
            if ( data.length !== 0 ) {
                for ( let key of data ) {
                    chartdataTotalTemp.datasets[ 0 ].data.push( key[ 'total' ] );
                    chartdataFemaleTemp.datasets[ 0 ].data.push( key[ 'females' ] );
                    chartdataMaleTemp.datasets[ 0 ].data.push( key[ 'males' ] );
                }
                setchartdataMale( chartdataMaleTemp )
                setchartdataFemale( chartdataFemaleTemp )
                setchartdataTotal( chartdataTotalTemp )
                setLoading( false )
                return
            }
            alert( `${ route.params.title } on this location is not yet set` )
            navigation.goBack()
            setLoading( false )
        } )
    }


    return (
        <Container>
            <CommonHeader title={data.title} backgroundColor={Colors[ colorScheme ].background} />
            <LocationTitle location={data.location} />
            <WithRefreshComponent onRefresh={() => onRefresh} loading={isLoading} backgroundColor={Colors[ colorScheme ].background}>
                <View style={[ style.chartContainer, data.type === PYramidType.Marriage ? { position: 'absolute', left: -500 } : {} ]}>
                    <Text style={[ style.chartTitle, { color: Colors[ colorScheme ].text } ]}>Females</Text>
                    <BarChart
                        data={chartdataFemale}
                        width={width - 20}
                        height={500}
                        chartConfig={chartConfig( data.colors[ 0 ] )}
                        fromZero={true}
                        showBarTops={false}
                        withHorizontalLabels={true}
                        withInnerLines={false}
                        withDots={true}
                        withShadow={true}
                        withOuterLines={true}
                        withVerticalLines={true}
                        withHorizontalLines={false}
                    />
                </View>
                <View style={[ style.chartContainer, data.type === PYramidType.Marriage ? { position: 'absolute', left: -500 } : {} ]}>
                    <Text style={[ style.chartTitle, { color: Colors[ colorScheme ].text } ]}>Males</Text>
                    <BarChart
                        data={chartdataMale}
                        width={width - 20}
                        height={500}
                        chartConfig={chartConfig( data.colors[ 1 ] )}
                        fromZero={true}
                        showBarTops={false}
                        withHorizontalLabels={true}
                        withInnerLines={false}
                        withDots={true}
                        withShadow={true}
                        withOuterLines={true}
                        withVerticalLines={true}
                        withHorizontalLines={false}
                    />
                </View>
                <View style={style.chartContainer}>
                    <Text style={[ style.chartTitle, { color: Colors[ colorScheme ].text } ]}>
                        {data.type === PYramidType.Marriage ? 'Marriage by Month of Wedding' : 'Total'}

                    </Text>
                    <BarChart
                        data={chartdataTotal}
                        width={width - 20}
                        height={500}
                        chartConfig={chartConfig( data.colors[ 2 ] )}
                        fromZero={true}
                        showBarTops={false}
                        withHorizontalLabels={true}
                        withInnerLines={false}
                        withDots={true}
                        withShadow={true}
                        withOuterLines={true}
                        withVerticalLines={true}
                        withHorizontalLines={false}
                    />
                </View>
            </WithRefreshComponent>
        </Container>
    );
};

const style = StyleSheet.create( {
    chartContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10,
        paddingBottom: 0,
        paddingHorizontal: 10,
        marginTop: 50,
        marginLeft: -20
    },
    chartTitle: {
        fontSize: 20,
        alignSelf: 'flex-start',
        marginBottom: 40,
        marginLeft: 20,
        fontWeight: '500'
    },

    nav: {
        flexDirection: 'row',
        margin: 20,
        backgroundColor: 'rgba(113,111,139,.1)',
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 7,
        marginTop: 20
    },
    navButtons: {
        marginRight: 20,
        flex: 1,
        alignItems: 'center',
        padding: 10,
        borderRadius: 20,
    },
    avtiveButton: {
        backgroundColor: '#426FC3',
        shadowColor: "rgba(113,111,139,1)",
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.57,
        shadowRadius: 4.65,
        elevation: 6,
    },
    InactiveText: {
        color: 'gray'
    },
    activeText: {
        color: 'white',
        fontWeight: 'bold'
    }
} )

export default MonthChart;
