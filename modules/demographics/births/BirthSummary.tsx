import { AntDesign, Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import React, { FC } from 'react';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import CommonHeader from '../../../components/headers/CommonHeader';
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
            console.log( data )
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
            <CommonHeader title="Summary (Province of Iloilo)" backgroundColor={Colors[ colorScheme ].background} />
            <WithRefreshComponent onRefresh={() => onRefresh} loading={isLoading} backgroundColor={Colors[ colorScheme ].background}>

                <Summaries
                    title="Total Population"
                    value={summaries?.summary?.total_population || 0}
                    backgroundColor={'#0039A9'}
                    icon={<AntDesign name="user" size={24} color="white" />}
                />

                <Summaries
                    title="Total Live Births"
                    value={summaries?.summary?.total_live_births || 0}
                    backgroundColor={'#3AC48C'}
                    icon={<Ionicons name="pulse" size={24} color="white" />}
                />

                <Summaries
                    title="Crude Birth Rate"
                    value={summaries?.summary?.crude_birth_rate || 0}
                    backgroundColor={'#3AC48C'}
                    icon={<Ionicons name="pulse" size={24} color="white" />}
                />

                <SummariesWithPercent
                    title="Teenage Births"
                    value={summaries?.summary?.teenage || 0}
                    percent={getPercent(
                        summaries?.teenage?.value || 0,
                        summaries?.summary?.total_live_births || 0
                    )}
                    backgroundColor={'orange'}
                    icon={<Ionicons name="pulse" size={24} color="white" />}
                />


                <SummariesWithPercent
                    title="Illegitimate  Births"
                    value={summaries?.summary?.illegitimate || 0}
                    percent={getPercent(
                        summaries?.illegitimate?.value || 0,
                        summaries?.summary?.total_live_births || 0
                    )}
                    backgroundColor={'red'}
                    icon={<Ionicons name="pulse" size={24} color="white" />}
                />

            </WithRefreshComponent>
        </Container>
    );
};

export default BirthSummary;
