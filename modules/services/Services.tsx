import React, { FC } from 'react'; import { Text } from 'react-native';
import { SimpleLineIcons } from '@expo/vector-icons';
import { View } from 'react-native';
import { BaseService } from '../../environments/base.service';
import { Services_API } from '../../environments/Enums';
import WithRefreshComponent from '../../components/utils/WithRefreshComponent';
import Colors from '../../constants/Colors';
import Container from '../../constants/Layout';
import PageTitle from '../../components/utils/PageTitle';
import useColorScheme from '../../hooks/useColorScheme';
import style from '../../styles/app/about/about.index.style'

type Props = {};

const ServicesScreen: FC<Props> = ( props ) => {

    const colorScheme = useColorScheme();

    const [ services, setServices ]: any = React.useState( [] )
    const [ isLoading, setLoading ] = React.useState( false )

    React.useEffect( () => {
        getServices()
    }, [] )

    const onRefresh = () => {
        getServices();
    };

    const getServices = () => {
        setLoading( true )
        new BaseService( Services_API.Services ).fetch( '' ).then( ( data: any[] ) => {
            console.log( data )
            setServices( data )
            setLoading( false )
        } )
    }

    return (
        <Container>
            <PageTitle title="Services Offered" />
            <WithRefreshComponent loading={isLoading} onRefresh={() => onRefresh}>
                {
                    services.map( ( service: any, index: number ) => (
                        <View key={index} style={style.container}>
                            <SimpleLineIcons name="notebook" size={35} color='#0D47A1' />
                            <View style={{ paddingRight: 10, flex: 1 }}>
                                <Text style={[ style.title, { color: Colors[ colorScheme ].text } ]}>{service.title}</Text>
                                {
                                    service.offers.map( ( offer: any, index: number ) => (
                                        <Text key={index} style={{ color: '#0D47A1', fontSize: 12, marginLeft: 15, marginTop: 10 }}>{offer.title}</Text>
                                    ) )
                                }
                            </View>
                        </View>
                    ) )
                }
            </WithRefreshComponent>
        </Container>
    );
};

export default ServicesScreen;
