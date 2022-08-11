import React, { FC } from 'react'
import { Dimensions, View } from 'react-native'
import useColorScheme from '../hooks/useColorScheme'
import Colors from './Colors'

type Props = {
	children?: any
}

const Container: React.FC<Props> = (props) => {
	const colorScheme = useColorScheme()
	return (
		<View
			style={{
				height: Dimensions.get('screen').height,
				width: Dimensions.get('screen').width,
				paddingTop: 20,
				backgroundColor: Colors[colorScheme].background,
			}}
		>
			{props.children}
		</View>
	)
}

export default Container
