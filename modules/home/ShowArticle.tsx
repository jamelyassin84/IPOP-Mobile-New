import React, { FC } from 'react'
import { Text, View } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import Carousel from '../../components/utils/Carousel'
import CommonHeader from '../../components/headers/CommonHeader'
import Colors from '../../constants/Colors'
import toDate from '../../constants/helpers'
import Container from '../../constants/Layout'
import useColorScheme from '../../hooks/useColorScheme'
import style from '../../styles/app/home/show-article.style'

type Props = {}

const ShowArticle: FC<Props> = ( { route }: any ) => {

    const article = route.params.article

    const colorScheme = useColorScheme();

    const [ images, setImages ] = React.useState( [] )

    React.useEffect( () => {
        let temp: any = []
        for ( let image of article.photos ) {
            temp.push( image.file.uri )
        }
        setImages( temp )

    }, [] )

    return (
        <Container>
            <CommonHeader title="Article Viewer" backgroundColor={Colors[ colorScheme ].background} />
            <ScrollView showsVerticalScrollIndicator={false}>
                <Text style={[ style.title, { color: Colors[ colorScheme ].text } ]}>{article.title} </Text>
                <Carousel images={images} backgroundColor={Colors[ colorScheme ].background} />
                <Text style={{ color: '#1049A2', margin: 15 }}>Created at: {toDate( article.updated_at )}</Text>
                <Text style={style.body}>
                    {article.body}
                </Text>
                <View style={{ height: 150 }}></View>
            </ScrollView>
        </Container>
    )
}

export default ShowArticle
