
import { useNavigation } from '@react-navigation/native';
import React, { FC } from 'react';
import { Text, View } from 'react-native';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import CommonHeader from '../components/headers/CommonHeader';
import WithRefreshComponent from '../components/utils/WithRefreshComponent';
import Container from '../constants/Layout';
import { BaseService } from '../environments/base.service';
import { Others_API } from '../environments/Enums';
import useColorScheme from '../hooks/useColorScheme';
import { DataParams } from './Pyramid';
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
                        <View style={{ padding: 17, borderWidth: 1, borderColor: '#ccc' }} key={index}>
                            <Text>
                                <Text style={{ color: '#0039A9', fontSize: 16, fontWeight: 'bold' }}>{note.title} - </Text>
                                <Text>{note.body}</Text>
                            </Text>
                        </View>
                    ) )
                }
            </WithRefreshComponent>
        </Container>
    );
};

export default TechnicalNotes;
