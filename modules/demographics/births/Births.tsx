
import { useNavigation } from '@react-navigation/native';
import React, { FC } from 'react';
import CommonHeader from '../../../components/headers/CommonHeader';
import AddressPicker from '../../../components/pickers/address-picker/AddressPicker';
import Colors from '../../../constants/Colors';
import Container from '../../../constants/Layout';
import useColorScheme from '../../../hooks/useColorScheme';

type Props = {};

const Births: FC<Props> = ( props ) => {

    const colorScheme = useColorScheme();
    const navigation = useNavigation();

    const [ location, setLocation ] = React.useState( {} )

    React.useEffect( () => {

    }, [] )

    const getData = ( location?: any ) => {

    }

    return (
        <Container>
            <CommonHeader title="Births" backgroundColor={Colors[ colorScheme ].background} />
            <AddressPicker
                menu={menus}
                choice={( choice: string ) => {
                    navigation.navigate( route[ menus.indexOf( choice ) ], Object.assign( {
                        title: choice,
                        type: 'Birth',
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

const menus: any = [
    'Summary (Province of Iloilo)',
    'Birth Pyramid',
    'Birth by Age Group and Sex',
    'Birth Statistics',
    'Local Birth Data',
    'Incidence of Teenage Births',
    'Incidence of Illegitimate Births',
    'Births by Municipality',
    'Technical Notes',
]

const route: any = [
    'BirthSummary',
    'Pyramid',
    'AgeDistributionTable',
    'MonthChart',
    'BirthData',
    'Incidence',
    'Incidence',
    'ByMunicipalityTable',
    'TechnicalNotes'
]

export default Births;
