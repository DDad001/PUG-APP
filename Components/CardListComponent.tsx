import React, { FC, useEffect, useContext } from 'react';
import { FlatList, Image, StyleSheet, Text, View, TextInput, TouchableHighlight, Pressable, SafeAreaView } from 'react-native';
import { Box, CheckIcon, FormControl, Select } from "native-base";
import { useState } from 'react';
import man from '../assets/man.jpg';
import { MaterialIcons } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import AppLoading from 'expo-app-loading';
// import { Divider, Menu, Provider, Button } from 'react-native-paper';
// import SelectDropdown from 'react-native-select-dropdown'
// import { IndexPath, Layout, Select, SelectItem } from '@ui-kitten/components';

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
} from '@expo-google-fonts/lato';

import {
  OpenSans_300Light,
  OpenSans_400Regular,
  OpenSans_500Medium,
  OpenSans_600SemiBold,
  OpenSans_700Bold,
  OpenSans_800ExtraBold,
  OpenSans_300Light_Italic,
  OpenSans_400Regular_Italic,
  OpenSans_500Medium_Italic,
  OpenSans_600SemiBold_Italic,
  OpenSans_700Bold_Italic,
  OpenSans_800ExtraBold_Italic,
} from '@expo-google-fonts/open-sans';

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
} from '@expo-google-fonts/roboto';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';
import { createOpenLink } from 'react-native-open-maps';
import UserContext from '../Context/UserContext';
import { GetEventItems, AddLikedEvent, DeleteLikedEvent, GetUserByUsername, GetUserById } from "../Services/DataService"
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
import { Item } from 'react-native-paper/lib/typescript/components/Drawer/Drawer';

interface CardProps {
  onProfilePress: Function,
  onEventDisplayPress: Function
}

type RootStackParamList = {
  Nav: undefined,
  event: { name: string },
  schedule: undefined,
  cardList: { name: string }
}


// type Props = NativeStackScreenProps<RootStackParamList, "cardList">;
// const navigation = useNavigation();

