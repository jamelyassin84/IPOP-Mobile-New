
import React, { FC } from 'react';
import { Text } from 'react-native';
import PersonnelDirectoryCard, { Personnel } from '../../components/about/PersonnelDirectoryCard';
import CommonHeader from '../../components/headers/CommonHeader';
import Colors from '../../constants/Colors';
import Container from '../../constants/Layout';
import { BaseService } from '../../environments/base.service';
import { About_API } from '../../environments/Enums';
import useColorScheme from '../../hooks/useColorScheme';

type Props = {};

const Directory: FC<Props> = ( props ) => {

    const colorScheme = useColorScheme();

    const [ ppo, setppo ] = React.useState( [] )
    const [ ad, setad ] = React.useState( [] )
    const [ trd, settrd ] = React.useState( [] )

    const [ fod1, setfod1 ] = React.useState( [] )
    const [ fod2, setfod2 ] = React.useState( [] )
    const [ fod3, setfod3 ] = React.useState( [] )
    const [ fod4, setfod4 ] = React.useState( [] )
    const [ fod5, setfod5 ] = React.useState( [] )

    const [ apvw, setapvw ] = React.useState( [] )
    const [ bod, setbod ] = React.useState( [] )

    const [ bspo1, setbspo1 ] = React.useState( [] )
    const [ bspo2, setbspo2 ] = React.useState( [] )
    const [ bspo3, setbspo3 ] = React.useState( [] )
    const [ bspo4, setbspo4 ] = React.useState( [] )
    const [ bspo5, setbspo5 ] = React.useState( [] )


    React.useEffect( () => {
        new BaseService( About_API.PersonnelDirectory ).fetch( '' ).then( ( data: any ) => {
            setppo( data.ppo )
            setad( data.ad )
            settrd( data.trd )

            setfod1( data.fod1 )
            setfod2( data.fod2 )
            setfod3( data.fod3 )
            setfod4( data.fod4 )
            setfod5( data.fod5 )

            setapvw( data.apvw )
            setbod( data.bod )

            setbspo1( data.bspo1 )
            setbspo2( data.bspo2 )
            setbspo3( data.bspo3 )
            setbspo4( data.bspo4 )
            setbspo5( data.bspo5 )
        } )
    }, [] )


    return (
        <Container>
            <CommonHeader title="Personnel Directory" backgroundColor={Colors[ colorScheme ].background} />
            {
                ppo.map( ( personnel: Personnel, index: number ) => (
                    <PersonnelDirectoryCard key={index} personnel={personnel} />

                ) )
            }
            {
                ad.map( ( personnel: Personnel, index: number ) => (
                    <PersonnelDirectoryCard key={index} personnel={personnel} />

                ) )
            }
            {
                trd.map( ( personnel: Personnel, index: number ) => (
                    <PersonnelDirectoryCard key={index} personnel={personnel} />

                ) )
            }
            {
                fod1.map( ( personnel: Personnel, index: number ) => (
                    <PersonnelDirectoryCard key={index} personnel={personnel} />

                ) )
            }
            {
                fod2.map( ( personnel: Personnel, index: number ) => (
                    <PersonnelDirectoryCard key={index} personnel={personnel} />

                ) )
            }
            {
                fod3.map( ( personnel: Personnel, index: number ) => (
                    <PersonnelDirectoryCard key={index} personnel={personnel} />

                ) )
            }
            {
                fod4.map( ( personnel: Personnel, index: number ) => (
                    <PersonnelDirectoryCard key={index} personnel={personnel} />

                ) )
            }
            {
                fod5.map( ( personnel: Personnel, index: number ) => (
                    <PersonnelDirectoryCard key={index} personnel={personnel} />

                ) )
            }
            {
                apvw.map( ( personnel: Personnel, index: number ) => (
                    <PersonnelDirectoryCard key={index} personnel={personnel} />

                ) )
            }
            {
                bod.map( ( personnel: Personnel, index: number ) => (
                    <PersonnelDirectoryCard key={index} personnel={personnel} />

                ) )
            }
            {
                bspo1.map( ( personnel: Personnel, index: number ) => (
                    <PersonnelDirectoryCard key={index} personnel={personnel} />

                ) )
            }
            {
                bspo2.map( ( personnel: Personnel, index: number ) => (
                    <PersonnelDirectoryCard key={index} personnel={personnel} />

                ) )
            }
            {
                bspo3.map( ( personnel: Personnel, index: number ) => (
                    <PersonnelDirectoryCard key={index} personnel={personnel} />

                ) )
            }
            {
                bspo4.map( ( personnel: Personnel, index: number ) => (
                    <PersonnelDirectoryCard key={index} personnel={personnel} />

                ) )
            }
            {
                bspo5.map( ( personnel: Personnel, index: number ) => (
                    <PersonnelDirectoryCard key={index} personnel={personnel} />

                ) )
            }
        </Container>
    );
};

export default Directory;
