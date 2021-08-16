import React, { FC } from 'react';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import CommonHeader from '../../../components/headers/CommonHeader';
import DistrictTile from '../../../components/top-titles/DistrictTile';
import WithRefreshComponent from '../../../components/utils/WithRefreshComponent';
import Container from '../../../constants/Layout';
import { BaseService } from '../../../environments/base.service';
import { AHYD_API } from '../../../environments/Enums';
import useColorScheme from '../../../hooks/useColorScheme';
import MPCFDCPersonnelIncharge from '../../rpfp/mpc-fdc/MPCFDCPersonnelIncharge';

type Props = {};

const TCFocalPerson: FC<Props> = ( { route }: any ) => {

    const data: any = route.params
    const colorScheme = useColorScheme();

    const [ isLoading, setLoading ] = React.useState( false )
    const [ personnels, setPersonnels ] = React.useState( [] )

    React.useEffect( () => {
        getPersonnelIncharge()
    }, [] )

    const onRefresh = () => {
        getPersonnelIncharge()
    }

    const getPersonnelIncharge = () => {
        setLoading( true )
        new BaseService( AHYD_API.FocalPersons ).fetch().then( ( data: any ) => {
            setLoading( false )
            setPersonnels( data )
        } )
    }

    return (
        <Container>
            <CommonHeader title={route.params.title} backgroundColor={Colors[ colorScheme ].background} />
            <DistrictTile location={data.location} />
            <WithRefreshComponent onRefresh={() => onRefresh} loading={isLoading} backgroundColor={Colors[ colorScheme ].background}>
                {
                    personnels.map( ( personnel: any, index: number ) => (
                        <MPCFDCPersonnelIncharge personnel={personnel} key={index} />
                    ) )
                }
            </WithRefreshComponent>
        </Container>
    );
};

export default TCFocalPerson;
