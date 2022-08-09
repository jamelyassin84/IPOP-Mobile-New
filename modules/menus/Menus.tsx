import React, { FC } from 'react'
import { Text, TouchableOpacity, View, StyleSheet, Dimensions } from 'react-native'
import WithRefreshComponent from '../../components/utils/WithRefreshComponent'
import Container from '../../constants/Layout'
import { Children, menuNavigation, MenuNavs } from './MenuNav'
import style from '../../styles/app/about/about.index.style'
import useColorScheme from '../../hooks/useColorScheme'
import { useNavigation } from '@react-navigation/native'
import { AntDesign } from '@expo/vector-icons'
import Colors from '../../constants/Colors'
import { FontAwesome } from '@expo/vector-icons'
import PageTitle from '../../components/utils/PageTitle'
import { Entypo } from '@expo/vector-icons'

type Props = {}

const MenuScreen: FC<Props> = (props) => {
	const colorScheme = useColorScheme()
	const navigation = useNavigation()
	const navs = MenuNavs
	return (
		<Container>
			<PageTitle title="Menu" />
			<WithRefreshComponent
				loading={false}
				onRefresh={() => {
					void 0
				}}
			>
				{navs.map((nav: menuNavigation, index: number) => (
					<View key={index}>
						<Text style={[menu.title, { color: Colors[colorScheme].text }]}>{nav.title}</Text>
						{nav.children.map((child: Children, index: number) => (
							<TouchableOpacity key={index} style={style.container} onPress={() => navigation.navigate(child.route)}>
								<FontAwesome name={child.icon} size={24} color={'#1049A2'} style={style.icon} />
								<Text style={[style.title, { color: Colors[colorScheme].text }]}>{child.name}</Text>

								<Entypo name="chevron-right" size={24} color="#ccc" />
							</TouchableOpacity>
						))}
					</View>
				))}
			</WithRefreshComponent>
		</Container>
	)
}

const menu = StyleSheet.create({
	title: {
		width: Dimensions.get('screen').width,
		backgroundColor: 'rgba(200,200,200,.2)',
		padding: 10,
	},
})

export default MenuScreen
