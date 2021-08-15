import { useNavigation } from '@react-navigation/native';
import React, { FC } from 'react';
import CommonHeader from '../../../components/headers/CommonHeader';
import AddressPicker from '../../../components/pickers/address-picker/AddressPicker';
import Colors from '../../../constants/Colors';
import Container from '../../../constants/Layout';
import useColorScheme from '../../../hooks/useColorScheme';

type Props = {};

const Migrations: FC<Props> = ( props ) => {
    const colorScheme = useColorScheme();
    const navigation = useNavigation();

    const [ location, setLocation ] = React.useState( {} )

    React.useEffect( () => {

    }, [] )

    const getData = ( location?: any ) => {

    }

    return (
        <Container>
            <CommonHeader title="Migrations" backgroundColor={Colors[ colorScheme ].background} />
            <AddressPicker
                menu={menus}
                choice={( choice: string ) => {
                    navigation.navigate( route[ menus.indexOf( choice ) ], Object.assign( {
                        title: choice,
                        type: 'Migration',
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

const menus: string[] = [
    'Migration Summary (Province of Iloilo)',
    'Migration Statistics (Migrations by Months)',
    'Local Migrations Data',
    'Migrations Chart',
    'Migrations by Municipality',
    'Technical Notes',
]

const route: string[] = [
    'MigrationSummary',
    'MonthChart',
    'MigrationData',
    'MigrationChart',
    'ByMunicipalityTable',
    'TechnicalNotes'
]

export default Migrations;
