import { AntDesign } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import React, { FC } from 'react';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import CommonHeader from '../../../components/headers/CommonHeader';
import LocationTitle from '../../../components/LocationTitle';
import { DataParams } from '../../../components/Pyramid';
import Summaries from '../../../components/summaries/Summaries';
import SummariesWithPercent from '../../../components/summaries/SummariesWithPercent';
import WithRefreshComponent from '../../../components/utils/WithRefreshComponent';
import { paramifyLocation } from '../../../constants/AppConstants';
import Container from '../../../constants/Layout';
import { BaseService } from '../../../environments/base.service';
import { Demographic_API } from '../../../environments/Enums';
import useColorScheme from '../../../hooks/useColorScheme';

type Props = {};

const DeathData: FC<Props> = ( { route }: any ) => {

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
        new BaseService( Demographic_API.Death ).fetchWithParams( paramifyLocation( data.location ) ).then( ( data: any ) => {
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
            <CommonHeader title={data.title} backgroundColor={Colors[ colorScheme ].background} />
            <LocationTitle location={data.location} />
            <WithRefreshComponent onRefresh={() => onRefresh} loading={isLoading} backgroundColor={Colors[ colorScheme ].background}>

                <Summaries
                    title="Population"
                    value={localData?.population || 0}
                    backgroundColor={'#0039A9'}
                    icon={<AntDesign name="user" size={24} color="#2196F5" />}
                />

                <Summaries
                    title="Total Deaths"
                    value={localData?.total || 0}
                    backgroundColor={'red'}
                    icon={<AntDesign name="poweroff" size={24} color="white" />}
                />

                <SummariesWithPercent
                    title="Crude Death Rate"
                    value={localData?.crude_death_rate || 0}
                    percent={localData?.crude_death_rate}
                    backgroundColor={'red'}
                    icon={<AntDesign name="poweroff" size={24} color="white" />}
                />

            </WithRefreshComponent>
        </Container>
    );
};

export default DeathData;
