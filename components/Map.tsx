import React, { FC } from 'react'
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps'
import { StyleSheet, View, Dimensions } from 'react-native'
import axios from 'axios'
import * as Location from 'expo-location'
import { stringifyLocation } from '../constants/AppConstants'
import { CAREEM_MAP_STYLE } from '../constants/map.style'

type Props = {
	location: any
}

const Map: FC<Props> = (props) => {
	const [location, setLocation] = React.useState({
		coords: { latitude: 0, longitude: 0 },
		longitude: 0,
		latitudeDelta: 0,
	})

	const [data, setData]: any = React.useState([
		{
			lat: 11.005,
			lon: 122.5373,
			display_name: 'Iloilo Province',
		},
	])

	React.useEffect(() => {
		;async () => {
			let { status } = await Location.requestForegroundPermissionsAsync()
			if (status !== 'granted') {
				alert('Permission to access location was denied')
				return
			}

			let location: any = await Location.getCurrentPositionAsync({})
			setLocation(location)
		}
		changeMap()
	}, [props.location])

	const changeMap = () => {
		if (props.location.barangay !== null && props.location.municipality !== null) {
			const url = `https://us1.locationiq.com/v1/search.php?key=pk.ca7d72d67098fe33153685abf70e35a9&q=${stringifyLocation(props.location)}&format=json`
			axios.get(url).then((response) => {
				setData(response.data)
			})
		}
	}

	return (
		<View style={styles.container}>
			<MapView
				style={styles.map}
				provider={PROVIDER_GOOGLE}
				customMapStyle={CAREEM_MAP_STYLE}
				region={{
					latitude: data[0].lat,
					longitude: data[0].lon,
					latitudeDelta: 0.922,
					longitudeDelta: 0.421,
				}}
			>
				<Marker
					coordinate={{
						latitude: location.coords.latitude,
						longitude: location.coords.longitude,
					}}
					pinColor={'#1ED760'}
					title={'You are here'}
				/>
				<Marker
					coordinate={{
						latitude: data[0].lat,
						longitude: data[0].lon,
					}}
					pinColor={'#1049A2'}
					title={data[0].display_name}
				/>
			</MapView>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
		alignItems: 'center',
		justifyContent: 'center',
		position: 'absolute',
		zIndex: -1,
		marginTop: 50,
	},
	map: {
		width: Dimensions.get('window').width,
		height: Dimensions.get('window').height,
	},
})

export default Map
