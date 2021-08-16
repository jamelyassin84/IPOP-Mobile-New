import { Entypo, FontAwesome5, MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import React, { FC } from 'react';
import { Text, TouchableOpacity } from 'react-native';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import CommonHeader from '../../../components/headers/CommonHeader';
import DistrictTile from '../../../components/top-titles/DistrictTile';
import WithRefreshComponent from '../../../components/utils/WithRefreshComponent';
import Container from '../../../constants/Layout';
import { BaseService } from '../../../environments/base.service';
import { AHYD_API } from '../../../environments/Enums';
import useColorScheme from '../../../hooks/useColorScheme';

type Props = {};

const TeenCenterData: FC<Props> = ( { route }: any ) => {

    const data: any = route.params
    const navigation = useNavigation()
    const colorScheme = useColorScheme();


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
        new BaseService( AHYD_API.TeenCenter ).fetchWithParams( `district=${ data.location[ 'district' ] }` ).then( ( data: any ) => {
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
            <DistrictTile location={data.location} />
            <WithRefreshComponent onRefresh={() => onRefresh} loading={isLoading} backgroundColor={Colors[ colorScheme ].background}>
                {
                    value.map( ( tc: any, index: any ) => (
                        <TouchableOpacity
                            style={{
                                flexDirection: 'row',
                                padding: 16,
                                borderWidth: 1,
                                borderColor: 'rgba(150,150,150,.2)',
                                alignItems: 'center'
                            }}
                            key={index}
                            onPress={() => {
                                navigation.navigate( 'TeenCenterDetails', tc )
                            }}
                        >
                            <FontAwesome5 name="building"
                                size={25} color='#A30010' />
                            <Text
                                style={{
                                    color: Colors[ colorScheme ].text,
                                    marginLeft: 15,
                                    textTransform: 'capitalize',
                                    fontSize: 20,
                                    flex: 3
                                }}
                            > {tc.name}</Text>
                            <Text style={{ color: 'gray', textTransform: 'capitalize' }}>{tc.location} </Text>
                            <Entypo name="chevron-small-right" size={24} color="gray" />
                        </TouchableOpacity>
                    ) )
                }
            </WithRefreshComponent>
        </Container>
    );
};

export default TeenCenterData;
