import { Feather, FontAwesome } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import React, { FC } from 'react';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import CommonHeader from '../../../components/headers/CommonHeader';
import LocationTitle from '../../../components/top-titles/LocationTitle';
import { DataParams } from '../../../components/Pyramid';
import Summaries from '../../../components/summaries/Summaries';
import WithRefreshComponent from '../../../components/utils/WithRefreshComponent';
import { paramifyLocation } from '../../../constants/AppConstants';
import Container from '../../../constants/Layout';
import { BaseService } from '../../../environments/base.service';
import { PMOC_API } from '../../../environments/Enums';
import useColorScheme from '../../../hooks/useColorScheme';

type Props = {};

const PMOCData: FC<Props> = ( { route }: any ) => {

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
        new BaseService( PMOC_API.PmocData ).fetchWithParams( paramifyLocation( data.location ) ).then( ( data: any ) => {
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
                    title="Number of Sessions Conducted"
                    value={localData?.sessions || 0}
                    backgroundColor='rgba(0, 57, 169,.2)'
                    icon={<FontAwesome name="microphone" size={24} color="rgba(0, 57, 169,1)" />}
                />
                <Summaries
                    title="	>Number of Couples Orriented"
                    value={localData?.oriented_couples || 0}
                    backgroundColor='rgba(58, 196, 140,.2)'
                    icon={<Feather name="users" size={24} color="rgba(58, 196, 140,1)" />}
                />
                <Summaries
                    title="Number of Individual Interviewed"
                    value={localData?.individuals_interviewed || 0}
                    backgroundColor='rgba(229, 148, 72,.2)'
                    icon={<Feather name="user-plus" size={24} color="rgba(229, 148, 72,1)" />}
                />
            </WithRefreshComponent>
        </Container>
    );
};

export default PMOCData;
