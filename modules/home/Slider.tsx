
import React, { FC } from 'react';
import { Dimensions, Image, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import style from '../../styles/app/home/slider.style'

type Props = {
    images: Array<string>,
    backgroundColor: string
};

const Slider: FC<Props> = ( props ) => {
    return (
        <View>
            <ScrollView
                showsHorizontalScrollIndicator={false}
                horizontal={true}
                decelerationRate={0}
                snapToInterval={Dimensions.get( 'screen' ).width + 4}
                snapToAlignment={"center"}
                directionalLockEnabled={true}
                bounces={false}
                style={[ style.scrollview, { backgroundColor: props.backgroundColor } ]}>
                {
                    props.images.map( ( image: any, index: any ) =>
                    (

                        <View style={{ padding: 5 }} key={index}>
                            <Image
                                style={style.image}
                                source={{ uri: image }}
                            />
                        </View>
                    ) )
                }
            </ScrollView>
        </View >
    );
};

export default Slider;
