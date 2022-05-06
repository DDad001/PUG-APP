import React, { FC, useState, useEffect, useContext } from "react";
import { View, Text, StyleSheet, ImageBackground, Pressable, Image, SafeAreaView, FlatList } from "react-native";
import tennis from "../assets/TennisRacket.png";
import { MaterialIcons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { FontAwesome, FontAwesome5 } from '@expo/vector-icons';
import man from '../assets/man.jpg';

import AppLoading from "expo-app-loading";
import { GetLikedEventsByUserId, GetEventItemById, GetIsLiked, AddLikedEvent, DeleteLikedEvent } from "../Services/DataService";
import UserContext  from '../Context/UserContext';

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

interface LikedEventProps{
  eventName: string,
  dateOfEvent: string,
  addressOfEvent: string,
  timeOfEvent: string,
  nameOfTheEvent: string,
}


type RootStackParamList ={
  Nav: undefined,
  event:{name:string},
  profile:{name:string},
  PastEvents:undefined,
  LikedEvents:undefined
}



// const LikedEventsScreen: FC<Props> = ({navigation, route}) => {
//   const { userItems } = useContext<any>(UserContext);
  
//   const [displayEvents, setDisplayEvents] = useState<any>([]);
  

//   useEffect(() => {
//     getLikedEventsByUser();
    
//   }, []);

//   const getLikedEventsByUser = async () => {
//     let likedEvents: any[] = [];
//     let likedEventsIds: number[] = [];
//     let eventsArr: any[] = [];
//     let result: any;

//     likedEvents = await GetLikedEventsByUserId(userItems.id);
    
//     likedEvents.map(eventObj =>{
//       likedEventsIds.push(eventObj.eventId)
//     }) 

//      likedEventsIds.map(async eventId => {
//       let event: object = await GetEventItemById(eventId);
//       eventsArr.push(event);
      
//     })

//     setTimeout(() => {
//       setDisplayEvents(eventsArr)
//     }, 1000)
    
//     //setDisplayEvents(result);

    
//   }
  


//   const handlePastEvents = () => {
//     navigation.navigate('PastEvents')
//   }
//   const handleLikedEvents = () => {
//     navigation.navigate('LikedEvents')
//   }

//   let [fontsLoaded, error] = useFonts({
//     Lato_100Thin,
//     Lato_100Thin_Italic,
//     Lato_300Light,
//     Lato_300Light_Italic,
//     Lato_400Regular,
//     Lato_400Regular_Italic,
//     Lato_700Bold,
//     Lato_700Bold_Italic,
//     Lato_900Black,
//     Lato_900Black_Italic,
//     Roboto_100Thin,
//     Roboto_100Thin_Italic,
//     Roboto_300Light,
//     Roboto_300Light_Italic,
//     Roboto_400Regular,
//     Roboto_400Regular_Italic,
//     Roboto_500Medium,
//     Roboto_500Medium_Italic,
//     Roboto_700Bold,
//     Roboto_700Bold_Italic,
//     Roboto_900Black,
//     Roboto_900Black_Italic,
//   });

//   if (!fontsLoaded) {
//     return <AppLoading />;
//   }

//   return (
//     <>
//     <View style={styles.container}>
//       <ImageBackground source={tennis} resizeMode="cover" style={{ height: "100%", width: "100%", backgroundColor: "#0A326D" }}>
//       <View style={{flexDirection:'row', justifyContent:'center'}}>
//               <Pressable onPress={() => navigation.navigate('Nav')}>
//                 <View style={{backgroundColor:'white', height:35,width:110, marginTop:50, borderTopLeftRadius:10, borderBottomLeftRadius:10,}}>
//                     <Text style={{marginLeft:20, marginTop:10, fontFamily: "Lato_700Bold",color: "rgba(10, 50, 109, 1)"}}>My Profile</Text>
//                 </View>
//               </Pressable>
//                 <Pressable onPress={handlePastEvents}>    
//                 <View style={{backgroundColor:'white', height:35,width:110, marginTop:50}}>
//                     <Text style={{marginLeft:12, marginTop:10, fontFamily: "Lato_700Bold",color: "rgba(10, 50, 109, 1)"}}>Past events</Text>
//                 </View>
//                 </Pressable>
//                 <Pressable onPress={handleLikedEvents}>
//                 <View style={{backgroundColor:'white', height:35,width:110, marginTop:50,borderTopRightRadius:10, borderBottomRightRadius:10}}>
//                     <Text style={{marginLeft:10, marginTop:10, fontFamily: "Lato_700Bold",color: "rgba(10, 50, 109, 1)"}}>Liked events</Text>
//                 </View>
//                 </Pressable>
//              </View>

//                  <Text style={{marginLeft:22, marginTop:50,color:'white', fontSize:35, fontFamily: "Lato_700Bold", fontWeight: "bold",}}>Liked Events</Text>
//                  <ScrollView>
//                 {
//                   displayEvents.map((likedEvent: any, idx: number) => {
//                     return (
                    
//                                  <View style={styles.card} key={idx}>
//                                   <View style={styles.cardContent}>
//                                   <View style={{ flexDirection: 'row', }}>
//                                   <Image source={man} style={{ height: 100, width: 145, borderRadius: 8 }} />
//                                   <View style={{marginLeft:35}}>
//                                     <View style={{ flexDirection: 'row' }}>
//                                       <MaterialCommunityIcons name="calendar-month" size={23} color="rgba(10, 50, 109, 1)" style={{ marginTop: 6, marginLeft: 14}} />
//                                         <Text style={{ marginTop: 9, marginLeft: 5, fontFamily: "Roboto_400Regular", fontSize: 16 }}>{likedEvent.dateOfEvent}</Text>
//                                     </View>
//                                     <View style={{ flexDirection: 'column', }}>
//                                       <View style={{ flexDirection: 'row', }}>
//                                       <MaterialCommunityIcons name="clock-time-three-outline" size={23} color="rgba(10, 50, 109, 1)" style={{ marginTop:5, marginLeft: 14 }} />
//                                         <Text style={{ marginTop: 8, marginLeft: 5, fontFamily: "Roboto_400Regular", fontSize: 16  }}>{likedEvent.timeOfEvent}</Text>
//                                       </View>

//                                       <View style={{ flexDirection: 'row' }}>
//                                         <Text style={{fontSize:12, marginLeft:20, marginTop:8, fontFamily: "Lato_400Regular"}}>{likedEvent.addressOfEvent}</Text>
//                                       </View>


//                                         </View>
//                                       </View>
//                                     </View>
//                                       <Text style={{marginLeft:4, marginTop:5, fontFamily: "Lato_700Bold", fontSize:14}}>{likedEvent.nameOfEvent}</Text>


//                                       <View style={{flexDirection:'row', justifyContent:'flex-end'}}>
//                                       <MaterialIcons name="location-on" size={16} color="white" style={{ backgroundColor: '#0A326D', borderRadius: 3, overflow:'hidden', marginLeft: 12, padding:5  }} />
//                                       <FontAwesome5 name="heart" size={13} color="white" style={{ backgroundColor: '#0A326D', borderRadius: 3, overflow:'hidden', padding:6.5,marginLeft:9 }} />
//                                       </View>

//                                   </View>
//                                 </View>
                    
//                     )
//                   })
//                 }
//         </ScrollView>
//       </ImageBackground>
//     </View> 
//     </>
//   );
// };


const LikedEventItems = ({ id, dateOfEvent,timeOfEvent,addressOfEvent,nameOfEvent, getLikedEventsByUser, navigation }: any) => {
  const { userItems, setUpdateScreen } = useContext<any>(UserContext);
  const [isLiked, setIsLiked] = useState<boolean>(true);

  const handleLiked = async () => {
    await DeleteLikedEvent(userItems.id, id)
    setIsLiked(!isLiked);
    
    await getLikedEventsByUser();
    setUpdateScreen(true);
    
  }

  return(
        <>
                    
                                 <View style={styles.card}>
                                  <View style={styles.cardContent}>
                                  <View style={{ flexDirection: 'row', }}>
                                  <Image source={man} style={{ height: 100, width: 145, borderRadius: 8 }} />
                                  <View style={{marginLeft:35}}>
                                    <View style={{ flexDirection: 'row' }}>
                                      <MaterialCommunityIcons name="calendar-month" size={23} color="rgba(10, 50, 109, 1)" style={{ marginTop: 6, marginLeft: 14}} />
                                        <Text style={{ marginTop: 9, marginLeft: 5, fontFamily: "Roboto_400Regular", fontSize: 16 }}>{dateOfEvent}</Text>
                                    </View>
                                    <View style={{ flexDirection: 'column', }}>
                                      <View style={{ flexDirection: 'row', }}>
                                      <MaterialCommunityIcons name="clock-time-three-outline" size={23} color="rgba(10, 50, 109, 1)" style={{ marginTop:5, marginLeft: 14 }} />
                                        <Text style={{ marginTop: 8, marginLeft: 5, fontFamily: "Roboto_400Regular", fontSize: 16  }}>{timeOfEvent}</Text>
                                      </View>

                                      <View style={{ flexDirection: 'row' }}>
                                        <Text style={{fontSize:12, marginLeft:20, marginTop:8, fontFamily: "Lato_400Regular"}}>{addressOfEvent}</Text>
                                      </View>


                                        </View>
                                      </View>
                                    </View>
                                      <Text style={{marginLeft:4, marginTop:5, fontFamily: "Lato_700Bold", fontSize:14}}>{nameOfEvent}</Text>


                                      <View style={{flexDirection:'row', justifyContent:'flex-end'}}>
                                      <MaterialIcons name="location-on" size={16} color="white" style={{ backgroundColor: '#0A326D', borderRadius: 3, overflow:'hidden', marginLeft: 12, padding:5  }} />
                                      <Pressable onPress={handleLiked} >
                                        {
                                          isLiked ?  <FontAwesome name="heart" size={13} color="red" style={{ backgroundColor: '#0A326D', borderRadius: 3, overflow:'hidden', padding:6.5,marginLeft:9 }} />
                                          :  <FontAwesome name="heart-o" size={13} color="white" style={{ backgroundColor: '#0A326D', borderRadius: 3, overflow:'hidden', padding:6.5,marginLeft:9 }} />
                                        }
                                       
                                      </Pressable>
                                      </View>

                                  </View>
                                </View>

    </>
  )
 };


 type Props = NativeStackScreenProps<RootStackParamList, "profile">;
 
 const LikedEventsScreen: FC<Props>= ({navigation,route}) => {
   const { userItems } = useContext<any>(UserContext);
   const [displayEvents, setDisplayEvents] = useState<any>([]);
   const [isLiked, setIsLiked] = useState(true);
  

  useEffect(() => {
    getLikedEventsByUser();
    
  }, []);

  const getLikedEventsByUser = async () => {
    let likedEvents: any[] = [];
    let likedEventsIds: number[] = [];
    let eventsArr: any[] = [];
    let result: any;

    likedEvents = await GetLikedEventsByUserId(userItems.id);
    
    likedEvents.map(eventObj =>{
      likedEventsIds.push(eventObj.eventId)
    }) 

     likedEventsIds.map(async eventId => {
      let event: object = await GetEventItemById(eventId);
      eventsArr.push(event);
      
    })

    setTimeout(() => {
      setDisplayEvents(eventsArr)
    }, 1000)
    
    //setDisplayEvents(result);

    
  }


  const handleLiked = (eventId: number) => {
    setIsLiked(!isLiked)

    
     DeleteLikedEvent(userItems.id, eventId)
 
    setTimeout(() => {
      getLikedEventsByUser();
    }, 1000)
    
  }

  // const checkIfLiked = async (eventId: number) => {
  //   let liked = await GetIsLiked(userItems.id, eventId);
    
  //   setIsLiked(liked);
  //   //console.log(liked);
  // }
  
  
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
      <View style={{flexDirection:'row', justifyContent:'center'}}>
              <Pressable onPress={() => navigation.navigate('Nav')}>
                <View style={{backgroundColor:'white', height:35,width:110, marginTop:50, borderTopLeftRadius:10, borderBottomLeftRadius:10,}}>
                    <Text style={{marginLeft:20, marginTop:10, fontFamily: "Lato_700Bold",color: "rgba(10, 50, 109, 1)"}}>My Profile</Text>
                </View>
              </Pressable>
                <Pressable onPress={handlePastEvents}>    
                <View style={{backgroundColor:'white', height:35,width:110, marginTop:50}}>
                    <Text style={{marginLeft:12, marginTop:10, fontFamily: "Lato_700Bold",color: "rgba(10, 50, 109, 1)"}}>Past events</Text>
                </View>
                </Pressable>
                <Pressable onPress={handleLikedEvents}>
                <View style={{backgroundColor:'white', height:35,width:110, marginTop:50,borderTopRightRadius:10, borderBottomRightRadius:10}}>
                    <Text style={{marginLeft:10, marginTop:10, fontFamily: "Lato_700Bold",color: "rgba(10, 50, 109, 1)"}}>Liked events</Text>
                </View>
                </Pressable>
             </View>

                 <Text style={{marginLeft:22, marginTop:50,color:'white', fontSize:35, fontFamily: "Lato_700Bold", fontWeight: "bold",}}>Liked Events</Text>

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
    container:{
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
      marginHorizontal:20,
      marginVertical: 15,
      marginLeft:18,
      height:180,
      width:345
    },
    cardContent: {
      marginHorizontal: 8,
      marginVertical: 8,
    },
});


export default LikedEventsScreen;