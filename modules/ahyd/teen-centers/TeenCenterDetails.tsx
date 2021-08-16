
import React, { FC } from 'react';
import { Text } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import CommonHeader from '../../../components/headers/CommonHeader';
import Carousel from '../../../components/utils/Carousel';
import Colors from '../../../constants/Colors';
import Container from '../../../constants/Layout';
import { BaseService } from '../../../environments/base.service';
import { AHYD_API, MPCFDC_API } from '../../../environments/Enums';
import useColorScheme from '../../../hooks/useColorScheme';
import MPCFDCPersonnelIncharge from '../../rpfp/mpc-fdc/MPCFDCPersonnelIncharge';

type Props = {};

const TeenCenterDetails: FC<Props> = ( { route }: any ) => {

    const data: any = route.params
    const colorScheme = useColorScheme();

    const [ images, setImages ] = React.useState( [] )
    const [ personnels, setPersonnels ] = React.useState( [] )

    React.useEffect( () => {
        console.log( data )
        let temp: any = []
        if ( data.photos !== undefined || null ) {
            for ( let image of data.photos ) {
                temp.push( image.file.uri )
            }
            setImages( temp )
        }
        getPersonnelIncharge()
    }, [] )

    const getPersonnelIncharge = () => {
        new BaseService( AHYD_API.PersonnelInchargeOfTeenCenter ).fetchWithParams( `sbmptc_id=${ data.id }` ).then( ( data: any ) => {
            console.log( data )
            setPersonnels( data )
        } )
    }

    return (
        <Container>
            <CommonHeader title={`${ data.name } of ${ data.location }, District ${ data.district }`} backgroundColor={Colors[ colorScheme ].background} />
            <ScrollView showsVerticalScrollIndicator={false}>
                <Carousel images={images} backgroundColor={Colors[ colorScheme ].background} />
                <Text style={{ color: Colors[ colorScheme ].text, textAlign: 'center', padding: 16 }}>{data.services}</Text>
                <Text style={{ color: Colors[ colorScheme ].text, padding: 16, fontSize: 16, fontWeight: 'bold', marginTop: 50 }}>Personnels Incharge</Text>
                {
                    personnels.map( ( personnel: any, index: number ) => (
                        <MPCFDCPersonnelIncharge personnel={personnel} key={index} />
                    ) )
                }
            </ScrollView>
        </Container>
    );
};

export default TeenCenterDetails;
