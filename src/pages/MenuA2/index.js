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

export default function MenuA2({ navigation, route }) {




    useFocusEffect(
        useCallback(() => {
            const unsubscribe = __getTransaction()
            return () => unsubscribe;
        }, [data])
    );



    const ListInfo = ({ label, value }) => {
        return (
            <View style={{
                marginBottom: 2,
            }}>
                <Text style={{
                    fontFamily: fonts.secondary[800],
                    color: colors.white,
                    fontSize: 12,
                }}>{label}</Text>
                <Text style={{
                    fontFamily: fonts.secondary[400],
                    color: colors.white,
                    fontSize: 12,
                }}>{value}</Text>


            </View>
        )
    }

    const [data, setData] = useState([]);

    const __renderItem = ({ item }) => {
        return (
            <View style={{
                padding: 10,
                borderRadius: 10,
                margin: 5,

                backgroundColor: colors.primary,
                flexDirection: 'row', alignItems: 'center'
            }}>

                <View style={{
                    flex: 1
                }}>
                    <Text style={{
                        fontFamily: fonts.secondary[600],
                        fontSize: 15,
                        marginBottom: 10,
                        color: colors.white,
                    }}>{moment(item.tanggal).format('dddd, DD MMMM YYYY')}</Text>

                    <ListInfo label="Makan Pagi" value={item.makan_pagi} />
                    <ListInfo label="Makan Siang" value={item.makan_siang} />
                    <ListInfo label="Makan Malam" value={item.makan_malam} />
                    <ListInfo label="Kudapan" value={item.kudapan} />
                    <ListInfo label="Masalah Saat Pemberian Makan" value={item.masalah_makan} />
                    <ListInfo label="Masalah Kesehatan anak" value={item.masalah_kesehatan} />
                </View>
                <TouchableOpacity onPress={() => {
                    Alert.alert(MYAPP, 'Apakah kamu mau hapus ini ?', [
                        {
                            text: 'TIDAK'
                        },
                        {
                            text: 'HAPUS',
                            onPress: () => {
                                axios.post(apiURL + 'harian_delete', {
                                    id: item.id
                                }).then(r => {
                                    showMessage({
                                        type: 'success',
                                        message: 'Data berhasil dihapus !'
                                    })
                                    __getTransaction();
                                })
                            }
                        }
                    ])
                }}>
                    <Icon type='ionicon' name='trash' size={20} color={colors.white} />
                </TouchableOpacity>
            </View>
        )
    }


    const __getTransaction = () => {
        getData('user').then(u => {
            axios.post(apiURL + 'harian', {
                fid_user: u.id
            }).then(res => {
                console.log(res.data);
                setData(res.data);
            })
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
            <MyButton onPress={() => navigation.navigate('MenuA2Add', route.params)} radius={0} title="Input Data" Icons="duplicate" />
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({})