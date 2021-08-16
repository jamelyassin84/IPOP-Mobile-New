import { useNavigation } from '@react-navigation/native';
import React, { FC } from 'react';
import { Text } from 'react-native';
import { View } from 'react-native';
import { StyleSheet } from 'react-native';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import CommonHeader from '../../components/headers/CommonHeader';
import LocationTitle from '../../components/top-titles/LocationTitle';
import { DataParams } from '../../components/Pyramid';
import WithRefreshComponent from '../../components/utils/WithRefreshComponent';
import { total } from '../../constants/helpers';
import Container from '../../constants/Layout';
import { BaseService } from '../../environments/base.service';
import { Population_API } from '../../environments/Enums';
import useColorScheme from '../../hooks/useColorScheme';

type Props = {};

const PopulationProfileByMuncipality: FC<Props> = ( { route }: any ) => {

    const data: DataParams = route.params
    const navigation = useNavigation()
    const colorScheme = useColorScheme();

    const [ isLoading, setLoading ] = React.useState( false )
    const [ populationByMuncipality, setPopulationByMuncipality ] = React.useState( [] )

    React.useEffect( () => {
        getData()

    }, [] )

    const onRefresh = () => {
        getData()
    };

    const getData = () => {
        setLoading( true )
        new BaseService( Population_API.ByMunicipalities ).fetchWithParams( `year=${ data.location[ 'year' ] }` ).then( ( data: any ) => {
            setPopulationByMuncipality( data )
            setLoading( false )
            if ( data.length === 0 ) {
                alert( `${ route.params.title } on this location is not yet set` )
                navigation.goBack()
                setLoading( false )
            }
        } )
    }

    const isOdd = ( num: number ) => ( num % 2 )

    return (
        <Container>
            <CommonHeader title={data.title} backgroundColor={Colors[ colorScheme ].background} />
            <LocationTitle location={data.location} />
            <WithRefreshComponent onRefresh={() => onRefresh} loading={isLoading} backgroundColor={Colors[ colorScheme ].background}>
                <View>
                    <View style={style.row}>
                        {
                            headers.map( ( title: string, index: number ) => (
                                <View key={index} style={[ style.column, { backgroundColor: data.colors[ 0 ] } ]} >
                                    <Text style={[ style.headerText, { transform: [] } ]}>{title}</Text>
                                </View>
                            ) )
                        }
                    </View>
                    <View style={style.tbody}>
                        {
                            populationByMuncipality.map( ( data: any, index: number ) => (
                                <View key={index} style={[ style.row, { backgroundColor: isOdd( index ) ? 'rgba(150,150,150,.2)' : Colors[ colorScheme ].background } ]}>
                                    <View style={style.column} >
                                        <Text style={[ style.center, { color: Colors[ colorScheme ].text } ]}>{index + 1}</Text>
                                    </View>
                                    <View style={style.column} >
                                        <Text style={[ style.center, { color: Colors[ colorScheme ].text } ]}>{data.municipality}</Text>
                                    </View>
                                    <View style={style.column} >
                                        <Text style={[ style.center, { color: Colors[ colorScheme ].text } ]}>{data.barangays}</Text>
                                    </View>
                                    <View style={style.column} >
                                        <Text style={[ style.center, { color: Colors[ colorScheme ].text } ]}>{data.land_area}</Text>
                                    </View>
                                    <View style={style.column} >
                                        <Text style={[ style.center, { color: Colors[ colorScheme ].text } ]}>{data.density}</Text>
                                    </View>
                                </View>
                            ) )
                        }
                    </View>
                    <View style={style.row}>
                        {
                            headers1.map( ( title: string, index: number ) => (
                                <View key={index} style={[ style.column, { backgroundColor: data.colors[ 0 ] } ]} >
                                    <Text style={[ style.headerText, { transform: [] } ]}>{title}</Text>
                                </View>
                            ) )
                        }
                    </View>
                    <View style={style.tbody}>
                        {
                            populationByMuncipality.map( ( data: any, index: number ) => (
                                <View key={index} style={[ style.row, { backgroundColor: isOdd( index ) ? 'rgba(150,150,150,.2)' : Colors[ colorScheme ].background } ]}>
                                    <View style={style.column} >
                                        <Text style={[ style.center, { color: Colors[ colorScheme ].text } ]}>{data.males}</Text>
                                    </View>
                                    <View style={style.column} >
                                        <Text style={[ style.center, { color: Colors[ colorScheme ].text } ]}>{data.females}</Text>
                                    </View>
                                    <View style={style.column} >
                                        <Text style={[ style.center, { color: Colors[ colorScheme ].text } ]}>{total( data.males, data.females )}</Text>
                                    </View>
                                    <View style={style.column} >
                                        <Text style={[ style.center, { color: Colors[ colorScheme ].text } ]}>{data.sex_ratio}</Text>
                                    </View>
                                    <View style={style.column} >
                                        <Text style={[ style.center, { color: Colors[ colorScheme ].text } ]}>{data.household_population}</Text>
                                    </View>
                                    <View style={style.column} >
                                        <Text style={[ style.center, { color: Colors[ colorScheme ].text } ]}>{data.average_household_size}</Text>
                                    </View>
                                </View>
                            ) )
                        }
                    </View>
                </View>
            </WithRefreshComponent>
        </Container>
    );
};

const headers = [
    '#',
    '#Muncipality',
    'No of Barangays',
    'Land Area (sq.km)',
    'Population Density (person/sq.km)',
]

const headers1 = [
    'Male',
    'Female',
    'Total',
    'Sex Ratio',
    'No. of HHs',
    'Ave HH Size',
]

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


export default PopulationProfileByMuncipality;
