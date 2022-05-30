import React, { FC, useState, useEffect, useContext } from "react";
import { View, Text, StyleSheet, ImageBackground, Pressable, Image, SafeAreaView, FlatList } from "react-native";
import tennis from "../assets/TennisRacket.png";
import tennisPic from "../assets/tennis.jpg";
import { MaterialIcons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { FontAwesome, FontAwesome5 } from '@expo/vector-icons';

import AppLoading from "expo-app-loading";
import { GetLikedEventsByUserId, GetEventItemById, GetIsLiked, AddLikedEvent, DeleteLikedEvent } from "../Services/DataService";
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
import yoga from "../assets/yoga.jpg";
import skateboarding from "../assets/SkateboardEvent.jpg";
import pugEvent from "../assets/pugEvent.png";
import { createOpenLink } from "react-native-open-maps";



interface EventsProps {
  handlePastEvents: Function,
  handleLikedEvents: Function
}

interface LikedEventProps {
  eventName: string,
  dateOfEvent: string,
  addressOfEvent: string,
  timeOfEvent: string,
  nameOfTheEvent: string,
}


type RootStackParamList = {
  Nav: undefined,
  event: { name: string },
  profile: { name: string },
  PastEvents: undefined,
  LikedEvents: undefined
}

const LikedEventItems = ({ id, dateOfEvent, timeOfEvent, addressOfEvent, nameOfEvent, getLikedEventsByUser, navigation, sportOfEvent }: any) => {
  const { userItems, setUpdateScreen, setUpdateProfileScreen } = useContext<any>(UserContext);
  const [isLiked, setIsLiked] = useState<boolean>(true);
  const [disableBtn, setDisableBtn] = useState(false);

  const handleLiked = async () => {
    await DeleteLikedEvent(userItems.id, id)
    getLikedEventsByUser();
    setDisableBtn(true);
    setIsLiked(false);
    setUpdateScreen(true);
    setUpdateProfileScreen(true);
  }

  const longAddresses = (address: string) => {
    let editedAddress: string = "";
    let ditto: string = "...";
    if (address.length > 40) {
      for (let i = 0; i < 40; i++) {
        editedAddress += address[i];
      }
    }
    editedAddress += ditto;
    return editedAddress;
  }

  return (
    <>

      <View style={styles.card}>
        <View style={styles.cardContent}>
          <View style={{ flexDirection: 'row', }}>
            {
              sportOfEvent === "Basketball" ?
                <Image source={BasketballEvent} style={{ height: 100, width: 145, borderRadius: 8 }} />
                : sportOfEvent === "Soccer" ?
                  <Image source={soccer} style={{ height: 100, width: 145, borderRadius: 8 }} />
                  : sportOfEvent === "Badminton" ?
                    <Image source={badminton} style={{ height: 100, width: 145, borderRadius: 8 }} />
                    : sportOfEvent === "Baseball" ?
                      <Image source={baseball} style={{ height: 100, width: 145, borderRadius: 8 }} />
                      : sportOfEvent === "Cycling" ?
                        <Image source={biking1} style={{ height: 100, width: 145, borderRadius: 8 }} />
                        : sportOfEvent === "Hockey" ?
                          <Image source={hockey} style={{ height: 100, width: 145, borderRadius: 8 }} />
                          : sportOfEvent === "Disc golf" ?
                            <Image source={discGolf1} style={{ height: 100, width: 145, borderRadius: 8 }} />
                            : sportOfEvent === "Fishing" ?
                              <Image source={fishing} style={{ height: 100, width: 145, borderRadius: 8 }} />
                              : sportOfEvent === "Football" ?
                                <Image source={football} style={{ height: 100, width: 145, borderRadius: 8 }} />
                                : sportOfEvent === "Frisbee" ?
                                  <Image source={frisbee} style={{ height: 100, width: 145, borderRadius: 8 }} />
                                  : sportOfEvent === "Golf" ?
                                    <Image source={golf} style={{ height: 100, width: 145, borderRadius: 8 }} />
                                    : sportOfEvent === "Handball" ?
                                      <Image source={handball} style={{ height: 100, width: 145, borderRadius: 8 }} />
                                      : sportOfEvent === "Hiking" ?
                                        <Image source={hiking} style={{ height: 100, width: 145, borderRadius: 8 }} />
                                        : sportOfEvent === "Cricket" ?
                                          <Image source={cricketevent} style={{ height: 100, width: 145, borderRadius: 8 }} />
                                          : sportOfEvent === "Rugby" ?
                                            <Image source={rugby} style={{ height: 100, width: 145, borderRadius: 8 }} />
                                            : sportOfEvent === "Pickleball" ?
                                              <Image source={pickleball} style={{ height: 100, width: 145, borderRadius: 8 }} />
                                              : sportOfEvent === "Running" ?
                                                <Image source={running} style={{ height: 100, width: 145, borderRadius: 8 }} />
                                                : sportOfEvent === "Softball" ?
                                                  <Image source={softball} style={{ height: 100, width: 145, borderRadius: 8 }} />
                                                  : sportOfEvent === "Spikeball" ?
                                                    <Image source={spikeball} style={{ height: 100, width: 145, borderRadius: 8 }} />
                                                    : sportOfEvent === "Tennis" ?
                                                      <Image source={tennisPic} style={{ height: 100, width: 145, borderRadius: 8 }} />
                                                      : sportOfEvent === "Lacrosse" ?
                                                        <Image source={lacrosse} style={{ height: 100, width: 145, borderRadius: 8 }} />
                                                        : sportOfEvent === "Volleyball" ?
                                                          <Image source={volleyballevent} style={{ height: 100, width: 145, borderRadius: 8 }} />
                                                          : sportOfEvent === "Yoga" ?
                                                            <Image source={yoga} style={{ height: 100, width: 145, borderRadius: 8 }} />
                                                            : sportOfEvent === "SkateBoarding" ?
                                                              <Image source={skateboarding} style={{ flex: 1, height: 90, width: 120, borderRadius: 8 }} />
                                                              :
                                                              <Image source={pugEvent} style={{ height: 100, width: 145, borderRadius: 8 }} />
            }

            <View style={{ marginLeft: 35 }}>
              <View style={{ flexDirection: 'row' }}>
                <MaterialCommunityIcons name="calendar-month" size={23} color="rgba(10, 50, 109, 1)" style={{ marginTop: 6, marginLeft: 14 }} />
                <Text style={{ marginTop: 9, marginLeft: 5, fontFamily: "Roboto_400Regular", fontSize: 16 }}>{dateOfEvent}</Text>
              </View>
              <View style={{ flexDirection: 'column', }}>
                <View style={{ flexDirection: 'row', }}>
                  <MaterialCommunityIcons name="clock-time-three-outline" size={23} color="rgba(10, 50, 109, 1)" style={{ marginTop: 5, marginLeft: 14 }} />
                  <Text style={{ marginTop: 8, marginLeft: 5, fontFamily: "Roboto_400Regular", fontSize: 16 }}>{timeOfEvent}</Text>
                </View>

                <View style={{ flexDirection: 'row', width: 155 }}>
                  <Text style={{ fontSize: 12, marginLeft: 20, marginTop: 8, fontFamily: "Lato_400Regular" }}>
                    {
                      addressOfEvent.length < 40 ? addressOfEvent : longAddresses(addressOfEvent)
                    }
                  </Text>
                </View>


              </View>
            </View>
          </View>
          <Text style={{ marginLeft: 4, marginTop: 5, fontFamily: "Lato_700Bold", fontSize: 14 }}>{nameOfEvent}</Text>


          <View style={{ flexDirection: 'row', justifyContent: 'flex-end' }}>
            <Pressable onPress={createOpenLink({ provider: 'google', end: addressOfEvent })}>
              <MaterialIcons name="location-on" size={16} color="white" style={{ backgroundColor: '#0A326D', borderRadius: 3, overflow: 'hidden', marginLeft: 12, padding: 5 }} />
            </Pressable>
            <Pressable onPress={handleLiked} disabled={disableBtn} >
              {
                isLiked ? <FontAwesome name="heart" size={13} color="red" style={{ backgroundColor: '#0A326D', borderRadius: 3, overflow: 'hidden', padding: 6.5, marginLeft: 9 }} />
                  : <FontAwesome name="heart-o" size={13} color="white" style={{ backgroundColor: '#0A326D', borderRadius: 3, overflow: 'hidden', padding: 6.5, marginLeft: 9 }} />
              }

            </Pressable>
          </View>

        </View>
      </View>

    </>
  )
};


type Props = NativeStackScreenProps<RootStackParamList, "profile">;

const LikedEventsScreen: FC<Props> = ({ navigation, route }) => {
  const { userItems } = useContext<any>(UserContext);
  const [displayEvents, setDisplayEvents] = useState<any>([]);
  const [isLiked, setIsLiked] = useState(true);


  useEffect(() => {
    getLikedEventsByUser();

  }, []);

  const getLikedEventsByUser = async () => {
    let likedEventsIds: number[] = [];
    let eventsArr: object[] = [];

    let likedEvents = await GetLikedEventsByUserId(userItems.id)
    await likedEvents.map(async (eventObj: any) => {
      let event = await GetEventItemById(eventObj.eventId);

      if (event.id != 0) {
        eventsArr.push(event);
        setDisplayEvents(eventsArr)
      }
    })

  }


  const handleLiked = (eventId: number) => {
    setIsLiked(!isLiked)


    DeleteLikedEvent(userItems.id, eventId)

    setTimeout(() => {
      getLikedEventsByUser();
    }, 1000)

  }

  const renderItem = ({ item }: any) => {
    return (
      <LikedEventItems
        id={item.id}
        dateOfEvent={item.dateOfEvent}
        timeOfEvent={item.timeOfEvent}
        addressOfEvent={item.addressOfEvent}
        nameOfEvent={item.nameOfEvent}
        displayEvents={displayEvents}
        navigation={navigation}
        getLikedEventsByUser={getLikedEventsByUser}
        sportOfEvent={item.sportOfEvent}
      />
    )
  };

  const handlePastEvents = () => {
    navigation.navigate('PastEvents')
  }
  const handleLikedEvents = () => {
    navigation.navigate('LikedEvents')
  }

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
      <View style={styles.container}>
        <ImageBackground source={tennis} resizeMode="cover" style={{ height: "100%", width: "100%", backgroundColor: "#0A326D" }}>
          <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
            <Pressable onPress={() => navigation.navigate('Nav')}>
              <View style={{ backgroundColor: 'white', height: 35, width: 110, marginTop: 50, borderTopLeftRadius: 10, borderBottomLeftRadius: 10, }}>
                <Text style={{ marginLeft: 20, marginTop: 10, fontSize: 13, fontFamily: "Lato_700Bold", color: "rgba(10, 50, 109, 1)" }}>My Profile</Text>
              </View>
            </Pressable>
            <Pressable onPress={handlePastEvents}>
              <View style={{ backgroundColor: 'white', height: 35, width: 110, marginTop: 50 }}>
                <Text style={{ marginLeft: 12, marginTop: 10, fontSize: 13, fontFamily: "Lato_700Bold", color: "rgba(10, 50, 109, 1)" }}>Past events</Text>
              </View>
            </Pressable>
            <Pressable onPress={handleLikedEvents}>
              <View style={{ backgroundColor: 'white', height: 35, width: 110, marginTop: 50, borderTopRightRadius: 10, borderBottomRightRadius: 10 }}>
                <Text style={{ marginLeft: 10, marginTop: 10, fontSize: 13, fontFamily: "Lato_700Bold", color: "rgba(10, 50, 109, 1)" }}>Liked events</Text>
              </View>
            </Pressable>
          </View>

          <Text style={{ marginLeft: 22, marginTop: 50, color: 'white', fontSize: 35, fontFamily: "Lato_700Bold", fontWeight: "bold", }}>Liked Events</Text>

          <SafeAreaView style={styles.containerFlat}>
            <FlatList
              data={displayEvents}
              renderItem={renderItem}
              keyExtractor={(item: any) => item.id}
            />
          </SafeAreaView>

        </ImageBackground>
      </View>
    </>
  )
};


const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  containerFlat: {
    flex: 1,
  },
  card: {
    borderRadius: 8,
    backgroundColor: '#fff',
    shadowOffset: { width: 1, height: 1 },
    shadowColor: '#333',
    shadowOpacity: 0.3,
    shadowRadius: 2,
    marginHorizontal: 20,
    marginVertical: 15,
    marginLeft: 18,
    height: 180,
    width: 345
  },
  cardContent: {
    marginHorizontal: 8,
    marginVertical: 8,
  },
});


export default LikedEventsScreen;