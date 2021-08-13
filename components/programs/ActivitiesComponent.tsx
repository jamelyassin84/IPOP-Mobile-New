
import React, { FC } from 'react';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import Colors from '../../constants/Colors';
import { stringtoArray } from '../../constants/helpers';
import useColorScheme from '../../hooks/useColorScheme';
import { ProgramActivities } from '../../modules/programs/ProgramArea';
import Carousel from '../utils/Carousel';
import * as Linking from 'expo-linking';


type Props = {
    activity: ProgramActivities
};

const ActivitiesComponent: FC<Props> = ( props ) => {

    const colorScheme = useColorScheme();

    const [ images, setImages ] = React.useState( [] )

    React.useEffect( () => {
        let temp: any = []
        for ( let image of props.activity.files ) {
            temp.push( image.file.uri )
        }
        setImages( temp )
    }, [] )


    return (
        <View style={style.container}>
            <Text style={[ style.title, { color: Colors[ colorScheme ].text } ]}>{props.activity.title}</Text>
            <Carousel images={images} backgroundColor={Colors[ colorScheme ].background} />
            <Text style={{ color: 'gray', fontSize: 12, lineHeight: 20, marginBottom: 16 }}>{props.activity.description}</Text>
            <View style={stringtoArray( props.activity.MC_links ).length === 0 ? { position: 'absolute', left: -500 } : {}}>
                <Text style={{ color: Colors[ colorScheme ].text }}>Republic Act Links:</Text>
                {
                    stringtoArray( props.activity.RA_links ).map( ( link: string, index: number ) => (
                        <TouchableOpacity key={index} style={{ marginBottom: 15 }} onPress={() => Linking.openURL( link )}>
                            <Text style={{ color: '#0D47A1' }}>{link}</Text>
                        </TouchableOpacity>
                    ) )
                }
            </View>
            <View style={stringtoArray( props.activity.MC_links ).length === 0 ? { position: 'absolute', left: -500 } : {}}>
                <Text style={{ color: Colors[ colorScheme ].text }}>Momorandum Circular Links:</Text>
                {
                    stringtoArray( props.activity.MC_links ).map( ( link: string, index: number ) => (
                        <TouchableOpacity key={index} style={{ marginBottom: 15 }} onPress={() => Linking.openURL( link )}>
                            <Text style={{ color: '#0D47A1' }}>{link}</Text>
                        </TouchableOpacity>
                    ) )
                }
            </View>
        </View>
    );
};

const style = StyleSheet.create( {
    container: {
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: 'rgba(150,150,150,.2)'
    },
    title: {
        fontSize: 16,
    },
} )

export default ActivitiesComponent;