const EventItem = ({ event, id, nameOfEvent, EventHandler, ProfileHandler, addressOfEvent, dateOfEvent, timeOfEvent, sportOfEvent, userId, allEvents}: any) => {
  const [isLiked, setIsLiked] = useState(false);
  const { userItems, setEventItems, setNameContext } = useContext<any>(UserContext);

  useEffect(() => {
    getNames();
  }, []);


    const [name, setName] = useState<string>("")

    const getNames = async () => {
      let userData = await GetUserById(userId);
      setName(`${userData.firstName} ${userData.lastName}`)
    }
    
  const handleLiked = () => {
    setIsLiked(!isLiked)
    let liked = isLiked;
    if (!liked) {
      let addLike = {
        Id: 0,
        UserId: userItems.id,
        EventId: id,
        EventUnliked: false
      }
      AddLikedEvent(addLike)
    } else {
      DeleteLikedEvent(userItems.id, id)
    }

  }

  const handleSavedEvent = () => {
    setEventItems(event);
    setNameContext(name);
  }

  return (
    <View style={styles.card}>
      <View style={styles.cardContent}>
        <Pressable onPress={() => {
          handleSavedEvent();
          EventHandler();
        }}>
          <View style={{ flexDirection: 'row', flex: 1, }}>

            {
              sportOfEvent === "Basketball" ?
                <Image source={BasketballEvent} style={{ flex: 1, height: 90, width: 120, borderRadius: 8 }} />
                : sportOfEvent === "Soccer" ?
                  <Image source={soccer} style={{ flex: 1, height: 90, width: 120, borderRadius: 8 }} />
                  : sportOfEvent === "Badminton" ?
                    <Image source={badminton} style={{ flex: 1, height: 90, width: 120, borderRadius: 8 }} />
                    : sportOfEvent === "Baseball" ?
                      <Image source={baseball} style={{ flex: 1, height: 90, width: 120, borderRadius: 8 }} />
                      : sportOfEvent === "Cycling" ?
                        <Image source={biking1} style={{ flex: 1, height: 90, width: 120, borderRadius: 8 }} />
                        : sportOfEvent === "Hockey" ?
                          <Image source={hockey} style={{ flex: 1, height: 90, width: 120, borderRadius: 8 }} />
                          : sportOfEvent === "Disc golf" ?
                            <Image source={discGolf1} style={{ flex: 1, height: 90, width: 120, borderRadius: 8 }} />
                            : sportOfEvent === "Fishing" ?
                              <Image source={fishing} style={{ flex: 1, height: 90, width: 120, borderRadius: 8 }} />
                              : sportOfEvent === "Football" ?
                                <Image source={football} style={{ flex: 1, height: 90, width: 120, borderRadius: 8 }} />
                                : sportOfEvent === "Frisbee" ?
                                  <Image source={frisbee} style={{ flex: 1, height: 90, width: 120, borderRadius: 8 }} />
                                  : sportOfEvent === "Golf" ?
                                    <Image source={golf} style={{ flex: 1, height: 90, width: 120, borderRadius: 8 }} />
                                    : sportOfEvent === "Handball" ?
                                      <Image source={handball} style={{ flex: 1, height: 90, width: 120, borderRadius: 8 }} />
                                      : sportOfEvent === "Hiking" ?
                                        <Image source={hiking} style={{ flex: 1, height: 90, width: 120, borderRadius: 8 }} />
                                        : sportOfEvent === "Cricket" ?
                                          <Image source={cricketevent} style={{ flex: 1, height: 90, width: 120, borderRadius: 8 }} />
                                          : sportOfEvent === "Rugby" ?
                                            <Image source={rugby} style={{ flex: 1, height: 90, width: 120, borderRadius: 8 }} />
                                            : sportOfEvent === "Pickleball" ?
                                              <Image source={pickleball} style={{ flex: 1, height: 90, width: 120, borderRadius: 8 }} />
                                              : sportOfEvent === "Running" ?
                                                <Image source={running} style={{ flex: 1, height: 90, width: 120, borderRadius: 8 }} />
                                                : sportOfEvent === "Softball" ?
                                                  <Image source={softball} style={{ flex: 1, height: 90, width: 120, borderRadius: 8 }} />
                                                  : sportOfEvent === "Spikeball" ?
                                                    <Image source={spikeball} style={{ flex: 1, height: 90, width: 120, borderRadius: 8 }} />
                                                    : sportOfEvent === "Tennis" ?
                                                      <Image source={tennis} style={{ flex: 1, height: 90, width: 120, borderRadius: 8 }} />
                                                      : sportOfEvent === "Lacrosse" ?
                                                        <Image source={lacrosse} style={{ flex: 1, height: 90, width: 120, borderRadius: 8 }} />
                                                        : sportOfEvent === "Volleyball" ?
                                                          <Image source={volleyballevent} style={{ flex: 1, height: 90, width: 120, borderRadius: 8 }} />
                                                          :
                                                          <Image source={pugEvent} style={{ flex: 1, height: 90, width: 120, borderRadius: 8 }} />
            }
            <View>
              <View style={{ flex: 1, flexDirection: 'row', }}>

                <Text style={{ marginLeft: 20, fontSize: 12, marginTop: 10, fontFamily: "Lato_700Bold" }}>{nameOfEvent}</Text>

                <Pressable onPress={createOpenLink({ provider: 'google', end: addressOfEvent })}>
                  <MaterialIcons name="location-on" size={15} color="white" style={{ backgroundColor: '#0A326D', borderRadius: 3, overflow: 'hidden', marginTop: 5, marginLeft: 8, padding: 7 }} />
                </Pressable>

                <Pressable onPress={handleLiked}>
                  {
                    isLiked ? <FontAwesome name="heart" size={13} color="red" style={{ backgroundColor: '#0A326D', borderRadius: 3, overflow: 'hidden', padding: 8, marginLeft: 9, marginTop: 5, }} />
                      : <FontAwesome name="heart-o" size={13} color="white" style={{ backgroundColor: '#0A326D', borderRadius: 3, overflow: 'hidden', padding: 8, marginLeft: 9, marginTop: 5, }} />
                  }

                </Pressable>

              </View>
              <View style={{ flexDirection: 'column', }}>
                <View style={{ flexDirection: 'row', }}>
                  <Text style={{ fontSize: 11, marginLeft: 21, marginBottom: 10, fontFamily: "Lato_400Regular" }}>{addressOfEvent}</Text>
                  <MaterialCommunityIcons name="calendar-month" size={18} color="#0A326D" style={{ marginTop: 10, marginLeft: 43 }} />
                  <Text style={{ fontSize: 10, marginTop: 12, marginLeft: 4, fontFamily: "Roboto_400Regular" }}>{dateOfEvent}</Text>
                </View>

                <View style={{ flexDirection: 'row' }}>

                  <Pressable onPress={ProfileHandler}>
                    <View style={{ flexDirection: 'row' }}>
                      <Image source={man} style={{ height: 22, width: 22, borderRadius: 10, marginLeft: 22 }} />
                      <Text style={{ marginLeft: 10, marginTop: 7, fontSize: 10, fontFamily: "Roboto_500Medium" }}>            
                         {       
                          name
                         }
                      </Text>
                    </View>
                  </Pressable>

                  <MaterialCommunityIcons name="clock-time-three-outline" size={18} color="#0A326D" style={{ marginLeft: 48, marginTop: 4, }} />
                  <Text style={{ fontSize: 10, marginTop: 7, marginLeft: 4, fontFamily: "Roboto_400Regular" }}>{timeOfEvent}</Text>
                </View>

              </View>
            </View>
          </View>
        </Pressable>

      </View>
    </View>
  )
};

