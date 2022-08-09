import 'react-native-gesture-handler'
import { StatusBar } from 'expo-status-bar'
import React from 'react'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import useCachedResources from './hooks/useCachedResources'
import useColorScheme from './hooks/useColorScheme'
import Navigation from './navigation'
import { LogBox } from 'react-native'
import 'react-native-gesture-handler'

export default function App() {
	const isLoadingComplete = useCachedResources()
	const colorScheme = useColorScheme()

	React.useEffect(() => {
		LogBox.ignoreLogs(['EventEmitter.removeListener'])
	}, [])

	if (!isLoadingComplete) {
		return null
	} else {
		return (
			<SafeAreaProvider>
				<Navigation colorScheme={colorScheme} />
				<StatusBar />
			</SafeAreaProvider>
		)
	}
}
