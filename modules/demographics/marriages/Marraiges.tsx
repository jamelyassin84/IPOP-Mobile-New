import { useNavigation } from '@react-navigation/native';
import React, { FC } from 'react';
import CommonHeader from '../../../components/headers/CommonHeader';
import AddressPicker from '../../../components/pickers/address-picker/AddressPicker';
import { PYramidType } from '../../../components/Pyramid';
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
                        type: PYramidType.Marriage,
                        location: location,
                        colors: [ '#FFD1AD', '#E59448', '#C79500', '#BE7C19' ] //Male, Female
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
    'Marriage Summary (Province of Iloilo)',
    'Marriage by Month of Wedding',
    'Local Marriage  Data',
    'Type of Weddings',
    'Marriages  by Municipality',
    'Technical Notes',
]

const route: string[] = [
    'MarriageSummary',
    'MonthChart',
    'MarriageData',
    'TypeofWeddings',
    'ByMunicipalityTable',
    'TechnicalNotes'
]

export default Marraiges;
