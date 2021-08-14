
import { useNavigation } from '@react-navigation/native';
import React, { FC } from 'react';
import CommonHeader from '../../../components/headers/CommonHeader';
import LocationAndDistrictPicker from '../../../components/pickers/mpc-fdc-picker/LocationAndDistrictPicker';
import Colors from '../../../constants/Colors';
import Container from '../../../constants/Layout';
import useColorScheme from '../../../hooks/useColorScheme';


type Props = {};

const MPFCFDC: FC<Props> = ( props ) => {
    const colorScheme = useColorScheme();
    const navigation = useNavigation();

    const [ location, setLocation ] = React.useState( {} )

    React.useEffect( () => {

    }, [] )

    const getData = ( location?: any ) => {

    }

    return (
        <Container>
            <CommonHeader title="Multi-Purpose Counseling & Family Development Center" backgroundColor={Colors[ colorScheme ].background} />
            <LocationAndDistrictPicker menu={menus}
                choice={( choice: string ) => {
                    navigation.navigate( route[ menus.indexOf( choice ) ], Object.assign( {
                        title: choice,
                        type: 'Population',
                        location
                    } ) )
                }}
                location={( location: any ) => {
                    setLocation( location )
                    getData( location )
                }} />
        </Container>
    );
};

const menus = [
    'Multi-purpose Counseling and Family Development Centers',
    'Multi-purpose Counseling and Family Development Team',
    'Personnels Incharge'
]

const route = [
    'MPCFDCData',
    'MPCFDCTeam',
    'MPCFDCPersonnelIncharge',
]

export default MPFCFDC;
