import React, { FC } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import AboutHeader from '../../components/headers/About';
import Container from '../../constants/Layout';
import { AboutNavs, AboutNavType } from './Navs';
import { AntDesign, MaterialCommunityIcons } from '@expo/vector-icons';
import style from '../../styles/app/about/about.index.style'
import WithRefreshComponent from '../../components/utils/WithRefreshComponent';
import useColorScheme from '../../hooks/useColorScheme';
import Colors from '../../constants/Colors';
import { useNavigation } from '@react-navigation/native';

type Props = {};

const AboutScreen: FC<Props> = ( props ) => {

    const colorScheme = useColorScheme();
    const navigation = useNavigation();

    return (
        <Container>
            <AboutHeader></AboutHeader>
            <WithRefreshComponent loading={false} onRefresh={() => { void 0 }}>
                {
                    AboutNavs.map( ( nav: AboutNavType, index: number ) => (
                        <TouchableOpacity key={index} style={style.container}
                            onPress={() => navigation.navigate( nav.route )}>
                            <MaterialCommunityIcons
                                name={nav.icon}
                                size={35}
                                color={nav.color}
                                style={style.icon}
                            />
                            <Text style={[ style.title, { color: Colors[ colorScheme ].text } ]}>{nav.title}</Text>
                            <AntDesign name="right" size={24} color="#ccc" />
                        </TouchableOpacity>
                    ) )
                }
            </WithRefreshComponent>
        </Container>
    );
};

export default AboutScreen;
