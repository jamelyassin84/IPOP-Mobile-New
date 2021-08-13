
import React, { FC } from 'react';
import { BaseService } from '../../environments/base.service';
import { ArticleFilter_API, Home_API } from '../../environments/Enums';
import HomeHeader from '../../components/headers/Home';
import ArticleDatePicker from '../../components/home/ArticleDatePicker';
import WithRefreshComponent from '../../components/utils/WithRefreshComponent';
import Colors from '../../constants/Colors';
import Container from '../../constants/Layout';
import useColorScheme from '../../hooks/useColorScheme';
import Articles from './Articles';
import Quicklinks from './Quicklinks';
import Slider from './Slider';

type Props = {};

const HomeScreen: FC<Props> = ( props ) => {

    const colorScheme = useColorScheme();
    const [ isLoading, setLoading ] = React.useState( false )
    const [ images, setImages ]: Array<any> = React.useState( [] )
    const [ articles, setArticles ]: Array<any> = React.useState( [] )
    const [ quicklinks, setQuicklinks ]: Array<any> = React.useState( [] )
    const [ menu, setMenu ] = React.useState( 'All' )

    React.useEffect( () => {
        getSlider()
        getSlider()
        getQuickLinks()
        getArticles()
    }, [] )

    const onRefresh = () => {
        setLoading( true );
        getSlider()
        getQuickLinks()
        getArticles()
    };

    const getSlider = () => {
        setLoading( true )
        let temp: string[] = []
        new BaseService( Home_API.Slider ).fetch( '' ).then( ( data: any[] ) => {
            data.forEach( ( file: any ) => {
                temp.push( file.photo.uri )
            } )
            setImages( temp )
        } )
    }

    const getQuickLinks = () => {
        new BaseService( Home_API.QuickLinks ).fetch( '' ).then( ( data: any[] ) => {
            setQuicklinks( data )
            setLoading( false );
        } )
    }

    const getArticles = () => {
        setMenu( 'All' )
        setArticles( [] )
        new BaseService( Home_API.Articles ).fetch( '' ).then( ( data: any[] ) => {
            setLoading( false )
            setArticles( data )
        } )
    }

    const today = () => {
        setMenu( 'Today' )
        setArticles( [] )
        new BaseService( ArticleFilter_API.Today ).fetch( '' ).then( ( data: any[] ) => {
            setArticles( data )
        } )
    }

    const week = () => {
        setMenu( 'Week' )
        setArticles( [] )
        new BaseService( ArticleFilter_API.Week ).fetch( '' ).then( ( data: any[] ) => {
            setArticles( data )
        } )
    }

    const month = () => {
        setMenu( 'Month' )
        setArticles( [] )
        new BaseService( ArticleFilter_API.Month ).fetch( '' ).then( ( data: any[] ) => {
            setArticles( data )
        } )
    }

    return (
        <Container>
            <HomeHeader backgroundColor={Colors[ colorScheme ].background} />
            <WithRefreshComponent onRefresh={() => onRefresh} loading={isLoading}>
                <Slider images={images} backgroundColor={Colors[ colorScheme ].background} />
                <Quicklinks links={quicklinks} />
                <ArticleDatePicker
                    today={() => today()}
                    week={() => week()}
                    month={() => month()}
                    default={() => getArticles()}
                    menu={menu}
                />
                <Articles articles={articles} />
            </WithRefreshComponent>
        </Container>
    );
};

export default HomeScreen;
