import { useNavigation } from '@react-navigation/native';
import React, { FC } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import CommonHeader from '../../components/headers/CommonHeader';
import LocationTitle from '../../components/top-titles/LocationTitle';
import { DataParams } from '../../components/Pyramid';
import WithRefreshComponent from '../../components/utils/WithRefreshComponent';
import Colors from '../../constants/Colors';
import { isOdd } from '../../constants/helpers';
import Container from '../../constants/Layout';
import { BaseService } from '../../environments/base.service';
import { Population_API } from '../../environments/Enums';
import useColorScheme from '../../hooks/useColorScheme';


type Props = {};

const AgeDistributionAndAgeDependencyRatioByMunicipality: FC<Props> = ( { route }: any ) => {

    const data: DataParams = route.params
    const navigation = useNavigation()
    const colorScheme = useColorScheme();

    const [ isLoading, setLoading ] = React.useState( false )
    const [ ageDistribution, setAgeDistribution ] = React.useState( [] )

    React.useEffect( () => {
        getData()
    }, [] )

    const onRefresh = () => {
        getData()
    };

    const getData = () => {
        setLoading( true )
        new BaseService( Population_API.ByMunicipalities ).fetchWithParams( `year=${ data.location[ 'year' ] }` ).then( ( data: any ) => {
            setAgeDistribution( data )
            setLoading( false )
            if ( data.length === 0 ) {
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
                            ageDistribution.map( ( item: any, index: number ) => (
                                <View key={index} style={[ style.row, { backgroundColor: isOdd( index ) ? 'rgba(150,150,150,.2)' : Colors[ colorScheme ].background } ]}>
                                    <View style={style.column} >
                                        <Text style={[ style.center, { color: Colors[ colorScheme ].text } ]}>{item.municipality}</Text>
                                    </View>
                                    <View style={style.column} >
                                        <Text style={[ style.center, { color: Colors[ colorScheme ].text } ]}>{item.hh_population}</Text>
                                    </View>
                                    <View style={style.column} >
                                        <Text style={[ style.center, { color: Colors[ colorScheme ].text } ]}>{item[ '0-14' ]}</Text>
                                    </View>
                                    <View style={style.column} >
                                        <Text style={[ style.center, { color: Colors[ colorScheme ].text } ]}>{item[ '15-64' ]}</Text>
                                    </View>
                                    <View style={style.column} >
                                        <Text style={[ style.center, { color: Colors[ colorScheme ].text } ]}>{item[ '65_and_over' ]}</Text>
                                    </View>
                                    <View style={style.column} >
                                        <Text style={[ style.center, { color: Colors[ colorScheme ].text } ]}>{item.young_dependency}</Text>
                                    </View>
                                    <View style={style.column} >
                                        <Text style={[ style.center, { color: Colors[ colorScheme ].text } ]}>{item.old_dependency}</Text>
                                    </View>
                                    <View style={style.column} >
                                        <Text style={[ style.center, { color: Colors[ colorScheme ].text } ]}>{item.dependency}</Text>
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
    'Muncipality',
    'HH Population',
    '0-14',
    '15-64',
    '65 and Over',
    'Young Dependecy',
    'Old Dependecy',
    'Dependecy',
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
export default AgeDistributionAndAgeDependencyRatioByMunicipality;
