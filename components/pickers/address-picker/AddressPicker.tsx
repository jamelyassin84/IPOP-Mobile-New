
import React, { FC } from 'react'
import { TouchableOpacity, View, StyleSheet, Dimensions, Text } from 'react-native'
import { AntDesign } from '@expo/vector-icons'
import useColorScheme from '../../../hooks/useColorScheme'
import Colors from '../../../constants/Colors'
import BottomSheetScreen from 'react-native-animated-bottom-sheet'
import Menu from '../../Menu'
import { LocationChoices, years } from '../../../constants/AppConstants'
import ScrollableMenu from '../../ScrollableMenu'
import MunicipalityPicker from '../MunicipalityPicker'
import BarangayPicker from '../BarangayPicker'
import Map from '../../../components/Map'
import { MaterialIcons } from '@expo/vector-icons'

type Props = {
    location: Function
    menu: any[],
    choice: Function
}

type municipalityType = {
    code: number,
    name: string
}

const AddressPicker: FC<Props> = ( props ) => {

    const MenuRef: any = React.useRef()
    const MenuSheet = () => (
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

    const colorScheme = useColorScheme()
    const [ choice, setCurrentChoice ] = React.useState( LocationChoices[ 0 ] )
    const [ year, setYear ] = React.useState( new Date( Date.now() ).getFullYear() )
    const [ code, setCode ]: any = React.useState( null )
    const [ municipality, setmunicipality ]: any = React.useState( null )
    const [ barangay, setBarangay ]: any = React.useState( null )

    React.useEffect( () => {
        props.location( {
            year: year,
            barangay: barangay,
            municipality: municipality
        } )
    }, [] )

    const TabRef: any = React.useRef()
    const TabSheet = () => (
        <Menu
            choices={LocationChoices}
            calback={( choice: string ) => {
                setCurrentChoice( choice )
                setTimeout( () => {
                    setChoice( choice )
                }, 600 )
                TabRef.current.close()
            }}
            blur={() => TabRef.current.close()}
        />
    )

    const setChoice = ( choice: string ) => {
        setYear( new Date( Date.now() ).getFullYear() )
        setCode( null ); setmunicipality( null ); setBarangay( null )
        if ( choice === LocationChoices[ 0 ] ) YearRef.current.open()
        if ( choice === LocationChoices[ 1 ] ) MunicipalityRef.current.open()
        if ( choice === LocationChoices[ 2 ] ) MunicipalityRef.current.open()
    }

    const YearRef: any = React.useRef()
    const YearSheet = () => (
        <ScrollableMenu
            title="Year"
            choices={years()}
            calback={( choice: number ) => {
                setYear( choice )
                YearRef.current.close()
                props.location( {
                    year: year,
                    barangay: barangay,
                    municipality: municipality
                } )
            }}
            blur={() => TabRef.current.close()}
            icon={<AntDesign name="calendar" size={24} color="#1049A2" />}
        />
    )

    const MunicipalityRef: any = React.useRef()
    const MunicipalitySheet = () => (
        <MunicipalityPicker
            onSelect={( municipality: municipalityType ) => {
                MunicipalityRef.current.close()
                setCode( municipality.code )
                setmunicipality( municipality.name )
                setTimeout( () => {
                    if ( choice === LocationChoices[ 1 ] ) YearRef.current.open()
                    if ( choice === LocationChoices[ 2 ] ) BarangayRef.current.open()
                }, 1000 )
            }}
            blur={() => MunicipalityRef.current.close()}
        />
    )

    const BarangayRef: any = React.useRef()
    const BarangaySheet = () => (
        <BarangayPicker
            code={code}
            onSelect={( name: number ) => {
                setBarangay( name )
                BarangayRef.current.close()
                setTimeout( () => {
                    YearRef.current.open()
                }, 600 )
            }}
            blur={() => BarangayRef.current.close()}
        />
    )

    return (
        <>
            <Text style={style.title}>{municipality === null && barangay === null ? 'Province' : ''} {barangay === null ? '' : municipality} {year}</Text>
            <View style={style.container}>

                <TouchableOpacity onPress={() => TabRef.current.open()}
                    style={[ style.iconHolder, { backgroundColor: Colors[ colorScheme ].background } ]}>
                    <AntDesign name="search1" size={24} color={Colors[ colorScheme ].text} />
                </TouchableOpacity>

                <TouchableOpacity onPress={() => MenuRef.current.open()} style={[ style.iconHolder, { backgroundColor: Colors[ colorScheme ].background } ]}>
                    <MaterialIcons name="expand-more" size={24} color={Colors[ colorScheme ].text} />
                </TouchableOpacity>

                <BottomSheetScreen
                    ref={TabRef}
                    renderContent={TabSheet}
                    visibleHeight={Dimensions.get( 'window' ).height / 2}
                />
                <BottomSheetScreen
                    ref={YearRef}
                    renderContent={YearSheet}
                    visibleHeight={Dimensions.get( 'window' ).height - 150}
                />
                <BottomSheetScreen
                    ref={MunicipalityRef}
                    renderContent={MunicipalitySheet}
                    visibleHeight={Dimensions.get( 'window' ).height - 150}
                />
                <BottomSheetScreen
                    ref={BarangayRef}
                    renderContent={BarangaySheet}
                    visibleHeight={Dimensions.get( 'window' ).height - 150}
                />
                <BottomSheetScreen
                    ref={MenuRef}
                    renderContent={MenuSheet}
                    visibleHeight={Dimensions.get( 'window' ).height - 150}
                />
            </View>
            <Map location={{
                year: year,
                municipality: municipality,
                barangay: barangay
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
        marginRight: 16,
        shadowColor: "rgba(150,150,150,.9)",
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.30,
        shadowRadius: 4.65,
        elevation: 8,
    },
    title: {
        width: Dimensions.get( 'screen' ).width,
        padding: 16,
        backgroundColor: '#1049A2',
        color: 'white',
        fontWeight: 'bold'
    },
} )

export default AddressPicker
