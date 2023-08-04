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

export default function Home({ navigation, route }) {

  const [user, setUser] = useState({});
  const isFocus = useIsFocused();
  const [data, setData] = useState([]);
  const [open, setOpen] = useState(false);
  const [comp, setComp] = useState({});

  const _getTransaction = async () => {

    await getData('user').then(u => {
      setUser(u);
    })

    await axios.post(apiURL + 'company').then(res => {

      setComp(res.data.data);

    });

  }


  useEffect(() => {
    if (isFocus) {
      _getTransaction();
    }
  }, [isFocus]);




  return (

    <SafeAreaView style={{
      flex: 1,
      backgroundColor: colors.white
    }}>
      <View style={{
        padding: 10,
        backgroundColor: colors.primary,
        flexDirection: 'row',
        alignItems: 'center'
      }}>
        <View style={{
          flex: 1,
        }}>
          <Text style={{
            fontFamily: fonts.secondary[600],
            fontSize: 14,
            color: colors.white
          }}>Hi, {user.nama_lengkap}</Text>
          <Text style={{
            fontFamily: fonts.secondary[400],
            fontSize: 14,
            color: colors.white
          }}>Selamat datang di NUTRITIONAL RANGERS</Text>
        </View>
        <View style={{
          backgroundColor: colors.secondary,
          width: 60,
          height: 60,
          justifyContent: 'center',
          alignItems: 'center',
          borderRadius: 30,
        }}>
          <Image source={require('../../assets/logo.png')} style={{
            width: 35,
            height: 35,
            resizeMode: 'contain'
          }} />
        </View>
      </View>

      <View style={{
        flex: 1,
        backgroundColor: colors.white,
        paddingTop: 20,
      }}>


        <MyCarouser />

        <View style={{
          flex: 1,
          justifyContent: 'center',
        }}>
          <View style={{
            flexDirection: 'row'
          }}>
            <TouchableNativeFeedback onPress={() => navigation.navigate('MenuA1', {
              judul: 'Screening Status Gizi',
              kategori: 'Tanaman'
            })}>
              <View style={{
                margin: 10,
                backgroundColor: colors.primary,
                borderRadius: 10,
                flex: 1,
                padding: 20,
                justifyContent: 'center',
                alignItems: 'center'
              }}>
                <Image source={require('../../assets/A1.png')} style={{
                  width: 80,
                  height: 80
                }} />
                <Text style={{
                  marginTop: 10,
                  fontFamily: fonts.secondary[600],
                  fontSize: 15,
                  color: colors.white,
                  textAlign: 'center'
                }}>Screening Status Gizi</Text>
              </View>
            </TouchableNativeFeedback>
            <TouchableNativeFeedback onPress={() => navigation.navigate('Materi', {
              judul: 'Mengenal Masalah Gizi Anak',
              fid_menu: 10,
            })}>
              <View style={{
                margin: 10,
                backgroundColor: colors.secondary,
                borderRadius: 10,
                flex: 1,
                padding: 20,
                justifyContent: 'center',
                alignItems: 'center'
              }}>
                <Image source={require('../../assets/A2.png')} style={{
                  width: 80,
                  height: 80
                }} />
                <Text style={{
                  marginTop: 10,
                  fontFamily: fonts.secondary[600],
                  fontSize: 15,
                  color: colors.white,
                  textAlign: 'center'
                }}>Mengenal Masalah Gizi Anak</Text>
              </View>
            </TouchableNativeFeedback>

          </View>
          <View style={{
            flexDirection: 'row'
          }}>
            <TouchableNativeFeedback onPress={() => navigation.navigate('Materi', {
              judul: 'Mengenal Gizi Seimbang',
              fid_menu: 11,
            })}>
              <View style={{
                margin: 10,
                backgroundColor: colors.secondary,
                borderRadius: 10,
                flex: 1,
                padding: 20,
                justifyContent: 'center',
                alignItems: 'center'
              }}>
                <Image source={require('../../assets/A3.png')} style={{
                  width: 80,
                  height: 80
                }} />
                <Text style={{
                  marginTop: 10,
                  fontFamily: fonts.secondary[600],
                  fontSize: 15,
                  color: colors.white,
                  textAlign: 'center'
                }}>Mengenal Gizi Seimbang</Text>
              </View>
            </TouchableNativeFeedback>
            <TouchableNativeFeedback onPress={() => navigation.navigate('Materi', {
              judul: 'Gizi Ibu Menyusui & ASI Ekslusif',
              fid_menu: 12
            })} >
              <View style={{
                margin: 10,
                backgroundColor: colors.primary,
                borderRadius: 10,
                flex: 1,
                padding: 20,
                justifyContent: 'center',
                alignItems: 'center'
              }}>
                <Image source={require('../../assets/A4.png')} style={{
                  width: 80,
                  height: 80
                }} />
                <Text style={{
                  marginTop: 10,
                  fontFamily: fonts.secondary[600],
                  fontSize: 15,
                  color: colors.white,
                  textAlign: 'center'
                }}>Gizi Ibu Menyusui & ASI Ekslusif</Text>
              </View>
            </TouchableNativeFeedback>

          </View>
        </View>

      </View>








      <View style={{
        flexDirection: 'row',
        backgroundColor: colors.primary,
        justifyContent: 'space-around'
      }}>
        <TouchableOpacity style={{
          padding: 10,
        }}>
          <Icon type='ionicon' name='home-outline' color={colors.white} size={20} />
          <Text style={{
            fontFamily: fonts.secondary[600],
            fontSize: 12,
            color: colors.white
          }}>Beranda</Text>

        </TouchableOpacity>



        <TouchableOpacity onPress={() => navigation.navigate('Account')} style={{
          padding: 10,
        }}>
          <Icon type='ionicon' name='person-outline' color={colors.white} size={20} />
          <Text style={{
            fontFamily: fonts.secondary[600],
            fontSize: 12,
            color: colors.white
          }}>Profile</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView >
  )
}

const styles = StyleSheet.create({})