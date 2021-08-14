
import { useNavigation } from '@react-navigation/native';
import React, { FC } from 'react';
import CommonHeader from '../../components/headers/CommonHeader';
import AddressPicker from '../../components/pickers/address-picker/AddressPicker';
import { PYramidType } from '../../components/Pyramid';
import Colors from '../../constants/Colors';
import Container from '../../constants/Layout';
import useColorScheme from '../../hooks/useColorScheme';

type Props = {};

const PopulationData: FC<Props> = ( props ) => {

    const colorScheme = useColorScheme();
    const navigation = useNavigation();

    const [ location, setLocation ] = React.useState( {} )

    React.useEffect( () => {

    }, [] )

    const getData = ( location?: any ) => {

    }

    return (
        <Container>
            <CommonHeader title="Population Data" backgroundColor={Colors[ colorScheme ].background} />
            <AddressPicker
                menu={menus}
                choice={( choice: string ) => {
                    navigation.navigate( route[ menus.indexOf( choice ) ], Object.assign( {
                        title: choice,
                        type: PYramidType.Population,
                        location: location,
                        colors: [ '#0039A9', '#CD1125' ] //Male, Female
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
    'Top Populated Municipality',
    'Population Pyramid',
    'Population By Age Group and Sex',
    'Population Profile',
    'Population Profile By Municipality',
    'Age Distribution (Province of Iloilo)',
    'Age Dependency Ratio (Province of Iloilo)',
    'Age Distribution and Age Dependency Ratio by Municipality',
    'Technical Notes'
]

const route = [
    'TopPopulated',
    'Pyramid',
    'AgeDistributionTable',
    'PopulationProfile',
    'PopulationProfileByMuncipality',
    'AgeDistribution',
    'AgeDependecy',
    'AgeDistributionAndAgeDependencyRatioByMunicipality',
    'TechnicalNotes'
]

export default PopulationData;
