
import { useNavigation } from '@react-navigation/native';
import React, { FC } from 'react';
import CommonHeader from '../../../components/headers/CommonHeader';
import DistrictPicker from '../../../components/pickers/DistrictPicker';
import Colors from '../../../constants/Colors';
import Container from '../../../constants/Layout';
import useColorScheme from '../../../hooks/useColorScheme';

type Props = {};

const TeenCenter: FC<Props> = ( props ) => {

    const colorScheme = useColorScheme();
    const navigation = useNavigation();

    const [ location, setLocation ] = React.useState( {} )

    React.useEffect( () => {

    }, [] )

    const getData = ( location?: any ) => {

    }

    return (
        <Container>
            <CommonHeader title="Teen Centers" backgroundColor={Colors[ colorScheme ].background} />
            <DistrictPicker
                menu={menus}
                choice={( choice: string ) => {
                    navigation.navigate( route[ menus.indexOf( choice ) ], Object.assign( {
                        title: choice,
                        type: 'TeenCenter',
                        location
                    } ) )
                }}
                location={( location: any ) => {
                    setLocation( location )
                    getData( location )
                }} />
        </Container>
    )
};

const menus: any = [
    'Teen Centers',
    'Focal Persons',
    'Adolscent Health and Youth Development Team',
]

const route: any = [
    'TeenCenterData',
    'TCFocalPerson',
    'AHYDTeam',
]

export default TeenCenter;
