

import { useNavigation } from '@react-navigation/native';
import React, { FC } from 'react';
import CommonHeader from '../../../components/headers/CommonHeader';
import AddressPicker from '../../../components/pickers/address-picker/AddressPicker';
import { PYramidType } from '../../../components/Pyramid';
import Colors from '../../../constants/Colors';
import Container from '../../../constants/Layout';
import useColorScheme from '../../../hooks/useColorScheme';
type Props = {};

const Deaths: FC<Props> = ( props ) => {

    const colorScheme = useColorScheme();
    const navigation = useNavigation();

    const [ location, setLocation ] = React.useState( {} )

    React.useEffect( () => {

    }, [] )

    const getData = ( location?: any ) => {

    }

    return (
        <Container>
            <CommonHeader title="Deaths" backgroundColor={Colors[ colorScheme ].background} />
            <AddressPicker
                menu={menus}
                choice={( choice: string ) => {
                    navigation.navigate( route[ menus.indexOf( choice ) ], Object.assign( {
                        title: choice,
                        type: PYramidType.Death,
                        location: location,
                        colors: [ '#282C34', '#CD1125','#A90E1E'] //Male, Female
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
    'Death Summary (Province of Iloilo)',
    'Death Pyramid',
    'Death by Age Group and Sex',
    'Death Statistics (Deaths by Months)',
    'Local Death Data',
    'Crude Death Rate',
    'Death by Municipality',
    'Technical Notes',
]

const route: string[] = [
    'DeathSummary',
    'Pyramid',
    'AgeDistributionTable',
    'MonthChart',
    'DeathData',
    'Incidence',
    'ByMunicipalityTable',
    'TechnicalNotes'
]

export default Deaths;
