
import React, { FC } from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import style from '../../styles/components/article-datepicker'

type Props = {
    default: Function,
    today: Function,
    week: Function,
    month: Function,
    menu: string
};

const ArticleDatePicker: FC<Props> = ( props ) => {
    return (
        <View>
            <View style={style.container}>
                <TouchableOpacity
                    onPress={() => props.default()}
                    style={[ style.button, props.menu === 'All' ? style.active : {} ]}
                >
                    <Text style={[ style.buttonText, props.menu === 'All' ? style.activeText : {} ]}>All</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    onPress={() => props.today()}
                    style={[ style.button, props.menu === 'Today' ? style.active : {} ]}
                >
                    <Text style={[ style.buttonText, props.menu === 'Today' ? style.activeText : {} ]}>Today</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    onPress={() => props.week()}
                    style={[ style.button, props.menu === 'Week' ? style.active : {} ]}
                >
                    <Text style={[ style.buttonText, props.menu === 'Week' ? style.activeText : {} ]}>Week</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    onPress={() => props.month()}
                    style={[ style.button, props.menu === 'Month' ? style.active : {} ]}
                >
                    <Text style={[ style.buttonText, props.menu === 'Month' ? style.activeText : {} ]}>Month</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};


export default ArticleDatePicker;
