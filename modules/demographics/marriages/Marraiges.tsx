import { useNavigation } from '@react-navigation/native';
import React, { FC } from 'react';
import CommonHeader from '../../../components/headers/CommonHeader';
import AddressPicker from '../../../components/pickers/address-picker/AddressPicker';
import Colors from '../../../constants/Colors';
import Container from '../../../constants/Layout';
import useColorScheme from '../../../hooks/useColorScheme';

type Props = {};


const Marraiges: FC<Props> = ( props ) => {

    const colorScheme = useColorScheme();
    const navigation = useNavigation();

    const [ location, setLocation ] = React.useState( {} )

    React.useEffect( () => {

    }, [] )

    const getData = ( location?: any ) => {

    }

    return (
        <Container>
            <CommonHeader title="Marriages" backgroundColor={Colors[ colorScheme ].background} />
            <AddressPicker
                menu={menus}
                choice={( choice: string ) => {
                    navigation.navigate( route[ menus.indexOf( choice ) ], Object.assign( {
                        title: choice,
                        type: 'Marriage',
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
    'Summary (Province of Iloilo)',
    'Marriage  Pyramid',
    'Marriage  by Age Group and Sex',
    'Marriage by Month of Wedding',
    'Local Marriage  Data',
    'Type of Weddings',
    'Marriages  by Municipality',
    'Technical Notes',
]

const route: string[] = [
    'MarriageSummary',
    'Pyramid',
    'AgeDistributionTable',
    'MonthChart',
    'MarriageData',
    'TypeofWeddings',
    'ByMunicipalityTable',
    'TechnicalNotes'
]

export default Marraiges;
