
import React, { FC } from 'react';
import { Text } from 'react-native';
import CardWithImage from '../../components/about/CardWithImage';
import CommonHeader from '../../components/headers/CommonHeader';
import WithRefreshComponent from '../../components/WithRefreshComponent';
import Colors from '../../constants/Colors';
import Container from '../../constants/Layout';
import useColorScheme from '../../hooks/useColorScheme';

type Props = {};

const Goals: FC<Props> = ( props ) => {

    const colorScheme = useColorScheme();

    return (
        <Container>
            <CommonHeader title="Goals" backgroundColor={Colors[ colorScheme ].background} />
            <WithRefreshComponent loading={false} onRefresh={() => { void 0 }}>

                <CardWithImage image={require( '../../assets/app/mandate/4.png' )}
                    text="To generate and maintain an efficient and reliable data bank responsive to the data and information needs of the population development programs of the Province of Iloilo;"
                />

                <CardWithImage image={require( '../../assets/app/mandate/3.png' )}
                    text="To provide updated data and information to support program operations and development planning of LGUs, partner agencies and other stakeholders;"
                />

                <CardWithImage image={require( '../../assets/app/mandate/5.png' )}
                    text="To undertake educational projects that promotes people’s participation empowerment towards total human development in the context of our cultural heritage;"
                />

                <CardWithImage image={require( '../../assets/app/mandate/2.png' )}
                    text="To apply new technologies and processes that will effect more efficient and effective data generation, processing and management."
                />

            </WithRefreshComponent>
        </Container>
    );
};


export default Goals;
