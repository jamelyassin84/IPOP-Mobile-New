import { useNavigation } from '@react-navigation/native';
import React, { FC } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import CommonHeader from '../../components/headers/CommonHeader';
import LocationTitle from '../../components/top-titles/LocationTitle';
import { DataParams } from '../../components/Pyramid';
import WithRefreshComponent from '../../components/utils/WithRefreshComponent';
import { paramifyLocation } from '../../constants/AppConstants';
import Container from '../../constants/Layout';
import { BaseService } from '../../environments/base.service';
import { Population_API } from '../../environments/Enums';
import useColorScheme from '../../hooks/useColorScheme';

type Props = {};

const PopulationProfile: FC<Props> = ( { route }: any ) => {

    const data: DataParams = route.params
    const navigation = useNavigation()
    const colorScheme = useColorScheme();

    const [ isLoading, setLoading ] = React.useState( false )
    const [ populationProfile, setPopulationProfile ]: any = React.useState( {} )

    React.useEffect( () => {
        getData()

    }, [] )

    const onRefresh = () => {
        getData()
    };

    const getData = () => {
        setLoading( true )
        new BaseService( Population_API.PopulationProfile ).fetchWithParams( `${ paramifyLocation( data.location ) }` ).then( ( data: any ) => {
            if ( data.length !== 0 ) {
                setPopulationProfile( data[ 0 ] )
                setLoading( false )
                return
            }
            alert( `${ route.params.title } on this location is not yet set` )
            navigation.goBack()
            setLoading( false )
        } )
    }

    return (
        <Container>
            <CommonHeader title={data.title} backgroundColor={Colors[ colorScheme ].background} />
            <LocationTitle location={data.location} />
            <WithRefreshComponent onRefresh={() => onRefresh} loading={isLoading} backgroundColor={Colors[ colorScheme ].background}>

                <View style={style.container}>
                    <View style={style.textContainer}>
                        <Text style={{ color: 'gray', fontSize: 16 }}>Total No. of Barangays</Text>
                    </View>
                    <View style={style.textContainer}>
                        <Text style={{ color: '#0039A9', fontSize: 16, fontWeight: 'bold' }}>{populationProfile.barangays}</Text>
                    </View>
                </View>

                <View style={style.container}>
                    <View style={style.textContainer}>
                        <Text style={{ color: 'gray', fontSize: 16 }}>Total Land Area</Text>
                    </View>
                    <View style={style.textContainer}>
                        <Text style={{ color: '#0039A9', fontSize: 16, fontWeight: 'bold' }}>{populationProfile.land_area}</Text>
                    </View>
                </View>

                <View style={style.container}>
                    <View style={style.textContainer}>
                        <Text style={{ color: 'gray', fontSize: 16 }}>Total Household Population</Text>
                    </View>
                    <View style={style.textContainer}>
                        <Text style={{ color: '#0039A9', fontSize: 16, fontWeight: 'bold' }}>{populationProfile.household_population}</Text>
                    </View>
                </View>

                <View style={style.container}>
                    <View style={style.textContainer}>
                        <Text style={{ color: 'gray', fontSize: 16 }}>Male</Text>
                    </View>
                    <View style={style.textContainer}>
                        <Text style={{ color: '#0039A9', fontSize: 16, fontWeight: 'bold' }}>{populationProfile.males}</Text>
                    </View>
                </View>

                <View style={style.container}>
                    <View style={style.textContainer}>
                        <Text style={{ color: 'gray', fontSize: 16 }}>Female</Text>
                    </View>
                    <View style={style.textContainer}>
                        <Text style={{ color: '#0039A9', fontSize: 16, fontWeight: 'bold' }}>{populationProfile.females}</Text>
                    </View>
                </View>

                <View style={style.container}>
                    <View style={style.textContainer}>
                        <Text style={{ color: 'gray', fontSize: 16 }}>Sex Ratio (males:females)</Text>
                    </View>
                    <View style={style.textContainer}>
                        <Text style={{ color: '#0039A9', fontSize: 16, fontWeight: 'bold' }}>{populationProfile.sex_ratio}</Text>
                    </View>
                </View>

                <View style={style.container}>
                    <View style={style.textContainer}>
                        <Text style={{ color: 'gray', fontSize: 16 }}>Median Age</Text>
                    </View>
                    <View style={style.textContainer}>
                        <Text style={{ color: '#0039A9', fontSize: 16, fontWeight: 'bold' }}>{populationProfile.median_age}</Text>
                    </View>
                </View>

                <View style={style.container}>
                    <View style={style.textContainer}>
                        <Text style={{ color: 'gray', fontSize: 16 }}>No. of Households</Text>
                    </View>
                    <View style={style.textContainer}>
                        <Text style={{ color: '#0039A9', fontSize: 16, fontWeight: 'bold' }}>{populationProfile.households}</Text>
                    </View>
                </View>

                <View style={style.container}>
                    <View style={style.textContainer}>
                        <Text style={{ color: 'gray', fontSize: 16 }}>Average Household Size</Text>
                    </View>
                    <View style={style.textContainer}>
                        <Text style={{ color: '#0039A9', fontSize: 16, fontWeight: 'bold' }}>{populationProfile.average_household_size}</Text>
                    </View>
                </View>

                <View style={style.container}>
                    <View style={style.textContainer}>
                        <Text style={{ color: 'gray', fontSize: 16 }}>Population Density</Text>
                    </View>
                    <View style={style.textContainer}>
                        <Text style={{ color: '#0039A9', fontSize: 16, fontWeight: 'bold' }}>{populationProfile.density}</Text>
                    </View>
                </View>

                <View style={style.container}>
                    <View style={style.textContainer}>
                        <Text style={{ color: 'gray', fontSize: 16 }}>Age Dependency Ratio</Text>
                    </View>
                    <View style={style.textContainer}>
                        <Text style={{ color: '#0039A9', fontSize: 16, fontWeight: 'bold' }}>{populationProfile.age_dependency_ratio}</Text>
                    </View>
                </View>

                <View style={style.container}>
                    <View style={style.textContainer}>
                        <Text style={{ color: 'gray', fontSize: 16 }}>Child Dependency Ratio</Text>
                    </View>
                    <View style={style.textContainer}>
                        <Text style={{ color: '#0039A9', fontSize: 16, fontWeight: 'bold' }}>{populationProfile.child_dependency_ratio}</Text>
                    </View>
                </View>

                <View style={style.container}>
                    <View style={style.textContainer}>
                        <Text style={{ color: 'gray', fontSize: 16 }}>Old-Age Dependency Ratio</Text>
                    </View>
                    <View style={style.textContainer}>
                        <Text style={{ color: '#0039A9', fontSize: 16, fontWeight: 'bold' }}>{populationProfile.old_age_dependency_ratio}</Text>
                    </View>
                </View>

            </WithRefreshComponent>
        </Container>
    );
};

const style = StyleSheet.create( {
    container: {
        flex: 1,
        flexDirection: 'row',
        padding: 16,
        borderWidth: 1,
        borderColor: 'rgba(150,150,150,.2)'
    },
    textContainer: {
        flex: 1,
    }
} )


export default PopulationProfile;
