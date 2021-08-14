
import { FontAwesome } from '@expo/vector-icons';
import React, { FC } from 'react';
import { Dimensions, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Colors from '../../constants/Colors';
import { BaseService } from '../../environments/base.service';
import { Location_API } from '../../environments/Enums';
import useColorScheme from '../../hooks/useColorScheme';
import WithRefreshComponent from '../utils/WithRefreshComponent';
import { AntDesign } from '@expo/vector-icons';

type Props = {
    onSelect: Function
    blur: Function
};

const MunicipalityPicker: FC<Props> = ( props ) => {

    const colorScheme = useColorScheme();
    const [ isLoading, setLoading ] = React.useState( false )
    const [ municipalties, setMunicipalties ] = React.useState( [] )

    React.useEffect( () => {
        getMunicipalities()

    }, [] )

    const onRefresh = () => {
        setLoading( true );
        getMunicipalities()

    };

    const getMunicipalities = () => {
        setMunicipalties( [] )
        new BaseService( Location_API.Municipalities ).fetch( '' ).then( ( municiaplities: any ) => {
            setMunicipalties( municiaplities )
            setLoading( false );
        } )
    }

    return (
        <View style={[ style.bottomSheetContainer, { backgroundColor: Colors[ colorScheme ].background, } ]}>
            <View style={[ style.choicesContainer, { backgroundColor: Colors[ colorScheme ].background, } ]}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Text style={style.title}>Select a Municipality</Text>
                    <TouchableOpacity onPress={() => props.blur()}>
                        <AntDesign style={{ marginRight: 6 }} name="close" size={24} color="black" />
                    </TouchableOpacity>
                </View>
                <WithRefreshComponent onRefresh={() => onRefresh} loading={isLoading} backgroundColor={Colors[ colorScheme ].background}>
                    {
                        municipalties.map( ( muncipality: any, index: any ) => {
                            return (
                                <TouchableOpacity
                                    key={index}
                                    onPress={() => {
                                        props.onSelect( muncipality.code )
                                    }}
                                    style={[ style.choicesButton, { borderTopColor: 'rgba(150,150,150,.3)', backgroundColor: Colors[ colorScheme ].background } ]}
                                >
                                    <FontAwesome name="map-signs" size={24} color="#1049A2" />
                                    <Text style={[ style.choicesText, { color: Colors[ colorScheme ].text } ]}>{muncipality.name}</Text>
                                </TouchableOpacity>
                            )
                        } )
                    }
                </WithRefreshComponent>
                <View style={{ height: 150 }} />
            </View>
        </View>
    );
};


const style = StyleSheet.create( {
    bottomSheetContainer: {
        height: '100%',
        padding: 10,
        width: Dimensions.get( 'screen' ).width,
        position: 'relative',
        zIndex: 999
    },
    choicesContainer: {
        borderRadius: 10,
        width: '100%',
        marginBottom: 10
    },
    choicesButton: {
        borderRadius: 10,
        width: '100%',
        padding: 10,
        borderTopWidth: 1,
        flexDirection: 'row',
        alignItems: 'center'
    },
    choicesText: {
        fontSize: 16,
        fontWeight: '300',
        marginLeft: 16
    },
    title: {
        textAlign: 'center',
        padding: 16,
        flex: 1
    }
} )


export default MunicipalityPicker;
