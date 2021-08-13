
import React, { FC } from 'react';
import CommonHeader from '../../components/headers/CommonHeader';
import ActivitiesComponent from '../../components/programs/ActivitiesComponent';
import WithRefreshComponent from '../../components/WithRefreshComponent';
import Colors from '../../constants/Colors';
import Container from '../../constants/Layout';
import { BaseService } from '../../environments/base.service';
import { ProgramAreas_API } from '../../environments/Enums';
import useColorScheme from '../../hooks/useColorScheme';
import { ProgramActivities, ProgramArea } from './ProgramArea';

type Props = {};

const Activities: FC<Props> = ( { route }: any ) => {

    const colorScheme = useColorScheme();

    const program: ProgramArea = route.params

    const [ isLoading, setLoading ] = React.useState( false )
    const [ activities, setActivities ]: any = React.useState( [] )

    React.useEffect( () => {
        getActivities()
    }, [] )

    const onRefresh = () => {
        getActivities();
    };

    const getActivities = () => {
        setActivities( [] )
        setLoading( true )
        new BaseService( ProgramAreas_API.ProgramAreas ).fetchOne( program.id, '' ).then( ( data: any ) => {
            setActivities( data.activities )
            setLoading( false )
        } )
    };

    return (
        <Container>
            <CommonHeader title={program.title} backgroundColor={Colors[ colorScheme ].background} />
            <WithRefreshComponent loading={isLoading} onRefresh={() => onRefresh}>
                {
                    activities.map( ( activity: ProgramActivities, index: number ) => (
                        <ActivitiesComponent key={index} activity={activity} />
                    ) )
                }
            </WithRefreshComponent>
        </Container>
    );
};

export default Activities;
