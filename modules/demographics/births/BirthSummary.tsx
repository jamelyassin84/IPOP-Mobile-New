import { AntDesign, Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import React, { FC } from 'react';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import CommonHeader from '../../../components/headers/CommonHeader';
import LocationTitle from '../../../components/LocationTitle';
import { DataParams } from '../../../components/Pyramid';
import Summaries from '../../../components/summaries/Summaries';
import SummariesWithPercent from '../../../components/summaries/SummariesWithPercent';
import WithRefreshComponent from '../../../components/utils/WithRefreshComponent';
import { getPercent } from '../../../constants/helpers';
import Container from '../../../constants/Layout';
import { BaseService } from '../../../environments/base.service';
import { Summary_API } from '../../../environments/Enums';
import useColorScheme from '../../../hooks/useColorScheme';

type Props = {};

const BirthSummary: FC<Props> = ( { route }: any ) => {

    const data: DataParams = route.params
    const navigation = useNavigation()
    const colorScheme = useColorScheme();

    const [ isLoading, setLoading ] = React.useState( false )
    const [ summaries, setSummaries ]: any = React.useState( {} )

    React.useEffect( () => {
        getData()
    }, [] )

    const onRefresh = () => {
        getData()
    };

    const getData = () => {
        setSummaries( {} )
        setLoading( true )
        new BaseService( Summary_API.Birth ).fetchWithParams( `year=${ data.location[ 'year' ] }` ).then( ( data: any ) => {
            setSummaries( data )
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
                    title="Total Population"
                    value={summaries?.summary?.total_population || 0}
                    backgroundColor={'rgba(33, 150, 245,.2)'}
                    icon={<AntDesign name="user" size={24} color="#2196F5" />}
                />

                <Summaries
                    title="Total Live Births"
                    value={summaries?.summary?.total_live_births || 0}
                    backgroundColor='rgba(58, 196, 140,.2)'
                    icon={<Ionicons name="pulse" size={24} color='rgba(58, 196, 140,1)' />}
                />

                <Summaries
                    title="Crude Birth Rate"
                    value={summaries?.summary?.crude_birth_rate || 0}
                    backgroundColor='rgba(58, 196, 140,.2)'
                    icon={<Ionicons name="pulse" size={24} color='rgba(58, 196, 140,1)' />}
                />

                <SummariesWithPercent
                    title="Teenage Births"
                    value={summaries?.summary?.teenage || 0}
                    percent={getPercent(
                        summaries?.teenage?.value || 0,
                        summaries?.summary?.total_live_births || 0
                    )}
                    backgroundColor='rgba(251, 187, 37,.2)'
                    icon={<Ionicons name="pulse" size={24} color='rgba(251, 187, 37,1)' />}
                />

                <SummariesWithPercent
                    title="Illegitimate  Births"
                    value={summaries?.summary?.illegitimate || 0}
                    percent={getPercent(
                        summaries?.illegitimate?.value || 0,
                        summaries?.summary?.total_live_births || 0
                    )}
                    backgroundColor='rgba(244, 67, 54,.2)'
                    icon={<Ionicons name="pulse" size={24} color="rgba(244, 67, 54,1)" />}
                />

            </WithRefreshComponent>
        </Container>
    );
};

export default BirthSummary;
