
import React, { FC } from 'react';
import { TouchableOpacity, View, StyleSheet, Dimensions } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import useColorScheme from '../../../hooks/useColorScheme';
import Colors from '../../../constants/Colors';
import BottomSheetScreen from 'react-native-animated-bottom-sheet';
import Menu from '../../Menu'
import { LocationChoices, years } from '../../../constants/AppConstants';
import ScrollableMenu from '../../ScrollableMenu';
import { FontAwesome } from '@expo/vector-icons';
import MunicipalityPicker from '../MunicipalityPicker';
import BarangayPicker from '../BarangayPicker';

type Props = {
    location: Function
};

type MunicpalityType = {
    code: number,
    name: string
};

const AddressPicker: FC<Props> = ( props ) => {

    const colorScheme = useColorScheme();

    const [ choice, setCurrentChoice ] = React.useState( LocationChoices[ 0 ] )

    const [ year, setYear ] = React.useState( new Date( Date.now() ).getFullYear() )
    const [ code, setCode ]: any = React.useState( null )
    const [ municpality, setMunicpality ]: any = React.useState( null )
    const [ barangay, setBarangay ]: any = React.useState( null )

    const TabRef: any = React.useRef();
    const TabSheet = () => {
        return (
            <Menu
                choices={LocationChoices}
                calback={( choice: string ) => {
                    setCurrentChoice( choice )
                    setTimeout( () => {
                        setChoice( choice )
                    }, 600 );
                    TabRef.current.close()
                }}
                blur={() => TabRef.current.close()}
            />
        )
    }

    const setChoice = ( choice: string ) => {
        setYear( new Date( Date.now() ).getFullYear() )
        setCode( null )
        setMunicpality( null )
        setBarangay( null )
        if ( choice === LocationChoices[ 0 ] ) {
            YearRef.current.open()
        }
        if ( choice === LocationChoices[ 1 ] ) {
            MunicipalityRef.current.open()
        }
        if ( choice === LocationChoices[ 2 ] ) {
            MunicipalityRef.current.open()
        }
    }

    const YearRef: any = React.useRef();
    const YearSheet = () => {
        return (
            <ScrollableMenu
                title="Year"
                choices={years()}
                calback={( choice: number ) => {
                    setYear( choice )
                    YearRef.current.close()
                    props.location( {
                        year: year,
                        barangay: barangay,
                        municpality: municpality
                    } )
                }}
                blur={() => TabRef.current.close()}
                icon={<AntDesign name="calendar" size={24} color="#1049A2" />}
            />
        )
    }

    const MunicipalityRef: any = React.useRef();
    const MunicipalitySheet = () => {
        return (
            <MunicipalityPicker
                onSelect={( municipality: MunicpalityType ) => {
                    MunicipalityRef.current.close()
                    setCode( municipality.code )
                    setMunicpality( municipality.name )
                    setTimeout( () => {
                        if ( choice === LocationChoices[ 1 ] ) {
                            YearRef.current.open()
                        }
                        if ( choice === LocationChoices[ 2 ] ) {
                            BarangayRef.current.open()
                        }
                    }, 1000 );

                }}
                blur={() => MunicipalityRef.current.close()}
            />
        )
    }

    const BarangayRef: any = React.useRef();
    const BarangaySheet = () => {
        return (
            <BarangayPicker
                code={code}
                onSelect={( name: number ) => {
                    setBarangay( name )
                    BarangayRef.current.close()
                    setTimeout( () => {
                        YearRef.current.open()
                    }, 600 );
                }}
                blur={() => BarangayRef.current.close()}
            />
        )
    }

    return (
        <View style={style.container}>
            <TouchableOpacity onPress={() => TabRef.current.open()}
                style={[ style.iconHolder, { backgroundColor: Colors[ colorScheme ].background } ]}>
                <AntDesign name="search1" size={24} color={Colors[ colorScheme ].text} />
            </TouchableOpacity>

            <TouchableOpacity style={[ style.iconHolder, { backgroundColor: Colors[ colorScheme ].background } ]}>
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
        </View>
    );
};

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
export default AddressPicker;
