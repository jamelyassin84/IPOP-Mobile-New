
import React, { FC } from 'react';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import CommonHeader from '../../components/headers/CommonHeader';
import SummaryWithPercentAndValue from '../../components/summaries/SummaryWithPercentAndValue';
import WithRefreshComponent from '../../components/utils/WithRefreshComponent';
import Container from '../../constants/Layout';
import useColorScheme from '../../hooks/useColorScheme';
import { AntDesign } from '@expo/vector-icons';
import { BaseService } from '../../environments/base.service';
import { Population_API } from '../../environments/Enums';
import LocationTitle from '../../components/LocationTitle';
import { DataParams } from '../../components/Pyramid';

type Props = {};

const TopPopulated: FC<Props> = ( { route }: any ) => {

    const data: DataParams = route.params

    const colorScheme = useColorScheme();
    const [ isLoading, setLoading ] = React.useState( false )
    const [ municipalities, setMunicipalities ] = React.useState( [] )


    React.useEffect( () => {
        getData()
    }, [] )

    const onRefresh = () => {
        getData()
    };

    const getData = () => {
        setLoading( true )
        setMunicipalities( [] )
        new BaseService( Population_API.TopPopulated ).fetch().then( ( municipalities: any ) => {
            setMunicipalities( municipalities )
            setLoading( false )
        } )
    };

    return (
        <Container>
            <CommonHeader title={route.params.title} backgroundColor={Colors[ colorScheme ].background} />
            <LocationTitle location={data.location} />
            <WithRefreshComponent onRefresh={() => onRefresh} loading={isLoading} backgroundColor={Colors[ colorScheme ].background}>
                {
                    municipalities.map( ( municipality: any, index: number ) => (
                        <SummaryWithPercentAndValue
                            municipality={municipality.data}
                            key={index}
                            backgroundColor="orange"
                            icon={<AntDesign name="user" size={24} color="white" />} />
                    ) )
                }

            </WithRefreshComponent>
        </Container>
    );
};

export default TopPopulated;
