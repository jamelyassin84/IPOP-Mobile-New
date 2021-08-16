
import { useNavigation } from '@react-navigation/native';
import React, { FC } from 'react';
import CommonHeader from '../../../components/headers/CommonHeader';
import AddressPicker from '../../../components/pickers/address-picker/AddressPicker';
import Colors from '../../../constants/Colors';
import Container from '../../../constants/Layout';
import useColorScheme from '../../../hooks/useColorScheme';
import { PMOCChart } from './ChartEnum';


type Props = {};

const PMOC: FC<Props> = ( props ) => {
    const colorScheme = useColorScheme();
    const navigation = useNavigation();
    const [ location, setLocation ] = React.useState( {} )

    return (
        <Container>
            <CommonHeader title="Pre-Marraige Orrientation & Counselling" backgroundColor={Colors[ colorScheme ].background} />
            <AddressPicker
                menu={menus}
                choice={( choice: string ) => {
                    navigation.navigate( route[ menus.indexOf( choice ) ], Object.assign( {
                        title: choice,
                        type: 'PMOC',
                        location: location,
                        colors: [ '#0039A9', '#CD1125', 'C79500' ] //Male, Female
                    } ) )
                }}
                location={( location: any ) => {
                    setLocation( location )
                }} />
        </Container>
    );
};

const menus = [
    PMOCChart.NumberOfCouples,
    'Local Pre-Marraige Orrientation & Counselling Data',
    PMOCChart.AgeGroup,
    PMOCChart.EmployemntStatus,
    PMOCChart.FamilyPlanning,
    PMOCChart.CivilStatus,
    PMOCChart.MonthlyIncome,
    'Technical Notes',
]

const route = [
    'NumberOfCouples',
    'PMOCData',
    'AgeGroup',
    'EmployemntStatus',
    'FamilyPlanning',
    'CivilStatus',
    'MonthlyIncome',
    'TechnicalNotes'
]

export default PMOC;
