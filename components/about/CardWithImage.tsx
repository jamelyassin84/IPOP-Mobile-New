
import React, { FC } from 'react';
import { Dimensions, Image, Text, View } from 'react-native';

type Props = {
    image: any
    text: string
};

const CardWithImage: FC<Props> = ( props ) => {
    return (
        <View style={{ marginBottom: 20, padding: 16 }}>
            <View style={{ alignItems: 'center' }}>
                <Image style={{ height: 100, resizeMode: 'contain', marginBottom: 16 }} source={props.image} />
            </View>
            <Text>{props.text}</Text>
        </View>
    );
};

export default CardWithImage;
