
import React, { FC } from 'react';
import { Text, TouchableOpacity, View, StyleSheet, Image } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import toDate from '../../constants/helpers';
import useColorScheme from '../../hooks/useColorScheme';
import Carousel from '../Carousel';
import Colors from '../../constants/Colors';
import * as Linking from 'expo-linking';


type Props = {
    award: AwardType
};

export type AwardType = {
    title: string
    url: string
    created_at: string
    medias?: any
}

const AwardComponent: FC<Props> = ( props ) => {

    const colorScheme = useColorScheme();

    const [ images, setImages ] = React.useState( [] )

    React.useEffect( () => {
        let temp: any = []
        for ( let image of props.award.medias ) {
            temp.push( image.file.uri )
        }
        setImages( temp )

    }, [] )

    return (
        <View style={style.container}>
            <Text style={style.title}><MaterialCommunityIcons name="trophy-award" size={20} color="orange" /> {props.award.title}</Text>
            <Text style={{ color: 'red' }}>Awarded : {toDate( props.award.created_at )}</Text>
            <Carousel images={images} backgroundColor={Colors[ colorScheme ].background} />
            <TouchableOpacity onPress={() => Linking.openURL( props.award.url )}>
                <Text>View Link</Text>
            </TouchableOpacity>
        </View>
    );
};

const style = StyleSheet.create( {
    container: {
        padding: 16,
        borderWidth: 1,
        borderColor: 'rgba(150,150,150,.2)'
    },
    title: {
        fontSize: 20
    },
    image: {
        width: 50,
        height: 50,
        resizeMode: 'contain',
        marginRight: 16
    }
} )

export default AwardComponent;
