import { useNavigation } from '@react-navigation/native';
import React, { FC } from 'react';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import CommonHeader from '../../../components/headers/CommonHeader';
import DistrictWithMunicipalityTitle from '../../../components/top-titles/DistrictWithMunicipalityTitle';
import WithRefreshComponent from '../../../components/utils/WithRefreshComponent';
import Container from '../../../constants/Layout';
import { BaseService } from '../../../environments/base.service';
import { MPCFDC_API } from '../../../environments/Enums';
import useColorScheme from '../../../hooks/useColorScheme';
import MPCFDCPersonnelIncharge from './MPCFDCPersonnelIncharge';

type Props = {};

const MPCFDCTeam: FC<Props> = ( { route }: any ) => {

    const data: any = route.params
    const colorScheme = useColorScheme();
    const navigation = useNavigation();

    const [ isLoading, setLoading ] = React.useState( false )
    const [ value, setValue ]: any = React.useState( [] )

    React.useEffect( () => {
        getData()
    }, [] )

    const onRefresh = () => {
        getData()
    };

    const getData = () => {
        setLoading( true )
        new BaseService( MPCFDC_API.MpcFdcTeam ).fetchWithParams( `district=${ data.location[ 'district' ] }&municipality=${ data.location[ 'municipality' ] }` ).then( ( data: any ) => {
            setValue( data.data )
            console.log( data.data )
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
            <CommonHeader title={route.params.title} backgroundColor={Colors[ colorScheme ].background} />
            <WithRefreshComponent onRefresh={() => onRefresh} loading={isLoading} backgroundColor={Colors[ colorScheme ].background}>
                {
                    value.map( ( personnel: any, index: number ) => (
                        <MPCFDCPersonnelIncharge personnel={personnel} key={index} />
                    ) )
                }
            </WithRefreshComponent>
        </Container>
    );
};

export default MPCFDCTeam;
