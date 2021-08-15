import { useNavigation } from '@react-navigation/native';
import React, { FC } from 'react';
import { Dimensions, View } from 'react-native';
import { StyleSheet } from 'react-native';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import CommonHeader from '../../components/headers/CommonHeader';
import WithRefreshComponent from '../../components/utils/WithRefreshComponent';
import Container from '../../constants/Layout';
import useColorScheme from '../../hooks/useColorScheme';
import { DataParams, PYramidType } from '../Pyramid';
import { LineChart } from 'react-native-chart-kit';
import chartConfig from './ChartConfig';
import { BaseService } from '../../environments/base.service';
import { Demographic_API } from '../../environments/Enums';
import { groupBy } from '../../constants/helpers';
import { paramifyLocation } from '../../constants/AppConstants';


type Props = {};

const Incidence: FC<Props> = ( { route }: any ) => {

    const data: DataParams = route.params
    const navigation = useNavigation()
    const colorScheme = useColorScheme();
    const { width, height } = Dimensions.get( 'screen' );

    const [ isLoading, setLoading ] = React.useState( false )
    const [ color, setColor ] = React.useState( 'black' )
    const [ chartdata, setchartdata ]: any = React.useState( {
        labels: [ '2015', '2016', '2017', '2018' ],
        datasets: [
            {
                data: [ 0, 0, 0, 0 ],
            },
        ],
    } )

    React.useEffect( () => {
        if ( data.title === 'Incidence of Teenage Births' ) setColor( '#FBBB25' )
        if ( data.title === 'Incidence of Illegitimate Births' ) setColor( '#E91E63' )
        if ( data.title === 'Crude Death Rate' ) setColor( 'red' )
    }, [ data.title ] )

    React.useEffect( () => {
        getData()
    }, [] )

    const onRefresh = () => {
        getData()
    };

    const getData = () => {
        setLoading( true );
        let api = ''
        if ( data.type === PYramidType.Birth ) api = Demographic_API.Birth
        if ( data.type === PYramidType.Death ) api = Demographic_API.Death
        new BaseService( api ).fetchWithParams( `${ paramifyLocation( data.location ) }&type=${ data.type }` ).then( ( data: any ) => {
            if ( data.incidence.length !== 0 ) {
                let chartData = groupBy( data.incidence, 'title' )
                let tempChart: any = {
                    labels: [],
                    datasets: [
                        {
                            data: [],
                        },
                    ],
                }
                for ( let index of chartData ) {
                    for ( let incidence of index ) {
                        let title = ''
                        if ( route.params.title === 'Incidence of Teenage Births' ) title = IncidencesTypes.Teenage
                        if ( route.params.title === 'Incidence of Illegitimate Births' ) title = IncidencesTypes.Illegitemate
                        if ( route.params.title === 'Crude Death Rate' ) title = IncidencesTypes.CrudeDeathRate
                        if ( incidence.title === title ) {
                            tempChart.labels.push( incidence.year )
                            tempChart.datasets[ 0 ].data.push( incidence.value )
                        }
                    }
                }
                setchartdata( tempChart )
                console.log( tempChart )
                setLoading( false );
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
            <WithRefreshComponent onRefresh={() => onRefresh} loading={isLoading} backgroundColor={Colors[ colorScheme ].background}>
                <View style={{ padding: 10 }}>
                    <View style={[ { backgroundColor: Colors[ colorScheme ].BottomSheetBG }, style.chartContainer ]}>
                        <View style={style.chartWrapper}>
                            <LineChart
                                data={chartdata}
                                chartConfig={chartConfig( color )}
                                bezier
                                width={width + 100}
                                height={200}
                                fromZero={true}
                                withDots={true}
                                withShadow={true}
                                withInnerLines={false}
                                withOuterLines={false}
                                withVerticalLines={false}
                                withHorizontalLines={false}
                            />
                        </View>
                    </View>
                </View>

            </WithRefreshComponent>
        </Container>
    );
};

export enum IncidencesTypes {
    CrudeDeathRate = 'Crude Death Rate',
    Teenage = "Incidence of Teenage Birth",
    Illegitemate = "Incidence of Illegitimate Birth",
}

const style = StyleSheet.create( {
    chartContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10,
        marginLeft: 50
    },

    chartWrapper: {
        transform: [
            { translateX: 7 }
        ]
    }
} )



export default Incidence;