const CardListComponent: FC<CardProps> = (props) => {

  
  const [allEvents, setAllEvents] = useState<any>([]);

  
  useEffect(() => {
    fetchEvents();
  }, []);
  
  const fetchEvents = async () => {
    let displayEvents = await GetEventItems();
    // console.log(displayEvents);
    setAllEvents(displayEvents);
  }
  // const [dataFromInput, setDataFromInput] = useState(allEvents);

  const ProfileHandler = () => {
    props.onProfilePress()
  }
  
  const EventHandler = () => {
    props.onEventDisplayPress()
  }
  // console.log("allevent", typeof allEvents);

  const renderItem = ({ item }: any) => {
    return (
    <EventItem event={item}
      id={item.id}
      nameOfEvent={item.nameOfEvent}
      addressOfEvent={item.addressOfEvent}
      dateOfEvent={item.dateOfEvent}
      timeOfEvent={item.timeOfEvent}
      sportOfEvent={item.sportOfEvent}
      userId={item.userId}
      allEvents={allEvents}
      ProfileHandler={ProfileHandler}
      EventHandler={EventHandler}
    />
    )
};


  const [visible, setVisible] = React.useState(false);
  const openMenu = () => setVisible(true);

  const closeMenu = () => setVisible(false);
  const [input, setInput] = useState("")


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
    OpenSans_400Regular,
    Roboto_700Bold,
    Roboto_500Medium,
    Roboto_400Regular,
  });


  if (!fontsLoaded) {
    return <AppLoading />;
  }

  // console.log(input)

  // let allNames: any [] = []
  // allEvents.map(async (event:any, i:number ) =>{
  //   console.log(event.userId)
  //   let userData = await GetUserById(event.userId);
  //   allNames.push(`${userData.firstName}, ${userData.lastName}`)
  //   console.log(allNames)
  // })
  // const searchCity = (input) => {
  //   let data = data
  //   let searchData = data.filter((item) =>{
  //     return item.name.toLowerCase().includes(input.toLowerCase())
  //   })
  //   setNewSearch(searchData)
  // }


    // let data = dataFromInput;
    // console.log(data);
    let searchData = allEvents.filter((item:any) => {
      return item.cityOfEvent.toLowerCase().includes(input.toLowerCase());
    });

  return (
    <>
      <View style={{ flexDirection: 'row' }}>
        <View style={{ flex: 1 }}>
          <TextInput style={styles.input} onChangeText={(setInput)}
            onSubmitEditing={() => {
              // alert(`Your message is: ${input}`);
            }}
            placeholder="Search for an event..."
            placeholderTextColor={'#959494'}
          />
        </View>
        <TouchableHighlight style={{ marginRight: 10 }} >
          <View style={{ backgroundColor: '#0A326D', width: 54, height: 45, borderBottomRightRadius: 7, borderTopRightRadius: 7, }}>
            <FontAwesome name="search" size={15} color="white" style={{ marginTop: 14, marginLeft: 17 }} />
          </View>
        </TouchableHighlight>
      </View>

      <View style={{ flex: 0, alignItems: "flex-end", justifyContent: "center", marginTop: 20, marginBottom: 5 }}>
        <View style={{ marginRight: 10 }}>
          <Box
            maxW="155"
            borderRadius={8}
            style={{
              backgroundColor: "#E8F1FF",
              shadowColor: "black",
              shadowOffset: { width: -2, height: 4 },
              shadowOpacity: 0.5,
              shadowRadius: 3,
            }}
          >
            <Select
              width="150"
              height="10"
              accessibilityLabel="Choose the sport type for this event"
              placeholderTextColor={"#0A326D"}
              placeholder="Filters"
              _selectedItem={{
                bg: "black.300",
                endIcon: <CheckIcon size={5} color="#3B567C" />,
              }}
              borderWidth="0"
              fontFamily={"Roboto_500Medium"}
              fontSize={15}
              color={"#0A326D"}
            >
              <Select.Item label="Basketball" value="ux" />
              <Select.Item label="Soccer" value="web" />
              <Select.Item label="Football" value="cross" />
              <Select.Item label="Tennis" value="ui" />
              <Select.Item label="Handball" value="backend" />
            </Select>
            {/* <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>
            Please make a selection!
        </FormControl.ErrorMessage> */}
          </Box>
        </View>
      </View>

      {/* make into fliatlist when time to map or later */}
      <SafeAreaView style={styles.container}>
        <FlatList
          data={searchData}
          renderItem={renderItem}
          keyExtractor={item => item.id}
        />
      </SafeAreaView>
    </>
  )
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginBottom:62
  },
  card: {
    borderRadius: 8,
    elevation: 10,
    backgroundColor: '#fff',
    shadowOffset: { width: 1, height: 1 },
    shadowColor: '#333',
    shadowOpacity: 0.3,
    shadowRadius: 2,
    marginHorizontal: 8,
    marginTop: 17,
  },
  cardContent: {
    marginHorizontal: 8,
    marginVertical: 8,
  },
  input: {
    marginLeft: 10,
    height: 45,
    backgroundColor: 'white',
    borderColor: "white",
    borderWidth: 1,
    borderTopStartRadius: 7,
    borderBottomStartRadius: 7,
    padding: 10,
    fontFamily: "OpenSans_400Regular",
    fontSize: 12
  }

});

export default CardListComponent;