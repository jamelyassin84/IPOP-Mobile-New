

import { useNavigation } from '@react-navigation/native';
import React, { FC } from 'react';
import { StyleSheet, Text } from 'react-native';
import { View } from 'react-native';
import CommonHeader from '../components/headers/CommonHeader';
import WithRefreshComponent from '../components/utils/WithRefreshComponent';
import { paramifyLocation } from '../constants/AppConstants';
import Colors from '../constants/Colors';
import { getPercent } from '../constants/helpers';
import Container from '../constants/Layout';
import { BaseService } from '../environments/base.service';
import { Population_API } from '../environments/Enums';
import useColorScheme from '../hooks/useColorScheme';
import LocationTitle from './LocationTitle';
import { DataParams } from './Pyramid';
type Props = {};

const AgeDistributionTable: FC<Props> = ( { route }: any ) => {

    const data: DataParams = route.params
    const navigation = useNavigation()
    const colorScheme = useColorScheme();

    const [ isLoading, setLoading ] = React.useState( false )
    const [ populationbyAgeGroupandSex, setPopulationbyAgeGroupandSex ]: any = React.useState( [] )
    const [ populationbyAgeGroupandSexTotal, setPopulationbyAgeGroupandSexTotal ]: any = React.useState( {
        ageGroup: 'Total',
        male: 0,
        percent_male: 0,
        female: 0,
        percent_female: 0,
        total: 0,
        percent_total: 0,
    } )

    React.useEffect( () => {
        getData()
    }, [] )

    const onRefresh = () => {
        getData()
    };

    const getData = () => {
        setLoading( true );
        setPopulationbyAgeGroupandSex( [] );
        setPopulationbyAgeGroupandSexTotal( {
            ageGroup: 'Total',
            male: 0,
            percent_male: 0,
            female: 0,
            percent_female: 0,
            total: 0,
            percent_total: 0,
        } )
        new BaseService( Population_API.PopulationPyramid ).fetchWithParams( `${ paramifyLocation( data.location ) }&type=${ data.type }` ).then( ( data: any ) => {
            if ( data.length !== 0 ) {
                setLoading( false )
                let temp: any[] = []
                const male = data[ 0 ][ 'data' ][ 'male' ]
                const female = data[ 0 ][ 'data' ][ 'female' ]
                for ( let key in female ) {
                    let newText: string = ''
                    if ( key === 'eighty_and_above' ) {
                        newText = '80 and above'
                    }
                    if ( key === 'below_1_year_old' ) {
                        newText = 'Below 1 Year Old'
                    }
                    let total = parseFloat( male[ key ] ) + parseFloat( female[ key ] )
                    temp.push( {
                        ageGroup:
                            key === 'eighty_and_above' || key === 'below_1_year_old'
                                ? newText
                                : key,
                        male: male[ key ],
                        percent_male: twoDecimals( getPercent( male[ key ], total ) ),
                        female: female[ key ],
                        percent_female: twoDecimals( getPercent( female[ key ], total ) ),
                        total: total,
                        percent_total:
                            twoDecimals( getPercent( female[ key ], total ) ) +
                            twoDecimals( getPercent( male[ key ], total ) ),
                    } )
                }
                temp = temp.reverse()
                sumOfRows( temp, data )
                return
            }
            alert( `${ route.params.title } on this location is not yet set` )
            navigation.goBack()
            setLoading( false )
        } )
    }

    const sumOfRows = ( data: any, originalData: any ) => {
        let object: any = {
            ageGroup: 'Total',
            male: 0,
            percent_male: 0,
            female: 0,
            percent_female: 0,
            total: 0,
            percent_total: 0,
        }
        for ( let index of data ) {
            for ( let key in index ) {
                if ( key !== 'ageGroup' ) {
                    object[ key ] += index[ key ]
                }
            }
        }
        setPopulationbyAgeGroupandSexTotal( object )
        reAlterpopulationbyAgeGroupandSexTable( originalData, object.total, object )
    }

    const reAlterpopulationbyAgeGroupandSexTable = ( data: any, total: number, objectData: any ) => {
        const totalPopulation = total
        let temp: any = []
        const male = data[ 0 ][ 'data' ][ 'male' ]
        const female = data[ 0 ][ 'data' ][ 'female' ]
        for ( let key in female ) {
            let newText: string = ''
            if ( key === 'eighty_and_above' ) {
                newText = '80 and above'
            }
            if ( key === 'below_1_year_old' ) {
                newText = 'Below 1 Year Old'
            }
            let total = parseFloat( male[ key ] ) + parseFloat( female[ key ] )
            console.log( totalPopulation )
            temp.push( {
                ageGroup:
                    key === 'eighty_and_above' || key === 'below_1_year_old'
                        ? newText
                        : key,
                male: male[ key ],
                percent_male: getPercent( male[ key ], totalPopulation ),
                female: female[ key ],
                percent_female: getPercent( female[ key ], totalPopulation ),
                total: total,
                percent_total:
                    getPercent( female[ key ], totalPopulation ) +
                    getPercent( male[ key ], totalPopulation ),
            } )
        }
        let object = objectData
        object.percent_male = 0
        object.percent_female = 0
        object.percent_total = 0
        const disregards = [ 'ageGroup', 'male', 'female', 'total' ]
        for ( let index of temp ) {
            for ( let key in index ) {
                if ( !disregards.includes( key ) ) {
                    object[ key ] += parseFloat( index[ key ] )
                    index[ key ] = twoDecimals( index[ key ] )
                }
            }
        }
        for ( let key in object ) {
            if ( !disregards.includes( key ) ) {
                object[ key ] = twoDecimals( object[ key ] )
            }
        }
        setPopulationbyAgeGroupandSexTotal( object )
        setPopulationbyAgeGroupandSex( temp.reverse() )
    }

    const isOdd = ( num: number ) => ( num % 2 )

    const twoDecimals = ( num: number ) => {
        return ( Math.round( num * 100 ) / 100 ).toFixed( 1 );
    }

    return (
        <Container>
            <CommonHeader title={data.title} backgroundColor={Colors[ colorScheme ].background} />
            <LocationTitle location={data.location} />
            <WithRefreshComponent onRefresh={() => onRefresh} loading={isLoading} backgroundColor={Colors[ colorScheme ].background}>
                <View>
                    <View style={style.row}>
                        <View style={[ style.column, { backgroundColor: data.colors[ 0 ] } ]} >
                            <Text style={style.headerText}>Age Group</Text>
                        </View>
                        <View style={[ style.column, { backgroundColor: data.colors[ 0 ] } ]} >
                            <Text style={style.headerText}>Male</Text>
                        </View>
                        <View style={[ style.column, { backgroundColor: data.colors[ 0 ] } ]} >
                            <Text style={style.headerText}>%</Text>
                        </View>
                        <View style={[ style.column, { backgroundColor: data.colors[ 0 ] } ]} >
                            <Text style={style.headerText}>Female</Text>
                        </View>
                        <View style={[ style.column, { backgroundColor: data.colors[ 0 ] } ]} >
                            <Text style={style.headerText}>%</Text>
                        </View>
                        <View style={[ style.column, { backgroundColor: data.colors[ 0 ] } ]} >
                            <Text style={style.headerText}>Male</Text>
                        </View>
                        <View style={[ style.column, { backgroundColor: data.colors[ 0 ] } ]} >
                            <Text style={style.headerText}>%</Text>
                        </View>
                    </View>
                </View>
                <View style={style.tbody}>
                    {
                        populationbyAgeGroupandSex.map( ( item: AgeGroup, index: number ) =>
                            <View key={index} style={[ style.row, { backgroundColor: isOdd( index ) ? 'rgba(150,150,150,.2)' : Colors[ colorScheme ].background } ]}>
                                <View style={style.column} >
                                    <Text style={[ style.center, { color: Colors[ colorScheme ].text } ]}>{item.ageGroup}</Text>
                                </View>
                                <View style={style.column} >
                                    <Text style={[ style.center, { color: Colors[ colorScheme ].text } ]}> {item.male}</Text>
                                </View>
                                <View style={style.column} >
                                    <Text style={[ style.center, { color: Colors[ colorScheme ].text } ]}> {item.percent_male} </Text>
                                </View>
                                <View style={style.column} >
                                    <Text style={[ style.center, { color: Colors[ colorScheme ].text } ]}> {item.female} </Text>
                                </View>
                                <View style={style.column} >
                                    <Text style={[ style.center, { color: Colors[ colorScheme ].text } ]}> {item.percent_female}</Text>
                                </View>
                                <View style={style.column} >
                                    <Text style={[ style.center, { color: Colors[ colorScheme ].text } ]}> {item.total}</Text>
                                </View>
                                <View style={style.column} >
                                    <Text style={[ style.center, { color: Colors[ colorScheme ].text } ]}> {item.percent_total}</Text>
                                </View>
                            </View>
                        )
                    }
                    <View style={style.row}>
                        <View style={style.column} >
                            <Text style={[ style.center, { color: Colors[ colorScheme ].text, fontWeight: 'bold' } ]}>{populationbyAgeGroupandSexTotal.ageGroup}</Text>
                        </View>
                        <View style={style.column} >
                            <Text style={[ style.center, { color: Colors[ colorScheme ].text, fontWeight: 'bold' } ]}>{populationbyAgeGroupandSexTotal.male}</Text>
                        </View>
                        <View style={style.column} >
                            <Text style={[ style.center, { color: Colors[ colorScheme ].text, fontWeight: 'bold' } ]}>{populationbyAgeGroupandSexTotal.percent_male}</Text>
                        </View>
                        <View style={style.column} >
                            <Text style={[ style.center, { color: Colors[ colorScheme ].text, fontWeight: 'bold' } ]}>{populationbyAgeGroupandSexTotal.female}</Text>
                        </View>
                        <View style={style.column} >
                            <Text style={[ style.center, { color: Colors[ colorScheme ].text, fontWeight: 'bold' } ]}>{populationbyAgeGroupandSexTotal.percent_female}</Text>
                        </View>
                        <View style={style.column} >
                            <Text style={[ style.center, { color: Colors[ colorScheme ].text, fontWeight: 'bold' } ]}>{populationbyAgeGroupandSexTotal.total}</Text>
                        </View>
                        <View style={style.column} >
                            <Text style={[ style.center, { color: Colors[ colorScheme ].text, fontWeight: 'bold' } ]}>{populationbyAgeGroupandSexTotal.percent_total}</Text>
                        </View>
                    </View>
                </View>
            </WithRefreshComponent>
        </Container>
    );
};

const style = StyleSheet.create( {
    tbody: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    row: {
        flex: 1,
        alignSelf: 'stretch',
        flexDirection: 'row',

    },
    column: {
        flex: 1,
        alignSelf: 'stretch',
        borderWidth: 1,
        borderColor: 'rgba(150,150,150,.2)',
        padding: 10,
    },
    headerText: {
        textAlign: 'center',
        color: 'white'
    },
    center: {
        textAlign: 'center'
    }
} )

type AgeGroup = {
    ageGroup: number
    male: number
    percent_male: number
    female: number
    percent_female: number
    total: number
    percent_total: number
}

export default AgeDistributionTable;
