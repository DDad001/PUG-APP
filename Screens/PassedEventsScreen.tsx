import React, { FC, useState, useContext, useEffect } from "react";
import { View, Text, StyleSheet, ImageBackground, Pressable, Image, FlatList, SafeAreaView } from "react-native";
import tennis from "../assets/TennisRacket.png";
import { MaterialIcons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import man from '../assets/man.jpg';
import UserContext  from '../Context/UserContext';
import { GetItemsByUserId, DeleteEventItem } from "../Services/DataService"

import AppLoading from "expo-app-loading";

// Import fonts
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
import { ScrollView } from "native-base";

interface EventsProps{ 
  handlePastEvents: Function,
  handleLikedEvents: Function
}


type RootStackParamList ={
  Nav: undefined,
  event:{name:string},
  profile:{name:string},
  PastEvents:undefined,
  LikedEvents:undefined
}

type Props = NativeStackScreenProps<RootStackParamList, "PastEvents">;

const EventItem = ({id, nameOfEvent, EventHandler, ProfileHandler, addressOfEvent, dateOfEvent, timeOfEvent, getAllEvents} :any) => {

    const { userItems } = useContext<any>(UserContext);

    //set up deleting events
   const handleRemoveEvent = (id: any) => {
    DeleteEventItem(id);

    setTimeout(() => {
      getAllEvents();
    }, 1000)
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
            <View style={{ flex: 0, flexDirection: 'row' }}>
              {/* You might want to experiment with the flexes */}
            <Image source={man} style={{flex:1, height: 100, width: 145, borderRadius: 8 }} />
             <View style={{flex:1 ,marginLeft:35}}>
              <View style={{ flexDirection: 'row' }}>
                <MaterialCommunityIcons name="calendar-month" size={23} color="rgba(10, 50, 109, 1)" style={{ marginTop: 6, marginLeft: 14}} />
                  <Text style={{ marginTop: 9, marginLeft: 5, fontFamily: "Roboto_400Regular", fontSize: 16 }}>{dateOfEvent}</Text>
              </View>
              <View style={{ flexDirection: 'column', }}>
                <View style={{ flexDirection: 'row', }}>
                <MaterialCommunityIcons name="clock-time-three-outline" size={23} color="rgba(10, 50, 109, 1)" style={{ marginTop:5, marginLeft: 14 }} />
                  <Text style={{ marginTop: 8, marginLeft: 5, fontFamily: "Roboto_400Regular", fontSize: 16  }}>{timeOfEvent}</Text>
                </View>
                {/* If the valid address is over a certain character limit then edit it */}
                {/* Character limit 75 */}
                <View style={{ flexDirection: 'row', width: 155 }}>
                   <Text style={{fontSize:12, marginLeft:20, marginTop:8, fontFamily: "Lato_400Regular"}}>
                    {
                      addressOfEvent.length < 40 ? addressOfEvent : longAddresses(addressOfEvent)
                    }
                    </Text>
                </View>


                  </View>
                </View>
              </View>
              <View>
                <View style={{width:150}}>
                    <Text style={{marginLeft:4, marginTop:5, fontFamily: "Lato_700Bold", fontSize:14}}>{nameOfEvent}</Text>
                </View>
              </View>

                  {/* DO NOT DELETE THIS--- CODE FOR LIKED EVENTS PAGE */}

                  {/* CODE FOR PAST EVENTS PAGE */}

                <View style={{flexDirection:'row', justifyContent:'flex-end', marginTop: 10}}>
                  <Pressable onPress={() => handleRemoveEvent(id)}>
                    <View style={{ backgroundColor: '#0A326D', borderRadius: 2, overflow:'hidden', marginRight: 2, padding:6, width:110, height:30 }} >
                      <Text style={{marginLeft:10, color:'white', fontFamily:"Lato_400Regular"}}>Delete Event</Text>
                    </View>
                  </Pressable>
                </View>

        </View>
      </View>
    )
}


const PassedEventsScreen: FC<Props> = ({navigation, route}) => {
  useEffect(() => {
    getAllEvents();
  }, []);

  
  const renderItem = ({item} :any) => (
    <EventItem id ={item.id}
     nameOfEvent={item.nameOfEvent}
    addressOfEvent={item.addressOfEvent}
    dateOfEvent={item.dateOfEvent}
    timeOfEvent={item.timeOfEvent}
    getAllEvents = {getAllEvents}
    />
  );
 
  const { userItems } = useContext<any>(UserContext);

  const [name, setName] = useState('')
  const [tabColor, setTabColor] = useState('');
  const [display, setDisplay] = useState<any>([]);
  const [dummyEffect, setDummyEffect] = useState<boolean>(false);

  const getAllEvents = async () => {
    let userEvents: any[] = []; 
    let pastEvents: any[] = [];
    
    userEvents = await GetItemsByUserId(userItems.id);
    pastEvents = userEvents.filter(userEvent => isItAPastEvent(userEvent.dateOfEvent) == true);

    setDisplay(pastEvents);
  }

  //filter through the events based on whether they are active or not!
  function isItAPastEvent(date: string){
    let today: any = new Date();
    const yyyy = today.getFullYear();
    let mm = today.getMonth() + 1; 
    let dd = today.getDate();

    if (dd < 10) dd = '0' + dd;

    today = mm + '/' + dd + '/' + yyyy;
    return date < today;
  }
  
  const handlePastEvents = () => {
    setName('Past Events')
    navigation.navigate('PastEvents')
  }
  const handleLikedEvents = () => {
    setName('Liked Events')
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
      <View style={{flexDirection:'row', justifyContent:'center'}}>
              <Pressable onPress={() => navigation.navigate('Nav')}>
                <View style={{backgroundColor:'white', height:35,width:110, marginTop:50, borderTopLeftRadius:10, borderBottomLeftRadius:10,}}>
                    <Text style={{marginLeft:25, marginTop:10, fontFamily: "Lato_700Bold",color: "rgba(10, 50, 109, 1)"}}>My Profile</Text>
                </View>
              </Pressable>
                <Pressable onPress={handlePastEvents}>    
                <View style={{backgroundColor:'white', height:35,width:110, marginTop:50}}>
                    <Text style={{marginLeft:12, marginTop:10, fontFamily: "Lato_700Bold",color: "rgba(10, 50, 109, 1)"}}>Past events</Text>
                </View>
                </Pressable>
                <Pressable onPress={handleLikedEvents}>
                <View style={{backgroundColor:'white', height:35,width:110, marginTop:50,borderTopRightRadius:10, borderBottomRightRadius:10}}>
                    <Text style={{marginLeft:15, marginTop:10, fontFamily: "Lato_700Bold",color: "rgba(10, 50, 109, 1)"}}>Liked events</Text>
                </View>
                </Pressable>
             </View>

                 <Text style={{marginLeft:22, marginTop:50,color:'white', fontSize:35, fontFamily: "Lato_700Bold", fontWeight: "bold",}}>Past Events</Text>
            <SafeAreaView style={{flex: 1, marginBottom: 30}}>
            <FlatList
                data={display}
                renderItem={renderItem}
                keyExtractor={item => item.id}
              /> 
            </SafeAreaView>
             {/* <View style={styles.card}>
            <View style={styles.cardContent}>
            <View style={{ flexDirection: 'row', }}>
            <Image source={man} style={{ height: 100, width: 145, borderRadius: 8 }} />
             <View style={{marginLeft:35}}>
              <View style={{ flexDirection: 'row' }}>
                <MaterialCommunityIcons name="calendar-month" size={23} color="rgba(10, 50, 109, 1)" style={{ marginTop: 6, marginLeft: 14}} />
                  <Text style={{ marginTop: 9, marginLeft: 5, fontFamily: "Roboto_400Regular", fontSize: 16 }}>3/13/22</Text>
              </View>
              <View style={{ flexDirection: 'column', }}>
                <View style={{ flexDirection: 'row', }}>
                <MaterialCommunityIcons name="clock-time-three-outline" size={23} color="rgba(10, 50, 109, 1)" style={{ marginTop:5, marginLeft: 14 }} />
                  <Text style={{ marginTop: 8, marginLeft: 5, fontFamily: "Roboto_400Regular", fontSize: 16  }}>9:30 am</Text>
                </View>

                <View style={{ flexDirection: 'row' }}>
                   <Text style={{fontSize:12, marginLeft:20, marginTop:8, fontFamily: "Lato_400Regular"}}>6300 Whitelock Pkwy,{'\n'}Elk Grove, CA 95757</Text>
                </View>


                  </View>
                </View>
              </View> */}
                {/* <Text style={{marginLeft:4, marginTop:5, fontFamily: "Lato_700Bold", fontSize:14}}>Hal Bartholomew Sports Park {'\n'}Football Game </Text> */}

                  {/* DO NOT DELETE THIS--- CODE FOR LIKED EVENTS PAGE */}

                  {/* CODE FOR PAST EVENTS PAGE */}

                {/* <View style={{flexDirection:'row', justifyContent:'flex-end'}}>
                <View style={{ backgroundColor: '#0A326D', borderRadius: 2, overflow:'hidden', marginRight: 2, padding:5, width:110, height:27 }} >
                    <Text style={{marginLeft:10, color:'white', fontFamily:"Lato_400Regular"}}>Delete Event</Text>
                </View>
                </View>

        </View>
      </View> */}

      </ImageBackground>
    </View> 
    </>
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
      marginVertical: 15,
      marginLeft:18,
      height:180,
      width:345
    },
    cardContent: {
      marginHorizontal: 8,
      marginVertical: 8,
      flex:1,
    },
});


export default PassedEventsScreen;