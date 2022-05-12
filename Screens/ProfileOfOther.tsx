import { FC, useState, useContext, useEffect } from "react";
import { Image, ImageBackground, Pressable, ScrollView, StyleSheet, Text, View, FlatList, SafeAreaView } from "react-native";
import SoccerField from '../assets/SoccerField.png';
import man from '../assets/man.jpg';
import { MaterialIcons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import AppLoading from "expo-app-loading";
import { Ionicons } from '@expo/vector-icons';

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
import UserContext  from '../Context/UserContext';
import { GetUserByUsername, GetFollowersByUserId, GetUserById, GetFollowingByUserId, GetItemsByUserId, AddLikedEvent, DeleteLikedEvent, GetIsLiked, triggerNotificationHandler} from '../Services/DataService';
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

type RootStackParamList ={
  Nav: undefined,
  event:{name:string},
  profile:{name:string},
  PastEvents:undefined,
  LikedEvents:undefined,
  LookAtEvent:undefined,
  OtherPersonsFollowers:undefined,
  OtherPersonsFollowings:undefined,

}
type Props = NativeStackScreenProps<RootStackParamList, "profile">;

const EventItem = ({event, navigation, sportOfEvent} :any) => {
  const { userItems, setUpdateScreen, setUpdateEventScreen, viewUserProfile, setViewUserProfile, setUpdateProfileScreen } = useContext<any>(UserContext);
  const [isLiked, setIsLiked] = useState(false);

  useEffect(() => {
    checkIfLiked();
  }, [])

  const handleLiked = async () => {
    setIsLiked(!isLiked)
    let liked = isLiked;
    if(!liked){
      let addLike = {
        Id: 0,
        UserId: userItems.id,
        EventId: event.id,
        EventUnliked: false
      }
      triggerNotificationHandler(userItems);
      AddLikedEvent(addLike)
    }else{
      DeleteLikedEvent(userItems.id, event.id)
    }
    setUpdateScreen(true);
    setUpdateEventScreen(true);
    setUpdateProfileScreen(true);
  }

  const checkIfLiked = async () => {
    let liked = await GetIsLiked(userItems.id, event.id);
    
    setIsLiked(liked);
    //console.log(liked);
  }
 

  return (
    
    <Pressable onPress={() => navigation.navigate('LookAtEvent')}>
          <View style={styles.card}>
        <View style={styles.cardContent}>
            <View style={{ flexDirection: 'row', }}>
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
              <View style={{ flexDirection: 'row' }}>
                <MaterialCommunityIcons name="calendar-month" size={23} color="rgba(10, 50, 109, 1)" style={{ marginTop: 6, marginLeft: 14}} />
                  <Text style={{ marginTop: 9, marginLeft: 5, fontFamily: "Roboto_400Regular", fontSize: 13}}>{event.dateOfEvent}</Text>
              </View>
              <View style={{ flexDirection: 'column', }}>
                <View style={{ flexDirection: 'row', }}>
                <MaterialCommunityIcons name="clock-time-three-outline" size={23} color="rgba(10, 50, 109, 1)" style={{ marginTop:5, marginLeft: 14 }} />
                  <Text style={{ marginTop: 9, marginLeft: 5, fontFamily: "Roboto_400Regular", fontSize: 13 }}>{event.timeOfEvent}</Text>
                </View>

                <View style={{ flexDirection: 'row' }}>
                <MaterialIcons name="location-on" size={17} color="white" style={{ backgroundColor: '#0A326D', borderRadius: 3, overflow:'hidden', marginTop: 9, marginLeft:17, padding:3  }} />
                <Pressable onPress={handleLiked} >
                  {
                    isLiked ? <FontAwesome name="heart" size={16} color="red" style={{ backgroundColor: '#0A326D', borderRadius: 3, overflow:'hidden', marginTop: 9, marginLeft:9, padding:4 }} />
                    : <FontAwesome name="heart-o" size={16} color="white" style={{ backgroundColor: '#0A326D', borderRadius: 3, overflow:'hidden', marginTop: 9, marginLeft:9, padding:4 }} />
                  }
                   
                  </Pressable>
                </View>


              </View>
            </View>
          </View>

                <Text style={{marginTop:10, marginLeft: 4, fontFamily: "Lato_700Bold", fontSize:13 }}>{event.nameOfEvent} </Text>
                <Text style={{marginTop:5, marginLeft:4, fontSize:11, fontFamily: "Lato_400Regular"}}>{event.addressOfEvent},{'\n'}{event.cityOfEvent}, {event.stateOfEvent}</Text>
                <View style={{flexDirection:'row', justifyContent:'flex-end'}}>
                </View>
        </View>
      </View>
     </Pressable>
   

  )};







const ProfileOfOther: FC<Props> = ({navigation, route})  => {
  const { userItems, nameContext, viewUserProfile, updateProfileOther, setUpdateProfileOther, setFollowersBool, setFollowingBool} = useContext<any>(UserContext);
  
  const [displayFollowers, setDisplayFollowers] = useState<any>([]);
  const [displayFollowing, setDisplayFollowing] = useState<any>([]);
  const [displayUserAge, setDisplayUserAge] = useState<any>();
  const [allEvents, setAllEvents] = useState<any>([]);

  useEffect(() => {
    getFollowers();
    getFollowing();
    getUserAge();
    fetchEvents();
    setUpdateProfileOther(false);
    
  }, [updateProfileOther])

  const getFollowers = async () => {
    
    let followers = await GetFollowersByUserId(viewUserProfile.id);
    
    setDisplayFollowers(followers.length);
    
  };

  const getFollowing = async () => {
   
    let following = await GetFollowingByUserId(viewUserProfile.id);
    
    setDisplayFollowing(following.length);
 
  };

  const getUserAge = async () => {
    //get today's year for age calculation
    let dob = await viewUserProfile['dateOfBirth'];
    const currentYear = new Date().getFullYear();
    //-----------------------------------------------------------
    let calculatedAge: number;
    let dobArr = dob.split("/");
    let bdayMonth = dobArr[0];
    let bdayYear = dobArr[2];
    let bdayMonthNum: number = Number(bdayMonth);
    let bdayYearNum: number = Number(bdayYear);


    const months = ["January","February","March","April","May","June","July","August","September","October","November","December"];
    let monthNum: number = 0;

    const d = new Date();
    let monthName = months[d.getMonth()];

    switch(monthName){
      case "January":
        monthNum = 1;
        break;

      case "February":
        monthNum = 2;
        break;

      case "March":
        monthNum = 3;
        break;

      case "April":
        monthNum = 4;
        break;

      case "May":
        monthNum = 5;
        break;

      case "June":
        monthNum = 6;
        break;

      case "July":
        monthNum = 7;
        break;

      case "August":
        monthNum = 8;
        break;

      case "September":
        monthNum = 9;
        break;

      case "October":
        monthNum = 10;
        break;

      case "November":
        monthNum = 11;
        break;

      case "December":
        monthNum = 12;
        break;
    }
    
    //logic of calculating age
    if(monthNum < bdayMonthNum){
      calculatedAge = currentYear - bdayYearNum -1;
    }else{
      calculatedAge = currentYear - bdayYearNum;
    }
     setDisplayUserAge(calculatedAge);
  }

  const fetchEvents = async () => {
    let displayEvents = await GetItemsByUserId(viewUserProfile.id);
    let activeEvents = displayEvents.filter((event: any) => event.isActive);
    setAllEvents(activeEvents);
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

  const renderItem = ({item}: any) => (
    <EventItem event={item}
    sportOfEvent={item.sportOfEvent}
    />
  );

 return (
     <>
    <View style={styles.mainContainer}>
         <ImageBackground source={SoccerField} resizeMode="cover" style={{ height: "100%", width: "100%", backgroundColor: "#0A326D" }}>
          <View style={{alignItems:'center', marginTop:30}}>
            {
              viewUserProfile.image === null ? <Ionicons name="person-circle-sharp" size={115} style={{ marginTop:25}} color="white" />
              : <Image source={{uri: viewUserProfile.image}} style={{ height: 100, width: 100, borderRadius: 50, marginTop: 25}} />
            }
            
          </View>
          <View style={{justifyContent:'center', flexDirection:'row'}}>
                <Text style={{marginTop: 20, color:'white', marginLeft:2, fontFamily: "Lato_900Black", fontSize: 19, fontWeight: "bold"}}>{nameContext}, </Text>
                <Text style={{marginTop: 20, color:'white', fontFamily: "Lato_700Bold", fontSize: 19, fontWeight: "bold"}}>{displayUserAge}</Text>
          </View>

          <View style={{justifyContent:'center', flexDirection:'row'}}>
          <MaterialIcons name="location-on" size={19} color="white" style={{ marginTop: 20,marginRight:2}} />
                <Text style={{marginTop: 20, color:'white', fontFamily: "Roboto_400Regular", fontSize: 18 }}>{viewUserProfile.city}, {viewUserProfile.state}</Text>
          </View>

          <View style={{justifyContent:'center', flexDirection:'row'}}>
                <Text style={{marginTop: 20, color:'white',marginRight:35, fontFamily: "Roboto_700Bold", fontSize: 17}}>{displayFollowers}</Text>
                <Text style={{marginTop: 20, color:'white', marginLeft:35, fontFamily: "Roboto_700Bold", fontSize: 17}}>{displayFollowing}</Text>
          </View>

          <View style={{justifyContent:'center', flexDirection:'row'}}>
            <Pressable onPress={() => {
              navigation.navigate('OtherPersonsFollowers')
              setFollowersBool(false);
            }}>
                <Text style={{marginTop: 10, color:'white', marginRight:15, fontFamily: "Roboto_500Medium", fontSize: 16}}>Followers</Text>
            </Pressable>
            <Pressable  onPress={() => {
              navigation.navigate('OtherPersonsFollowings')
              setFollowingBool(false);
            }}>
                <Text style={{marginTop: 10, color:'white', marginLeft:15, fontFamily: "Roboto_500Medium", fontSize: 16}}>Following</Text>
            </Pressable>
          </View>


          <View>
              <Text style={{marginTop: 30, color:'white', marginLeft:25, fontSize:30, fontFamily: "Lato_900Black",}}>Active Events</Text>
          </View>

        <SafeAreaView>
         
        {/* This is where FlatList Goes */}
        <FlatList horizontal
        data={allEvents}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        />
            

   </SafeAreaView>
          </ImageBackground>
    </View>
     </>
 )   
}

const styles = StyleSheet.create({
    mainContainer:{
    // paddingTop: 20,
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
        height:190,
        width:260
      },
      cardContent: {
        marginHorizontal: 8,
        marginVertical: 8,
      },
})
export default ProfileOfOther;