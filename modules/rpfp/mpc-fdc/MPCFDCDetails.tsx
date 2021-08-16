
import { useNavigation } from '@react-navigation/native';
import React, { FC } from 'react';
import { Text } from 'react-native';
import CommonHeader from '../../../components/headers/CommonHeader';
import Carousel from '../../../components/utils/Carousel';
import Colors from '../../../constants/Colors';
import Container from '../../../constants/Layout';
import { BaseService } from '../../../environments/base.service';
import { MPCFDC_API } from '../../../environments/Enums';
import useColorScheme from '../../../hooks/useColorScheme';
import MPCFDCPersonnelIncharge from './MPCFDCPersonnelIncharge';

type Props = {};

const MPCFDCDetails: FC<Props> = ( { route }: any ) => {

    const data: any = route.params
    const colorScheme = useColorScheme();

    const [ images, setImages ] = React.useState( [] )
    const [ personnels, setPersonnels ] = React.useState( [] )

    React.useEffect( () => {
        let temp: any = []
        for ( let image of data.files ) {
            temp.push( image.file.uri )
        }
        setImages( temp )
        getPersonnelIncharge()
    }, [] )


    const getPersonnelIncharge = () => {
        new BaseService( MPCFDC_API.MpcFdcPersonnelIncharge ).fetchWithParams( `mpcfdc_id=${ data.id }` ).then( ( data: any ) => {
            setPersonnels( data )
        } )
    }

    return (
        <Container>
            <CommonHeader title={`${ data.name } of ${ data.municipality }, District ${ data.district }`} backgroundColor={Colors[ colorScheme ].background} />
            <Carousel images={images} backgroundColor={Colors[ colorScheme ].background} />
            <Text style={{ color: Colors[ colorScheme ].text, textAlign: 'center', padding: 16 }}>{data.services}</Text>
            <Text style={{ color: Colors[ colorScheme ].text, padding: 16, fontSize: 16, fontWeight: 'bold', marginTop: 50 }}>Personnels Incharge</Text>
            {
                personnels.map( ( personnel: any, index: number ) => (
                    <MPCFDCPersonnelIncharge personnel={personnel} />
                ) )
            }
        </Container>
    );
};

export default MPCFDCDetails;
