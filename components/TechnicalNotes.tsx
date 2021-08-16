
import { useNavigation } from '@react-navigation/native';
import React, { FC } from 'react';
import { Text, View } from 'react-native';
import CommonHeader from '../components/headers/CommonHeader';
import WithRefreshComponent from '../components/utils/WithRefreshComponent';
import Colors from '../constants/Colors';
import Container from '../constants/Layout';
import { BaseService } from '../environments/base.service';
import { Others_API } from '../environments/Enums';
import useColorScheme from '../hooks/useColorScheme';
import { DataParams, PYramidType } from './Pyramid';
type Props = {};

const TechnicalNotes: FC<Props> = ( { route }: any ) => {

    const data: DataParams = route.params
    const navigation = useNavigation()
    const colorScheme = useColorScheme();

    const [ isLoading, setLoading ] = React.useState( false )
    const [ TechnicalNotes, setTechnicalNotes ] = React.useState( [] )


    React.useEffect( () => {
        getData()
    }, [] )

    const onRefresh = () => {
        alert( data.type )
        getData()
    };

    const getData = () => {
        setLoading( true )
        if ( data.type === PYramidType.Marriage ) data.type = 'Marriages'
        new BaseService( Others_API.TechnicalNotes ).fetchWithParams( `type=${ data.type }` ).then( ( data: any ) => {
            setTechnicalNotes( data )
            setLoading( false )
            if ( data.length === 0 ) {
                alert( `${ route.params.title } on this location is not yet set` )
                navigation.goBack()
                setLoading( false )
            }
        } )
    }

    return (
        <Container>
            <CommonHeader title={data.title} backgroundColor={Colors[ colorScheme ].background} />
            <WithRefreshComponent onRefresh={() => onRefresh} loading={isLoading} backgroundColor={Colors[ colorScheme ].background}>
                {
                    TechnicalNotes.map( ( note: any, index: number ) => (
                        <View style={{ padding: 17, borderWidth: 1, borderColor: 'rgba(150,150,150,.2)' }} key={index}>
                            <Text>
                                <Text style={{ color: '#0039A9', fontSize: 16, fontWeight: 'bold' }}>{note.title} - </Text>
                                <Text style={{ color: Colors[ colorScheme ].text }}>{note.body}</Text>
                            </Text>
                        </View>
                    ) )
                }
            </WithRefreshComponent>
        </Container>
    );
};

export default TechnicalNotes;
