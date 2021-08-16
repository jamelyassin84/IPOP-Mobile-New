import { Entypo, MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import React, { FC } from 'react';
import { Text } from 'react-native';
import { TouchableOpacity } from 'react-native';
import CommonHeader from '../../../components/headers/CommonHeader';
import { DataParams } from '../../../components/Pyramid';
import DistrictWithMunicipalityTitle from '../../../components/top-titles/DistrictWithMunicipalityTitle';
import WithRefreshComponent from '../../../components/utils/WithRefreshComponent';
import Colors from '../../../constants/Colors';
import Container from '../../../constants/Layout';
import { BaseService } from '../../../environments/base.service';
import { MPCFDC_API } from '../../../environments/Enums';
import useColorScheme from '../../../hooks/useColorScheme';


type Props = {};

const MPCFDCData: FC<Props> = ( { route }: any ) => {

    const data: DataParams = route.params
    const colorScheme = useColorScheme();
    const navigation = useNavigation();

    const [ isLoading, setLoading ] = React.useState( false )
    const [ value, setValue ]: any = React.useState( [] )

    React.useEffect( () => {
        getData()

    }, [] )

    const onRefresh = () => {
        getData()
    };

    const getData = () => {
        setLoading( true )
        new BaseService( MPCFDC_API.MpcFdcData ).fetchWithParams( `district=${ data.location[ 'district' ] }&municipality=${ data.location[ 'municipality' ] }` ).then( ( data: any ) => {
            setValue( data )
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
            <DistrictWithMunicipalityTitle location={data.location} />
            <WithRefreshComponent onRefresh={() => onRefresh} loading={isLoading} backgroundColor={Colors[ colorScheme ].background}>
                {
                    value.map( ( mpc: any, index: any ) => (
                        <TouchableOpacity
                            style={{
                                flexDirection: 'row',
                                padding: 16,
                                borderWidth: 1,
                                borderColor: 'rgba(150,150,150,.2)'
                            }}
                            key={index}
                            onPress={() => {
                                navigation.navigate( 'MPCFDCDetails', mpc )
                            }}
                        >
                            <MaterialCommunityIcons
                                name='home-city'
                                size={25} color='#A30010' />
                            <Text
                                style={{
                                    color: Colors[ colorScheme ].text,
                                    marginLeft: 15,
                                    textTransform: 'capitalize',
                                    fontSize: 20,
                                    flex: 3
                                }}
                            > {mpc.name}</Text>
                            <Text style={{ color: 'gray', textTransform: 'capitalize' }}>     {mpc.location} </Text>
                            <Entypo name="chevron-small-right" size={24} color="gray" />
                        </TouchableOpacity>
                    ) )
                }
            </WithRefreshComponent>
        </Container>
    );
};

export default MPCFDCData;
