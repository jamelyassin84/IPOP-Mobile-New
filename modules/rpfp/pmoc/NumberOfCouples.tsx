import { useNavigation } from '@react-navigation/native';
import React, { FC } from 'react';
import { Dimensions, StyleSheet, Text } from 'react-native';
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
import { PMOCChart } from './ChartEnum';
import * as process from './Processes'
import { BarChart, } from 'react-native-chart-kit';
import chartConfig from '../../../components/demographics/ChartConfig';
import LocationTitle from '../../../components/LocationTitle';

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
                    <BarChart
                        data={chartdataMale}
                        width={width}
                        height={500}
                        chartConfig={chartConfig( PMOCColors.total )}
                        fromZero={true}
                        showBarTops={true}
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
}

export enum PMOCColors {
    male = '#0039A9',
    female = '#A30010',
    total = '#C79500',
}

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

export default NumberOfCouples;
