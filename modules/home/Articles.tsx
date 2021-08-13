
import { useNavigation } from '@react-navigation/native';
import React, { FC } from 'react';
import { Image } from 'react-native';
import { Text, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler'
import Colors from '../../constants/Colors';
import toDate from '../../constants/helpers';
import useColorScheme from '../../hooks/useColorScheme';
import style from '../../styles/app/home/article.style'


type Props = {
    articles: Array<any>
}

const Articles: FC<Props> = ( props ) => {

    const colorScheme = useColorScheme();
    const navigation = useNavigation();

    const resolveImage = ( article: any ) => {
        if ( article?.photos.length === 0 ) {
            return require( '../../assets/logo/ipo-logo.png' )
        }
        return { uri: article?.photos[ 0 ]?.file?.uri }
    }

    return (
        <>
            {
                props.articles.map( ( article: any, index: any ) => (
                    <TouchableOpacity
                        key={index}
                        onPress={() => {
                            navigation.navigate( 'ShowArticle', { article: article } )
                        }}
                        style={style.featuredArticle}>
                        <Image
                            style={[ style.image, ]}
                            source={resolveImage( article )}
                        />
                        <View style={style.texts}>
                            <Text style={[ style.title, { color: Colors[ colorScheme ].text } ]}>
                                {article.title}
                            </Text>
                            <Text style={{ color: '#1049A2', marginTop: -10 }}>
                                Created at: {toDate( article.updated_at )}</Text>
                        </View>

                    </TouchableOpacity>
                ) )
            }
        </>
    );
};

export default Articles;
