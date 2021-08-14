
import React, { FC } from 'react'
import { TouchableOpacity, View, StyleSheet, Dimensions } from 'react-native'
import { AntDesign } from '@expo/vector-icons'
import useColorScheme from '../../../hooks/useColorScheme'
import Colors from '../../../constants/Colors'
import BottomSheetScreen from 'react-native-animated-bottom-sheet'
import { districts } from '../../../constants/AppConstants'
import ScrollableMenu from '../../ScrollableMenu'
import MunicipalityPicker from '../MunicipalityPicker'
import Map from '../../../components/Map'
import { MaterialIcons } from '@expo/vector-icons'

type Props = {
    location: Function
    menu: any[],
    choice: Function
}

type MunicpalityType = {
    code: number,
    name: string
}

const LocationAndDistrictPicker: FC<Props> = ( props ) => {

    const MenuRef: any = React.useRef()
    const MenuSheet = () => {
        return (
            <ScrollableMenu
                title="what to view"
                choices={props.menu}
                calback={( choice: number ) => {
                    props.choice( choice )
                    MenuRef.current.close()
                }}
                blur={() => MenuRef.current.close()}
                icon={<MaterialIcons name="menu-open" size={24} color="#ccc" />}
            />
        )
    }

    const colorScheme = useColorScheme()
    const [ district, setDistrict ]: any = React.useState( null )
    const [ municpality, setMunicpality ]: any = React.useState( null )

    const DistrictRef: any = React.useRef()
    const DistrictSheet = () => (
        <ScrollableMenu
            title="District"
            choices={districts}
            calback={( choice: number ) => {
                DistrictRef.current.close()
                setDistrict( choice )
                setTimeout( () => {
                    MunicipalityRef.current.open()
                }, 600 )
            }}
            blur={() => DistrictRef.current.close()}
            icon={<AntDesign name="calendar" size={24} color="#1049A2" />}
        />
    )

    const MunicipalityRef: any = React.useRef()
    const MunicipalitySheet = () => (
        <MunicipalityPicker
            onSelect={( municipality: MunicpalityType ) => {
                MunicipalityRef.current.close()
                setMunicpality( municipality.name )
                props.location( {
                    municpality: municpality,
                    district: district,
                } )
            }}
            blur={() => MunicipalityRef.current.close()}
        />
    )

    return (
        <>
            <View style={style.container}>
                <TouchableOpacity onPress={() => DistrictRef.current.open()}
                    style={[ style.iconHolder, { backgroundColor: Colors[ colorScheme ].background } ]}>
                    <AntDesign name="search1" size={24} color={Colors[ colorScheme ].text} />
                </TouchableOpacity>

                <TouchableOpacity onPress={() => MenuRef.current.open()} style={[ style.iconHolder, { backgroundColor: Colors[ colorScheme ].background } ]}>
                    <MaterialIcons name="expand-more" size={24} color={Colors[ colorScheme ].text} />
                </TouchableOpacity>
                <BottomSheetScreen
                    ref={DistrictRef}
                    renderContent={DistrictSheet}
                    visibleHeight={Dimensions.get( 'window' ).height / 2}
                />
                <BottomSheetScreen
                    ref={MunicipalityRef}
                    renderContent={MunicipalitySheet}
                    visibleHeight={Dimensions.get( 'window' ).height - 150}
                />
                <BottomSheetScreen
                    ref={MenuRef}
                    renderContent={MenuSheet}
                    visibleHeight={Dimensions.get( 'window' ).height - 150}
                />
            </View>
            <Map location={{
                year: null,
                municpality: municpality,
                barangay: null
            }} />
        </>
    )
}

const style = StyleSheet.create( {
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-end',
        paddingTop: 16,
        backgroundColor: 'transparent',
    },
    iconHolder: {
        borderRadius: 50,
        padding: 10,
        marginRight: 16

    }
} )
export default LocationAndDistrictPicker
