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
import { GetEventItems, AddLikedEvent, DeleteLikedEvent, GetUserByUsername, GetUserById, GetIsLiked } from "../Services/DataService"
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
  const { userItems, setEventItems, setNameContext, setViewUserProfile, updateScreen, setUpdateScreen, setUpdateProfileOther, setUpdateProfileScreen} = useContext<any>(UserContext);
 

  useEffect(() => {
    getNames();
    checkIfLiked();
    //console.log("Update")
    setUpdateScreen(false);
  }, [updateScreen]);


    const [name, setName] = useState<string>("")

    const getNames = async () => {
      let userData = await GetUserById(userId);
      setName(`${userData.firstName} ${userData.lastName}`)
      setViewUserProfile(userData);
    }

    const checkIfLiked = async () => {
      let liked = await GetIsLiked(userItems.id, event.id);
      
      setIsLiked(liked);
      //console.log(liked);
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
    setUpdateProfileScreen(true);
  }

  const handleSavedEvent = () => {
    setEventItems(event);
    setNameContext(name);
  }

  const handleSaveUser = async () => {
    
    let userData = await GetUserById(userId);
    setViewUserProfile(userData);
    setNameContext(name)
    setUpdateProfileOther(true);
  }

 const longAddresses = (address: string) => {
  let editedAddress: string = "";
  let ditto: string = "...";
  if(address.length > 40){
    for(let i = 0; i<40; i++){
      editedAddress += address[i];
    }
  }
  editedAddress += ditto;
  return editedAddress;
 }

  return (
    <View style={styles.card}>
      <View style={styles.cardContent}>
        <Pressable onPress={() => {
          handleSavedEvent();
          EventHandler();
        }}>
          <View style={{ flexDirection: 'row', flex: 1, }}>
            <View>
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
            </View>
            <View style={{ flex:1 }}>
              <View style={{flex:0.4, flexDirection: 'row' }}>
                <View style={{flex:1, width: 155, marginLeft: 15, justifyContent:'center'}}>
                  <Text style={{ marginLeft: 0, fontSize: 12, fontFamily: "Lato_700Bold"}}>{nameOfEvent}</Text>
                </View>

            {/* Icon section here below!  */}
            <View style={{flex:0.6, flexDirection: "row", alignItems: 'center', justifyContent: 'space-around' }}>
                <Pressable onPress={createOpenLink({ provider: 'google', end: addressOfEvent })}>
                  <MaterialIcons name="location-on" size={15} color="white" style={{ backgroundColor: '#0A326D', borderRadius: 3, overflow: 'hidden', padding: 7 }} />
                </Pressable>

                <Pressable onPress={handleLiked}>
                  {
                    isLiked ? <FontAwesome name="heart" size={13} color="red" style={{ backgroundColor: '#0A326D', borderRadius: 3, overflow: 'hidden', padding: 8 }} />
                      : <FontAwesome name="heart-o" size={13} color="white" style={{ backgroundColor: '#0A326D', borderRadius: 3, overflow: 'hidden', padding: 8 }} />
                  }

                </Pressable>
            </View>

              </View>
              <View style={{flex:1, flexDirection: 'column', }}>
                <View style={{flex:1, flexDirection: 'row' }}>
                  <View style={{flex: 1, justifyContent: 'center'}}>
                    <Text style={{ flexWrap: 'wrap', flexShrink: 1, fontSize: 11, marginLeft: 15, paddingRight: 5, fontFamily: "Lato_400Regular", borderColor: "white", justifyContent: "center" }}>
                    { 
                     addressOfEvent.length < 40 ? addressOfEvent : longAddresses(addressOfEvent)
                    }
                    </Text>
                  </View>
                  <View style={{flex:0.5, flexDirection: "row", justifyContent: 'flex-start'}}>
                    <MaterialCommunityIcons name="calendar-month" size={18} color="#0A326D" style={{ marginTop: 10}} />
                    <Text style={{ fontSize: 10, marginTop: 12, marginLeft: 4, fontFamily: "Roboto_400Regular" }}>{dateOfEvent}</Text>
                  </View>
                </View>

                <View style={{ flex:1, flexDirection: 'row' }}>
                  {/* fiddle with the flex */}
                  <View style={{flex: 0.9, flexDirection: "row", justifyContent: "flex-start"  }}>
                    <Pressable onPress={() => {
                      ProfileHandler();
                      handleSaveUser();
                      }}>
                      <View style={{flex: 1, flexDirection: 'row', }}>
                        <Image source={man} style={{ height: 22, width: 22, borderRadius: 10, marginLeft: 15 }} />
                        <Text style={{ marginLeft: 10, marginTop: 7, fontSize: 10, fontFamily: "Roboto_500Medium" }}>            
                          {       
                            name
                          }
                        </Text>
                      </View>
                    </Pressable>
                  </View>
                    {/* Fiddle with the flex */}
                  <View style={{flex:0.45,flexDirection: "row" }}>
                    <MaterialCommunityIcons name="clock-time-three-outline" size={18} color="#0A326D" style={{ marginLeft: 0, marginTop: 4, }} />
                    <Text style={{ fontSize: 10, marginTop: 7, marginLeft: 4, fontFamily: "Roboto_400Regular" }}>{timeOfEvent}</Text>
                  </View>

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
  const { updateScreen, setUpdateScreen } = useContext<any>(UserContext);
  
  const [allEvents, setAllEvents] = useState<any>([]);

  
  useEffect(() => {
    fetchEvents();
    setUpdateScreen(false);
  }, [updateScreen]);
  
  const fetchEvents = async () => {
    let displayEvents = await GetEventItems();
    let presentEvents: any;
    presentEvents = displayEvents.filter((event: any) => isItAPresentDay(event['dateOfEvent']) == true);
    setAllEvents(presentEvents);
  }

  function isItAPresentDay(date: string){
    let today: any = new Date();
    const yyyy = today.getFullYear();
    let mm = today.getMonth() + 1; 
    let dd = today.getDate();

    if (dd < 10) dd = '0' + dd;

    today = mm + '/' + dd + '/' + yyyy;
    return date == today;
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
  const [selectSport, setSelectSport] = useState("")


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

    //this query is done when
    let searchData: any;
    if(selectSport != "No Filters"){
      searchData = allEvents.filter((item:any) => {
        return(
          item.cityOfEvent.toLowerCase().includes(input.toLowerCase()) && item.sportOfEvent.toLowerCase().includes(selectSport.toLowerCase())
        )
      });
    }else{
      searchData = allEvents.filter((item:any) => {
        return(
          item.cityOfEvent.toLowerCase().includes(input.toLowerCase())
        )
      });
    }

  return (
    <>
      <View style={{ flexDirection: 'row' }}>
        <View style={{ flex: 1 }}>
          <TextInput style={styles.input} onChangeText={(setInput)}
            onSubmitEditing={() => {
              // alert(`Your message is: ${input}`);
            }}
            placeholder="Search by city..."
            placeholderTextColor={'#959494'}
          />
        </View>
        <TouchableHighlight style={{ marginRight: 10 }} >
          <View style={{ backgroundColor: '#0A326D', width: 54, height: 45, borderBottomRightRadius: 7, borderTopRightRadius: 7 }}>
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
              placeholder="Filter Sports"
              onValueChange={(text) => setSelectSport(text)}
              _selectedItem={{
                bg: "black.300",
                endIcon: <CheckIcon size={5} color="#3B567C" />,
              }}
              borderWidth="0"
              fontFamily={"Roboto_500Medium"}
              fontSize={15}
              color={"#0A326D"}
            >
              
                <Select.Item label="All Events" value="No Filters" />
                <Select.Item label="Badminton" value="Badminton" />
                <Select.Item label="Baseball" value="Baseball" />
                <Select.Item label="Basketball" value="Basketball" />
                <Select.Item label="Cricket" value="Cricket" />
                <Select.Item label="Cycling" value="Cycling" />
                <Select.Item label="Disc golf" value="Disc golf" />
                <Select.Item label="Fishing" value="Fishing" />
                <Select.Item label="Football" value="Football" />
                <Select.Item label="Frisbee" value="Frisbee" />
                <Select.Item label="Golf" value="Golf" />
                <Select.Item label="Handball" value="Handball" />
                <Select.Item label="Hiking" value="Handball" />
                <Select.Item label="Hockey" value="Hockey" />
                <Select.Item label="Lacrosse" value="Lacrosse" />
                <Select.Item label="Pickleball" value="Pickleball" />
                <Select.Item label="Rugby" value="Rugby" />
                <Select.Item label="Running" value="Running" />
                <Select.Item label="Soccer" value="Soccer" />
                <Select.Item label="Softball" value="Softball" />
                <Select.Item label="Spikeball" value="Spikeball" />
                <Select.Item label="Tennis" value="Tennis" />
                <Select.Item label="Volleyball" value="Volleyball" />
                <Select.Item label="Other" value="Other" />
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
    borderTopLeftRadius: 7,
    borderBottomLeftRadius: 7,
    padding: 10,
    fontFamily: "OpenSans_400Regular",
    fontSize: 12
  }

});

export default CardListComponent;