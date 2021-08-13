import React, { FC } from 'react';
import { Text } from 'react-native';
import { View } from 'react-native';
import PageTitle from '../../components/PageTitle';
import WithRefreshComponent from '../../components/WithRefreshComponent';
import Container from '../../constants/Layout';

type Props = {};

const ServicesScreen: FC<Props> = ( props ) => {
    return (
        <Container>
            <PageTitle title="Services Offered" />
            <WithRefreshComponent loading={false} onRefresh={() => { void 0 }}></WithRefreshComponent>
        </Container>
    );
};

export default ServicesScreen;
