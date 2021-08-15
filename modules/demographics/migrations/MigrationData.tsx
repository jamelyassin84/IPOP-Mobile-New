import { FontAwesome5, Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import React, { FC } from 'react';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import CommonHeader from '../../../components/headers/CommonHeader';
import LocationTitle from '../../../components/LocationTitle';
import { DataParams } from '../../../components/Pyramid';
import Summaries from '../../../components/summaries/Summaries';
import WithRefreshComponent from '../../../components/utils/WithRefreshComponent';
import { paramifyLocation } from '../../../constants/AppConstants';
import Container from '../../../constants/Layout';
import { BaseService } from '../../../environments/base.service';
import { Demographic_API } from '../../../environments/Enums';
import useColorScheme from '../../../hooks/useColorScheme';


type Props = {};


const MigrationData: FC<Props> = ( { route }: any ) => {
    const data: DataParams = route.params
    const navigation = useNavigation()
    const colorScheme = useColorScheme();

    const [ isLoading, setLoading ] = React.useState( false )
    const [ localData, setLocalData ]: any = React.useState( {} )

    React.useEffect( () => {
        getData()
    }, [] )

    const onRefresh = () => {
        getData()
    };

    const getData = () => {
        setLocalData( {} )
        setLoading( true )
        new BaseService( Demographic_API.Migration ).fetchWithParams( paramifyLocation( data.location ) ).then( ( data: any ) => {
            setLocalData( data.data )
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
            <CommonHeader title="Local Marriage Data" backgroundColor={Colors[ colorScheme ].background} />
            <LocationTitle location={data.location} />
            <WithRefreshComponent onRefresh={() => onRefresh} loading={isLoading} backgroundColor={Colors[ colorScheme ].background}>

                <Summaries
                    title="Total In Migrations"
                    value={localData?.total_in_migrations || 0}
                    backgroundColor={'rgba(33, 150, 245,.4)'}
                    icon={<FontAwesome5 name="plane-arrival" size={24} color="#2196F5" />}
                />

                <Summaries
                    title="Total Out Migrations"
                    value={localData?.total_out_migrations || 0}
                    backgroundColor='rgba(239, 108, 72,.1)'
                    icon={<FontAwesome5 name="plane-departure" size={24} color='rgba(239, 108, 72,1)' />}
                />

                <Summaries
                    title="Net Migrations"
                    value={localData?.net_migrations || 0}
                    backgroundColor='rgba(251, 187, 37,.2)'
                    icon={<Ionicons name="airplane" size={24} color="rgba(251, 187, 37,1)" />}
                />

            </WithRefreshComponent>
        </Container>
    );
};

export default MigrationData;
