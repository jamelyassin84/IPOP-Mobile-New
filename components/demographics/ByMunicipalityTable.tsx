import { useNavigation } from '@react-navigation/native';
import React, { FC } from 'react';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import CommonHeader from '../../components/headers/CommonHeader';
import WithRefreshComponent from '../../components/utils/WithRefreshComponent';
import Container from '../../constants/Layout';
import useColorScheme from '../../hooks/useColorScheme';
import { DataParams, PYramidType } from '../Pyramid';
import style from '../../styles/table/defaultTable'
import { Text, View } from 'react-native';
import { BaseService } from '../../environments/base.service';
import { ByMuniipality_API } from '../../environments/Enums';
import { isOdd } from '../../constants/helpers';

type Props = {};

const ByMunicipalityTable: FC<Props> = ( { route }: any ) => {

    const data: DataParams = route.params
    const navigation = useNavigation()
    const colorScheme = useColorScheme();

    const [ isLoading, setLoading ] = React.useState( false )
    const [ headers, setHeaders ]: any = React.useState( [] )
    const [ keys, setKeys ]: any = React.useState( [] )
    const [ values, setValues ]: any = React.useState( [] )

    React.useEffect( () => {
        getData()
        setDataAndHeaders()
    }, [] )

    const onRefresh = () => {
        getData()
    };

    const getData = () => {
        setLoading( true )
        let api = ''
        if ( data.type === PYramidType.Birth ) api = ByMuniipality_API.Birth
        if ( data.type === PYramidType.Death ) api = ByMuniipality_API.Death
        if ( data.type === PYramidType.Migration ) api = ByMuniipality_API.Migration
        if ( data.type === PYramidType.Marriage ) api = ByMuniipality_API.Marriages
        new BaseService( api ).fetchWithParams( `year=${ data.location[ 'year' ] }` ).then( ( data ) => {
            if ( data.length === 0 ) {
                alert( `${ route.params.title } on this location is not yet set` )
                navigation.goBack()
                setLoading( false )
                return
            }
            setValues( data )
            setLoading( false )
        } )
    }

    const setDataAndHeaders = () => {
        if ( data.type === PYramidType.Birth ) {
            setHeaders( birthHeaders ); setKeys( birthData )
        }
        if ( data.type === PYramidType.Death ) {
            setHeaders( deathHeaders ); setKeys( deathData )
        }
        if ( data.type === PYramidType.Migration ) {
            setHeaders( migrationHeaders ); setKeys( migrationData )
        }
        if ( data.type === PYramidType.Marriage ) {
            setHeaders( marriageHeaders ); setKeys( marriageData )
        }
    }

    return (
        <Container>
            <CommonHeader title={data.title} backgroundColor={Colors[ colorScheme ].background} />
            <WithRefreshComponent onRefresh={() => onRefresh} loading={isLoading} backgroundColor={Colors[ colorScheme ].background}>
                <View>
                    <View style={style.row} >
                        {
                            headers.map( ( header: any, index: number ) => (
                                <View style={[ style.column, { backgroundColor: data.colors[ 0 ] } ]} key={index} >
                                    <Text style={style.headerText}>{header}</Text>
                                </View>
                            ) )
                        }
                    </View>
                    <View style={style.tbody}>
                        {
                            values.map( ( value: any, index: number ) => (
                                <View key={index} style={[ style.row, { backgroundColor: isOdd( index ) ? 'rgba(150,150,150,.2)' : Colors[ colorScheme ].background } ]}>
                                    {
                                        keys.map( ( column: any, index: number ) => (
                                            <View style={style.column} key={index} >
                                                <Text style={[ style.center, { color: Colors[ colorScheme ].text } ]}>{value[ column ]}</Text>
                                            </View>
                                        ) )
                                    }
                                </View>
                            ) )
                        }
                    </View>
                </View>
            </WithRefreshComponent>
        </Container>
    );
};

const birthHeaders = [
    'Municipality',
    'Crude Birth Rate',
    'Teenage Births',
    'Illegitimate Births',
    'General Fertility Rate',
]

const deathHeaders = [
    'Municipality',
    'Population',
    'Deaths',
    'Crude Death Rate',
]

const migrationHeaders = [
    'Municipality',
    'In-Migration Rate (per 100 population)',
    'Out-Migration Rate(per 100 population)',
    'Net Migration Rate(per 100 population)',
]

const marriageHeaders = [
    'Municipality',
    'Population',
    'Total Marriages',
    'Church',
    'Civil',
    'Others',
]

const birthData = [
    'municipality',
    'crude_birth_rate',
    'teenage_births	',
    'illegitimate_births',
    'general_fertility_rate',
]

const deathData = [
    'municipality',
    'population',
    'total',
    'crude_death_rate',
]

const migrationData = [
    'municipality',
    'total_in_migrations',
    'total_out_migrations',
    'net_migrations',
]

const marriageData = [
    'municipality',
    'population',
    'total_marriages',
    'church',
    'civil',
    'others',
]



export default ByMunicipalityTable;
