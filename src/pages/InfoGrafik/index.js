import { Alert, StyleSheet, Text, View, Image, FlatList, ActivityIndicator, Dimensions, ImageBackground, TouchableWithoutFeedback, TouchableNativeFeedback, Linking } from 'react-native'
import React, { useState, useEffect, useRef, useCallback } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { apiURL, getData, MYAPP, storeData } from '../../utils/localStorage';
import { colors, fonts, windowHeight, windowWidth } from '../../utils';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { Icon } from 'react-native-elements/dist/icons/Icon';
import { useFocusEffect, useIsFocused } from '@react-navigation/native';
import axios from 'axios';
import 'intl';
import 'intl/locale-data/jsonp/en';
import moment from 'moment';
import 'moment/locale/id';
import MyCarouser from '../../components/MyCarouser';
import { MyButton, MyCalendar, MyGap, MyHeader, MyInput } from '../../components';
import { showMessage } from 'react-native-flash-message';
import { WebView } from 'react-native-webview';
export default function InfoGrafik({ navigation, route }) {




    useFocusEffect(
        useCallback(() => {
            const unsubscribe = __getTransaction()
            return () => unsubscribe;
        }, [data])
    );





    const [data, setData] = useState([
        // { x: 1691193600000, y: 64 },
        // { x: 1690588800000, y: 67 },
        // { x: 1689984000000, y: 53 },
        // { x: 1689379200000, y: 53 },
        // { x: 1688774400000, y: 56 },
        // { x: 1688169600000, y: 50 },

        { x: moment('2023-07-08').valueOf(), y: 78, },
        { x: moment('2023-07-15').valueOf(), y: 80 },
        { x: moment('2023-07-22').valueOf(), y: 200 },
        { x: moment('2023-07-29').valueOf(), y: 120 }

    ]);

    const [link, setLink] = useState('');
    const __getTransaction = () => {


        getData('user').then(u => {
            setLink(`https://nutritionalrangers.okeadmin.com/api/mingguan_grafik?fid_user=${u.id}&lebar=${windowWidth}&tinggi=${windowHeight}`)
        })


    }


    const [loading, setLoading] = useState(true);
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

            <WebView onLoad={() => setLoading(false)} source={{ uri: link }} style={{ flex: 1 }} />

            {loading && <View style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center'
            }}>
                <ActivityIndicator color={colors.primary} size="large" />
            </View>}

        </SafeAreaView>
    )
}

const styles = StyleSheet.create({})