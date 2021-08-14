
import React, { FC } from 'react';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import CommonHeader from '../components/headers/CommonHeader';
import WithRefreshComponent from '../components/utils/WithRefreshComponent';
import Container from '../constants/Layout';
import useColorScheme from '../hooks/useColorScheme';
import { BarChart, Grid, AreaChart } from 'react-native-svg-charts';
import { BaseService } from '../environments/base.service';
import { Population_API } from '../environments/Enums';
import { paramifyLocation } from '../constants/AppConstants';
import { useNavigation } from '@react-navigation/native';
import { Dimensions, StyleSheet, Text } from 'react-native';
import LocationTitle from './LocationTitle';

type Props = {};

const Pyramid: FC<Props> = ( { route }: any ) => {

    const data: DataParams = route.params
    const navigation = useNavigation()
    const colorScheme = useColorScheme();
    const [ isLoading, setLoading ] = React.useState( false )
    const [ female, setFemale ]: any = React.useState( [] )
    const [ male, setMale ]: any = React.useState( [] )
    const [ keys, setKeys ]: any = React.useState( '' )

    React.useEffect( () => {
        getData()
    }, [] )

    const onRefresh = () => {
        getData()
    };

    const getData = () => {
        setLoading( false )
        setMale( [] )
        setFemale( [] )
        new BaseService( Population_API.PopulationPyramid ).fetchWithParams( `${ paramifyLocation( data.location ) }&type=${ data.type }` ).then( ( data: any ) => {
            let malesArray = []
            let femalesArray = []
            let keysArray = []
            if ( data.length != 0 ) {
                data = data[ 0 ]
                for ( let key in data.data.male ) {
                    malesArray.push( data.data.male[ key ] );
                    if ( key === 'eighty_and_above' ) key = '80 and above'
                    if ( key === 'below_1_year_old' ) key = 'Below 1 Year Old'
                    keysArray.push( key )
                }
                for ( let key in data.data.female ) {
                    femalesArray.push( data.data.female[ key ] );
                }
                setKeys( keysArray.join( ` ${ '\n' }` ) )
                setMale( malesArray )
                setFemale( femalesArray )
                return
            }
            alert( `${ route.params.title } on this location is not yet set` )
            navigation.goBack()
            setLoading( false )
        } )
    };

    return (
        <Container>

            <CommonHeader title={route.params.title} backgroundColor={Colors[ colorScheme ].background} />
            <LocationTitle location={data.location} />
            <WithRefreshComponent onRefresh={() => onRefresh} loading={isLoading} backgroundColor={Colors[ colorScheme ].background}>
                <BarChart
                    style={{ transform: [ { scaleX: -1 } ], flex: 1, height: 400, width: Dimensions.get( 'screen' ).width / 2 }}
                    data={male}
                    svg={{ fill: data.colors[ 0 ] }}
                    horizontal={true}
                    spacingInner={.15}
                    spacingOuter={.15}
                >
                    <Grid />
                </BarChart>
                <BarChart
                    style={{ height: 400, flex: 1, width: Dimensions.get( 'screen' ).width / 2, position: 'absolute', right: 0 }}
                    data={female}
                    svg={{ fill: data.colors[ 1 ] }}
                    horizontal={true}
                    spacingInner={.15}
                    spacingOuter={.15}
                >
                    <Grid />
                </BarChart>
                <Text style={{
                    width: Dimensions.get( 'screen' ).width,
                    padding: 16,
                    backgroundColor: data.colors[ 0 ],
                    color: 'white',
                    fontWeight: 'bold'
                }}>{'\n'}{keys}</Text>
            </WithRefreshComponent>
        </Container>
    );
};

export type DataParams = {
    location?: LocationType | any,
    title?: string,
    type?: string,
    colors: any[],
}
export type LocationType = {
    municipality?: string | null,
    year?: any | null,
    barangay?: string | null,
    district?: string | null
}

export enum PYramidType {
    Population = 'Population',
    Birth = 'Birth',
    Death = 'Death',
    Marriage = 'Marriage',
}

export default Pyramid;
