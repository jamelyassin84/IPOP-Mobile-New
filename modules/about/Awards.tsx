
import React, { FC } from 'react';
import AwardComponent, { AwardType } from '../../components/about/AwardComponent';
import CommonHeader from '../../components/headers/CommonHeader';
import WithRefreshComponent from '../../components/WithRefreshComponent';
import Colors from '../../constants/Colors';
import Container from '../../constants/Layout';
import { BaseService } from '../../environments/base.service';
import { About_API } from '../../environments/Enums';
import useColorScheme from '../../hooks/useColorScheme';

type Props = {};

const Awards: FC<Props> = ( props ) => {

    const colorScheme = useColorScheme();

    const [ awards, setAwards ] = React.useState( [] )
    const [ isLoading, setLoading ] = React.useState( false )

    React.useEffect( () => {
        getAwards()
    }, [] )

    const onRefresh = () => {
        getAwards()
    };

    const getAwards = () => {
        setLoading( true )
        new BaseService( About_API.Awards ).fetch( '' ).then( ( awards: any ) => {
            setAwards( awards )
            setLoading( false )
        } )
    }

    return (
        <Container>
            <CommonHeader title="Awards" backgroundColor={Colors[ colorScheme ].background} />
            <WithRefreshComponent onRefresh={() => onRefresh} loading={isLoading}>
                {
                    awards.map( ( award: AwardType, index: number ) => (
                        <AwardComponent key={index} award={award} />
                    ) )
                }
            </WithRefreshComponent>
        </Container>
    );
};

export default Awards;
