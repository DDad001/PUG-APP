import React, { FC, useState } from "react";
import { View, Text, StyleSheet, ImageBackground, Pressable, Image } from "react-native";
import tennis from "../assets/TennisRacket.png";
import { MaterialIcons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import man from '../assets/man.jpg';

const PassedLikedEventsScreen: FC = () => {
  return (
    <View style={styles.container}>
      <ImageBackground source={tennis} resizeMode="cover" style={{ height: "100%", width: "100%", backgroundColor: "#0A326D" }}>
      <View style={{flexDirection:'row', justifyContent:'center'}}>
                <View style={{backgroundColor:'white', height:35,width:110, marginTop:50, borderTopLeftRadius:10, borderBottomLeftRadius:10,}}>
                    <Text style={{marginLeft:20, marginTop:10,}}>My Profile</Text>
                </View>
                <View style={{backgroundColor:'white', height:35,width:110, marginTop:50}}>
                    <Text style={{marginLeft:12, marginTop:10}}>Past events</Text>
                </View>
                <View style={{backgroundColor:'white', height:35,width:110, marginTop:50,borderTopRightRadius:10, borderBottomRightRadius:10}}>
                    <Text style={{marginLeft:10, marginTop:10}}>Liked events</Text>
                </View>
             </View>

             <View>
               <Text style={{marginLeft:22, marginTop:50,color:'white', fontSize:20}}>Past Events</Text>
             </View>

             <View style={styles.card}>
            <View style={styles.cardContent}>
            <View style={{ flexDirection: 'row', }}>
            <Image source={man} style={{ height: 100, width: 145, borderRadius: 8 }} />
            <View>
              <View style={{ flexDirection: 'row' }}>
                <MaterialCommunityIcons name="calendar-month" size={23} color="black" style={{ marginTop: 6, marginLeft: 14}} />
                  <Text style={{ marginTop: 9, marginLeft: 5}}>3/13/22</Text>
              </View>
              <View style={{ flexDirection: 'column', }}>
                <View style={{ flexDirection: 'row', }}>
                <MaterialCommunityIcons name="clock-time-three-outline" size={23} color="black" style={{ marginTop:5, marginLeft: 14 }} />
                  <Text style={{ marginTop: 8, marginLeft: 5 }}>9:30 am</Text>
                </View>

                <View style={{ flexDirection: 'row' }}>
                   <Text>6300 Whitelock Pkwy, Elk Grove, CA 95757</Text>
                </View>


              </View>
            </View>
          </View>

                <Text style={{marginTop:10, marginLeft:4}}>Hal Bartholomew Sports Park Football Game </Text>
                <Text style={{marginTop:5, marginLeft:4, fontSize:12}}>6300 Whitelock Pkwy, Elk Grove, CA 95757</Text>
            
        </View>
      </View>

      </ImageBackground>
    </View>
  );
};


const styles = StyleSheet.create({
    container:{
        flex: 1
    },
    card: {
      borderRadius: 8,
      backgroundColor: '#fff',
      shadowOffset: { width: 1, height: 1 },
      shadowColor: '#333',
      shadowOpacity: 0.3,
      shadowRadius: 2,
      marginHorizontal:20,
      marginVertical: 20,
      marginLeft:18,
      height:180,
      width:345
    },
    cardContent: {
      marginHorizontal: 8,
      marginVertical: 8,
    },
});


export default PassedLikedEventsScreen;