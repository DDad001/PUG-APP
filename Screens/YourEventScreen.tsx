import React, { FC, useState, useContext } from "react";
import { Image, ImageBackground, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import man from '../assets/man.jpg';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import AppLoading from "expo-app-loading";
import { StatusBar } from 'expo-status-bar';
import UserContext from '../Context/UserContext';


import {
  useFonts,
  Lato_100Thin,
  Lato_100Thin_Italic,
  Lato_300Light,
  Lato_300Light_Italic,
  Lato_400Regular,
  Lato_400Regular_Italic,
  Lato_700Bold,
  Lato_700Bold_Italic,
  Lato_900Black,
  Lato_900Black_Italic,
} from "@expo-google-fonts/lato";
import {
  Roboto_100Thin,
  Roboto_100Thin_Italic,
  Roboto_300Light,
  Roboto_300Light_Italic,
  Roboto_400Regular,
  Roboto_400Regular_Italic,
  Roboto_500Medium,
  Roboto_500Medium_Italic,
  Roboto_700Bold,
  Roboto_700Bold_Italic,
  Roboto_900Black,
  Roboto_900Black_Italic,
} from "@expo-google-fonts/roboto";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import BasketballEvent from "../assets/BasketballEvent.jpg";
import soccer from "../assets/soccer.jpg";
import volleyballevent from "../assets/volleyballevent.jpg";
import spikeball from "../assets/spikeball.jpg";
import softball from "../assets/softball.jpg";
import running from "../assets/running.jpg";
import rugby from "../assets/rugby.jpg";
import pickleball from "../assets/pickleball.jpg";
import lacrosse from "../assets/lacrosse.jpg";
import hockey from "../assets/hockey.jpg";
import hiking from "../assets/hiking.jpg";
import handball from "../assets/handball.jpg";
import golf from "../assets/golf.jpg";
import frisbee from "../assets/frisbee.jpg";
import football from "../assets/football.jpg";
import fishing from "../assets/fishing.jpg";
import discGolf1 from "../assets/discGolf1.jpg";
import cricketevent from "../assets/cricketevent.jpg";
import biking1 from "../assets/biking1.jpg";
import baseball from "../assets/baseball.jpg";
import badminton from "../assets/badminton.jpg";
import tennis from "../assets/tennis.jpg";
import pugEvent from "../assets/pugEvent.png";
import EventDisplayedImageComponent from "../Components/EventDisplayedImageComponent";


type RootStackParamList = {
  Nav: undefined,
  event: { name: string },
  schedule: undefined,
  cardList: { name: string },
  GoToEvent: undefined,
  profile: { name: string },
  GoToProfile: undefined,
}

const YourEventScreen: FC = () => {

  const {eventItems, nameContext } = useContext<any>(UserContext);

  let [fontsLoaded, error] = useFonts({
    Lato_100Thin,
    Lato_100Thin_Italic,
    Lato_300Light,
    Lato_300Light_Italic,
    Lato_400Regular,
    Lato_400Regular_Italic,
    Lato_700Bold,
    Lato_700Bold_Italic,
    Lato_900Black,
    Lato_900Black_Italic,
    Roboto_100Thin,
    Roboto_100Thin_Italic,
    Roboto_300Light,
    Roboto_300Light_Italic,
    Roboto_400Regular,
    Roboto_400Regular_Italic,
    Roboto_500Medium,
    Roboto_500Medium_Italic,
    Roboto_700Bold,
    Roboto_700Bold_Italic,
    Roboto_900Black,
    Roboto_900Black_Italic,
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  }

  return (
    <>
      <StatusBar style="dark" />
      <View style={styles.container}>
        <ScrollView>
          <View style={{ flex: 1, }}>

            {
              eventItems.sportOfEvent === "Basketball" ?
                <ImageBackground source={BasketballEvent} resizeMode="cover" style={{ height: 250 }}>
                  <EventDisplayedImageComponent />
                </ImageBackground>
                : eventItems.sportOfEvent === "Soccer" ?
                  <ImageBackground source={soccer} resizeMode="cover" style={{ height: 250 }}>
                    <EventDisplayedImageComponent />
                  </ImageBackground>
                  : eventItems.sportOfEvent === "Badminton" ?
                    <ImageBackground source={badminton} resizeMode="cover" style={{ height: 250 }}>
                      <EventDisplayedImageComponent />
                    </ImageBackground>
                    : eventItems.sportOfEvent === "Baseball" ?
                      <ImageBackground source={baseball} resizeMode="cover" style={{ height: 250 }}>
                        <EventDisplayedImageComponent />
                      </ImageBackground>
                      : eventItems.sportOfEvent === "Cycling" ?
                        <ImageBackground source={biking1} resizeMode="cover" style={{ height: 250 }}>
                          <EventDisplayedImageComponent />
                        </ImageBackground>
                        : eventItems.sportOfEvent === "Hockey" ?
                          <ImageBackground source={hockey} resizeMode="cover" style={{ height: 250 }}>
                            <EventDisplayedImageComponent />
                          </ImageBackground>
                          : eventItems.sportOfEvent === "Disc golf" ?
                            <ImageBackground source={discGolf1} resizeMode="cover" style={{ height: 250 }}>
                              <EventDisplayedImageComponent />
                            </ImageBackground>
                            : eventItems.sportOfEvent === "Fishing" ?
                              <ImageBackground source={fishing} resizeMode="cover" style={{ height: 250 }}>
                                <EventDisplayedImageComponent />
                              </ImageBackground>
                              : eventItems.sportOfEvent === "Football" ?
                                <ImageBackground source={football} resizeMode="cover" style={{ height: 250 }}>
                                  <EventDisplayedImageComponent />
                                </ImageBackground>
                                : eventItems.sportOfEvent === "Frisbee" ?
                                  <ImageBackground source={frisbee} resizeMode="cover" style={{ height: 250 }}>
                                    <EventDisplayedImageComponent />
                                  </ImageBackground>
                                  : eventItems.sportOfEvent === "Golf" ?
                                    <ImageBackground source={golf} resizeMode="cover" style={{ height: 250 }}>
                                      <EventDisplayedImageComponent />
                                    </ImageBackground>
                                    : eventItems.sportOfEvent === "Handball" ?
                                      <ImageBackground source={handball} resizeMode="cover" style={{ height: 250 }}>
                                        <EventDisplayedImageComponent />
                                      </ImageBackground>
                                      : eventItems.sportOfEvent === "Hiking" ?
                                        <ImageBackground source={hiking} resizeMode="cover" style={{ height: 250 }}>
                                          <EventDisplayedImageComponent />
                                        </ImageBackground>
                                        : eventItems.sportOfEvent === "Cricket" ?
                                          <ImageBackground source={cricketevent} resizeMode="cover" style={{ height: 250 }}>
                                            <EventDisplayedImageComponent />
                                          </ImageBackground>
                                          : eventItems.sportOfEvent === "Rugby" ?
                                            <ImageBackground source={rugby} resizeMode="cover" style={{ height: 250 }}>
                                              <EventDisplayedImageComponent />
                                            </ImageBackground>
                                            : eventItems.sportOfEvent === "Pickleball" ?
                                              <ImageBackground source={pickleball} resizeMode="cover" style={{ height: 250 }}>
                                                <EventDisplayedImageComponent />
                                              </ImageBackground>
                                              : eventItems.sportOfEvent === "Running" ?
                                                <ImageBackground source={running} resizeMode="cover" style={{ height: 250 }}>
                                                  <EventDisplayedImageComponent />
                                                </ImageBackground>
                                                : eventItems.sportOfEvent === "Softball" ?
                                                  <ImageBackground source={softball} resizeMode="cover" style={{ height: 250 }}>
                                                    <EventDisplayedImageComponent />
                                                  </ImageBackground>
                                                  : eventItems.sportOfEvent === "Spikeball" ?
                                                    <ImageBackground source={spikeball} resizeMode="cover" style={{ height: 250 }}>
                                                      <EventDisplayedImageComponent />
                                                    </ImageBackground>
                                                    : eventItems.sportOfEvent === "Tennis" ?
                                                      <ImageBackground source={tennis} resizeMode="cover" style={{ height: 250 }}>
                                                        <EventDisplayedImageComponent />
                                                      </ImageBackground>
                                                      : eventItems.sportOfEvent === "Lacrosse" ?
                                                        <ImageBackground source={lacrosse} resizeMode="cover" style={{ height: 250 }}>
                                                          <EventDisplayedImageComponent />
                                                        </ImageBackground>
                                                        : eventItems.sportOfEvent === "Volleyball" ?
                                                          <ImageBackground source={volleyballevent} resizeMode="cover" style={{ height: 250 }}>
                                                            <EventDisplayedImageComponent />
                                                          </ImageBackground>
                                                          :
                                                          <ImageBackground source={pugEvent} resizeMode="cover" style={{ height: 250 }}>
                                                            <EventDisplayedImageComponent />
                                                          </ImageBackground>


            }

          </View>

          <View style={{ marginLeft: 15 }}>
            <Text style={{ fontFamily: "Lato_700Bold", fontSize: 18, marginTop: 17 }}>{eventItems.nameOfEvent}</Text>
            <Text style={{ marginTop: 10, fontFamily: "Lato_400Regular", fontSize: 13 }}>{eventItems.addressOfEvent}</Text>
          </View>
          <View style={{ flexDirection: 'row' }}>
            <MaterialCommunityIcons name="calendar-month" size={22} color="black" style={{ marginTop: 10, marginLeft: 14 }} />
            <Text style={{ marginTop: 12, marginLeft: 9, fontFamily: "Roboto_400Regular", fontSize: 13 }}>{eventItems.dateOfEvent}</Text>
            <MaterialCommunityIcons name="clock-time-three-outline" size={22} color="black" style={{ marginLeft: 25, marginTop: 10 }} />
            <Text style={{ marginLeft: 9, marginTop: 12, fontFamily: "Roboto_400Regular", fontSize: 13 }} >{eventItems.timeOfEvent}</Text>
          </View>

          <View style={{ flexDirection: 'row', flex: 1, marginTop: 10 }}>

            <View style={{ flexDirection: 'column', flex: 0.93 }}>
              <Text style={{ marginLeft: 15, fontFamily: "Lato_700Bold", }}>Sport being played:</Text>
              <Text style={{ marginLeft: 15, fontFamily: "Lato_400Regular", }}>{eventItems.sportOfEvent}</Text>
            </View>
          </View>

          <View>
            <View style={{ flexDirection: 'row' }}>

              <View style={{ flexDirection: 'row', flex: 1, backgroundColor: '#7E90AB', marginTop: 15, height: 80, shadowRadius: 8, shadowColor: '#333', shadowOffset: { width: 5, height: 5 }, shadowOpacity: 0.4 }}>


                <Image source={man} style={{ height: 55, width: 55, borderRadius: 30, marginTop: 13, marginLeft: 22 }} />
                <Text style={{ flex: 0.9, marginTop: 30, marginLeft: 17, fontSize: 16, color: 'white', fontFamily: "Roboto_700Bold" }}>{nameContext}</Text>

              </View>

            </View>
          </View>

          <View style={{ marginLeft: 20, marginTop: 15 }} >
            <Text style={{ fontFamily: "Roboto_500Medium", fontSize: 17 }}>Details:</Text>
            <Text style={{ marginTop: 10, fontFamily: "Lato_400Regular", fontSize: 15, marginBottom: 20 }}>{eventItems.descriptionOfEvent}</Text>
          </View>
        </ScrollView>
      </View>
    </>
  )
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  containerInsideImage: {
    flexDirection: "row",
    paddingTop: 5,
  },
});
export default YourEventScreen;