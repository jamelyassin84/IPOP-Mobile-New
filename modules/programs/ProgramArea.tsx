import { AntDesign, MaterialCommunityIcons } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'
import React, { FC } from 'react'
import { Text, TouchableOpacity, View } from 'react-native'
import PageTitle from '../../components/utils/PageTitle'
import WithRefreshComponent from '../../components/utils/WithRefreshComponent'
import Colors from '../../constants/Colors'
import Container from '../../constants/Layout'
import { BaseService } from '../../environments/base.service'
import { ProgramAreas_API } from '../../environments/Enums'
import useColorScheme from '../../hooks/useColorScheme'
import style from '../../styles/app/about/about.index.style'

type Props = {}

const ProgramAreaScreen: FC<Props> = (props) => {
	const navigation = useNavigation()
	const colorScheme = useColorScheme()

	const [programs, setPrograms]: any = React.useState([])
	const [isLoading, setLoading] = React.useState(false)

	React.useEffect(() => {
		getProgramArea()
	}, [])

	const onRefresh = () => {
		getProgramArea()
	}

	const getProgramArea = () => {
		setLoading(true)
		new BaseService(ProgramAreas_API.ProgramAreas).fetch('').then((data: any[]) => {
			setPrograms(data)
			setLoading(false)
		})
	}

	return (
		<Container>
			<PageTitle title="Program Areas" />
			<WithRefreshComponent loading={isLoading} onRefresh={() => onRefresh}>
				{programs.map((program: ProgramArea, index: number) => (
					<TouchableOpacity key={index} style={style.container} onPress={() => navigation.navigate('Activities', program)}>
						<View style={{ paddingRight: 10, flex: 1 }}>
							<Text style={[style.title, { color: Colors[colorScheme].text, fontWeight: '700' }]}>{program.title}</Text>
							<Text style={{ color: 'gray', fontSize: 12, marginLeft: 15, lineHeight: 20 }}>{program.description}</Text>

							<Text style={{ marginTop: 10, marginLeft: 15, textDecorationLine: 'underline' }}>View more</Text>
						</View>
					</TouchableOpacity>
				))}
			</WithRefreshComponent>
		</Container>
	)
}

export interface ProgramArea {
	id: number
	title: string
	description: string
	activities: ProgramActivities[]
}

export interface ProgramActivities {
	files: any
	program_area_id: number
	title: number
	description: string
	created_at: any
	id: number
	RA_links?: string
	MC_links?: string
}

export default ProgramAreaScreen
