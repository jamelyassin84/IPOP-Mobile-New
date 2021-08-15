import { AntDesign, Ionicons } from '@expo/vector-icons';
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

const BirthData: FC<Props> = ( { route }: any ) => {

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
        new BaseService( Demographic_API.Birth ).fetchWithParams( paramifyLocation( data.location ) ).then( ( data: any ) => {
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
                    title="Crude Birth Rate"
                    value={localData?.crude_birth_rate || 0}
                    backgroundColor='rgba(0, 60, 163,.2)'
                    icon={<Ionicons name="pulse" size={24} color='rgba(0, 60, 163,1)' />}
                />

                <Summaries
                    title="General Fertility Rate"
                    value={localData?.general_fertility_rate || 0}
                    backgroundColor='rgba(12, 176, 86,.2)'
                    icon={<Ionicons name="pulse" size={24} color='rgba(12, 176, 86,1)' />}
                />

                <Summaries
                    title="Teenage Births"
                    value={localData?.teenage_births || 0}
                    backgroundColor='rgba(255, 179, 0,.2)'
                    icon={<Ionicons name="pulse" size={24} color='rgba(255, 179, 0,1)' />}
                />

                <Summaries
                    title="Illegitmate Births"
                    value={localData?.illegitimate_births || 0}
                    backgroundColor='rgba(233, 30, 99,.2)'
                    icon={<Ionicons name="pulse" size={24} color='rgba(233, 30, 99,1)' />}
                />


            </WithRefreshComponent>
        </Container>
    );
};

export default BirthData;
