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
import { showMessage } from 'react-native-flash-message';

export default function MenuA3Add({ navigation, route }) {

    const [kirim, setKirim] = useState({
        tanggal: moment().format('YYYY-MM-DD'),
        berat_badan: ''
    })
    const [loading, setLoading] = useState(false);





    const sendServer = () => {
        setLoading(true);

        setTimeout(() => {
            setLoading(false);
            axios.post(apiURL + 'mingguan_add', kirim).then(res => {
                console.log(res.data);
                if (res.data == 200) {
                    showMessage({
                        type: 'success',
                        message: 'Berhasil di simpan !'
                    })
                    navigation.goBack();
                }
            })
        }, 1000)

    }

    useEffect(() => {
        getData('user').then(u => {
            setKirim({
                ...kirim,
                fid_user: u.id
            })
        })
    }, [])



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
            <ScrollView style={{
                padding: 20
            }}>
                <MyCalendar value={kirim.tanggal} onDateChange={x => setKirim({
                    ...kirim,
                    tanggal: x
                })} label="Tanggal" iconname="calendar" textColor={colors.secondary} colorIcon={colors.secondary} />
                <MyGap jarak={20} />
                <MyInput label="Berat Badan" textColor={colors.secondary} colorIcon={colors.secondary} value={kirim.berat_badan} onChangeText={x => setKirim({
                    ...kirim,
                    berat_badan: x
                })} iconname="speedometer" keyboardType='number-pad' placeholder="Masukan berat badan" />
                <MyGap jarak={20} />
                {!loading && <MyButton onPress={sendServer} colorText={colors.black} iconColor={colors.black} warna={colors.secondary} title="Simpan" Icons="save" />}
                {loading && <ActivityIndicator size="large" color={colors.secondary} />}
            </ScrollView>

        </SafeAreaView>
    )
}

const styles = StyleSheet.create({})