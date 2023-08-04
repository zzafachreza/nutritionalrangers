import { Alert, StyleSheet, Text, View, Image, FlatList, ActivityIndicator, Dimensions, ImageBackground, TouchableWithoutFeedback, TouchableNativeFeedback, Linking } from 'react-native'
import React, { useState, useEffect, useRef } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { apiURL, getData, MYAPP, storeData } from '../../utils/localStorage';
import { colors, fonts, windowHeight, windowWidth } from '../../utils';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { Icon } from 'react-native-elements/dist/icons/Icon';
import { useIsFocused } from '@react-navigation/native';
import axios from 'axios';
import 'intl';
import 'intl/locale-data/jsonp/en';
import moment from 'moment';
import 'moment/locale/id';
import MyCarouser from '../../components/MyCarouser';
import { MyButton, MyCalendar, MyGap, MyHeader, MyInput } from '../../components';

export default function MenuApd({ navigation, route }) {

    const isFocus = useIsFocused();

    useEffect(() => {

        if (isFocus) {
            __getTransaction();
        }
    }, isFocus);

    const [data, setData] = useState([]);

    const __renderItem = ({ item }) => {
        return (
            <TouchableOpacity onPress={() => navigation.navigate('InfoPdf', item)} style={{
                padding: 10,
                borderRadius: 10,
                margin: 10,
                height: 80,
                backgroundColor: colors.primary,
                flexDirection: 'row', alignItems: 'center'
            }}>
                <Image style={{
                    width: 40,
                    height: 40,
                    resizeMode: 'contain'
                }} source={{
                    uri: item.icon
                }} />
                <Text style={{
                    left: 10,
                    fontFamily: fonts.secondary[600],
                    fontSize: 20,
                    color: colors.white,
                    flex: 1,
                }}>{item.nama_materi}</Text>
                <Icon type='ionicon' name='chevron-forward' size={20} color={colors.white} />
            </TouchableOpacity>
        )
    }

    const __getTransaction = () => {

        axios.post(apiURL + 'materi', {
            fid_menu: route.params.fid_menu
        }).then(res => {
            console.log(res.data);
            setData(res.data)
        })

    }

    return (
        <SafeAreaView style={{
            flex: 1,
            backgroundColor: colors.white
        }}>
            <View style={{
                flexDirection: 'row',
                backgroundColor: colors.white,
                padding: 5,
                height: 80,
                borderBottomLeftRadius: 10,
                borderBottomRightRadius: 10,
                alignItems: 'center'
            }}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={{
                    padding: 5,
                }}>
                    <Icon type='ionicon' name='arrow-back-outline' size={windowWidth / 13} color={colors.black} />
                </TouchableOpacity>
                <Text style={{
                    flex: 1,
                    textAlign: 'center',
                    fontFamily: fonts.secondary[600],
                    fontSize: 20,

                    color: colors.black
                }}>{route.params.judul}</Text>

            </View>
            <View style={{
                flex: 1,
                padding: 10,
            }}>
                <FlatList showsVerticalScrollIndicator={false} data={data} renderItem={__renderItem} />
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({})