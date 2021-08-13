import React, { FC } from 'react';
import { Text, Image, Dimensions } from 'react-native';
import CommonHeader from '../../components/headers/CommonHeader';
import Colors from '../../constants/Colors';
import Container from '../../constants/Layout';
import { BaseService } from '../../environments/base.service';
import { About_API } from '../../environments/Enums';
import useColorScheme from '../../hooks/useColorScheme';

type Props = {};

const OrgStructure: FC<Props> = ( props ) => {
    const colorScheme = useColorScheme();
    const [ image, setImage ]: any = React.useState( require( '../../assets/logo/ipo-logo.png' ) )

    React.useEffect( () => {
        new BaseService( About_API.OrganizationalChart ).fetch( '' ).then( ( data: any ) => {
            if ( data.photo !== undefined ) setImage( { uri: data.photo.uri } )
        } )
    }, [] )

    return (
        <Container>
            <CommonHeader title="Organizational Structure" backgroundColor={Colors[ colorScheme ].background} />
            <Image source={image} style={{ resizeMode: 'contain', flex: 1 }} />
        </Container>
    );
};

export default OrgStructure;
