import { FC, useState, useContext, useEffect } from "react";
import { Image, FlatList, ImageBackground, Pressable, ScrollView, StyleSheet, Text, View, SafeAreaView } from "react-native";
import SoccerField from '../assets/SoccerField.png';
import man from '../assets/man.jpg';
import { MaterialIcons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { FontAwesome,Entypo } from '@expo/vector-icons';
import AppLoading from "expo-app-loading";
import { Ionicons } from '@expo/vector-icons';
import UserContext  from '../Context/UserContext';
import { DeleteEventItem, GetItemsByUserId, AddLikedEvent, DeleteLikedEvent, GetFollowersByUserId, GetUserById, GetFollowingByUserId, UpdateUser, GetIsLiked, triggerNotificationHandler, AddNotification } from "../Services/DataService"

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
import * as ImagePicker from 'expo-image-picker';
import { Button } from "native-base";
import { ImageHandler } from "../Components/ImageHandler";
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
import yoga from "../assets/yoga.jpg";
import skateboarding from "../assets/SkateboardEvent.jpg";
import pugEvent from "../assets/pugEvent.png";
import { createOpenLink } from "react-native-open-maps";

interface EventsProps{ 
  handlePastEvents: Function,
  handleLikedEvents: Function
}

type RootStackParamList ={
  Nav: undefined,
  event:{name:string},
  profile:undefined,
  PastEvents:undefined,
  LikedEvents:undefined,
  settings:undefined,
  following:undefined,
  YourActiveEvent:undefined,
  followers:undefined,
}
type Props = NativeStackScreenProps<RootStackParamList, "PastEvents">;

const EventItem = ({event, id, nameOfEvent, addressOfEvent, dateOfEvent, timeOfEvent, navigation, sportOfEvent} :any) => {
  const { userItems, setUpdateScreen, updateScreen, setEventItems, setNameContext, setUpdateProfileScreen, updateProfileScreen, viewUserProfile, setUpdateNotificationsScreen, setUpdateEventScreen, setUpdateProfileOther} = useContext<any>(UserContext);
  const [isLiked, setIsLiked] = useState(false);
  const [disableBtn, setDisableBtn] = useState(false);
  const [editEventBtnColor, setEditEventBtnColor] = useState("#0A326D")
  const [removeBtnColor, setRemoveBtnColor] = useState("#0A326D")
  
  useEffect(() => {
    checkIfLiked();
    setUpdateProfileScreen(false);
  }, [updateProfileScreen])

  const handleLiked = () => {
    setDisableBtn(true);
    setIsLiked(!isLiked)
    let liked = isLiked;
    if(!liked){
      let addLike = {
        Id: 0,
        UserId: userItems.id,
        EventId: id,
        EventUnliked: false
      }
      let addNotification = {
        Id: 0,
        userId: event.userId,
        PersonWhoLikedId: userItems.id,
        NotificationText: `${userItems.username} Liked ${nameOfEvent}`
      }
      triggerNotificationHandler(userItems, viewUserProfile);
      AddNotification(addNotification);
      AddLikedEvent(addLike)
      setUpdateNotificationsScreen(true);
    }else{
      DeleteLikedEvent(userItems.id, id)
    }
    setUpdateScreen(true);
    setTimeout(() => {
      setDisableBtn(false);
      console.log("enabled")
    }, 5000)
  }

  const checkIfLiked = async () => {
    let liked = await GetIsLiked(userItems.id, id);
    
    setIsLiked(liked);
    //console.log(liked);
  }

  const handleSavedEvent = () => {
    setEditEventBtnColor("gray");
    setTimeout(() => {
      setEditEventBtnColor("#0A326D");
    }, 300)
    setEventItems(event);
    setNameContext(`${userItems.firstName} ${userItems.lastName}`);
  }
 

  return (
    
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
                                                          : sportOfEvent === "Yoga" ?
                                                          <Image source={yoga} style={{ flex: 1, height: 90, width: 120, borderRadius: 8 }} />
                                                          : sportOfEvent === "SkateBoarding" ?
                                                          <Image source={skateboarding} style={{ flex: 1, height: 90, width: 120, borderRadius: 8 }} />
                                                          :
                                                          <Image source={pugEvent} style={{ flex: 1, height: 90, width: 120, borderRadius: 8 }} />
            }

      
      <View>
        <View style={{ flexDirection: 'row' }}>
          <MaterialCommunityIcons name="calendar-month" size={23} color="rgba(10, 50, 109, 1)" style={{ marginTop: 6, marginLeft: 14}} />
            <Text style={{ marginTop: 9, marginLeft: 5, fontFamily: "Roboto_400Regular", fontSize: 13}}>{dateOfEvent}</Text>
        </View>
        <View style={{ flexDirection: 'column', }}>
          <View style={{ flexDirection: 'row', }}>
          <MaterialCommunityIcons name="clock-time-three-outline" size={23} color="rgba(10, 50, 109, 1)" style={{ marginTop:5, marginLeft: 14 }} />
            <Text style={{ marginTop: 9, marginLeft: 5, fontFamily: "Roboto_400Regular", fontSize: 13 }}>{timeOfEvent}</Text>
          </View>

          <View style={{ flexDirection: 'row' }}>
            <Pressable onPress={createOpenLink({ provider: 'google', end: addressOfEvent})}>
                <MaterialIcons name="location-on" size={17} color="white" style={{ backgroundColor: '#0A326D', borderRadius: 3, overflow:'hidden', marginTop: 9, marginLeft:17, padding:3  }} />
            </Pressable>
            <Pressable onPress={handleLiked} disabled={disableBtn} >
              {
                isLiked ? <FontAwesome name="heart" size={16} color="red" style={{ backgroundColor: '#0A326D', borderRadius: 3, overflow:'hidden', marginTop: 9, marginLeft:9, padding:4 }} />
                : <FontAwesome name="heart-o" size={16} color="white" style={{ backgroundColor: '#0A326D', borderRadius: 3, overflow:'hidden', marginTop: 9, marginLeft:9, padding:4 }} />
                
              }
              
             </Pressable>
          </View>


        </View>
      </View>
    </View>
    
          <Text style={{marginTop:10, marginLeft: 4, fontFamily: "Lato_700Bold", fontSize:13 }}>{nameOfEvent} </Text>
          <Text style={{marginTop:5, marginLeft:4, fontSize:11, fontFamily: 'Lato_400Regular'}}>{addressOfEvent}</Text>
          <View style={{flexDirection:'row', marginTop:25, justifyContent: 'space-between' }}>
            <Pressable onPress={() => {
              console.log('pressed');
              handleSavedEvent();
              navigation.navigate('YourActiveEvent');
            }}>
              <View style={{backgroundColor: editEventBtnColor, borderRadius: 2, overflow:'hidden', marginRight: 0, width:105, height:30, paddingTop:6, paddingLeft:4 }} >
                <Text style={{ alignSelf: 'center', color:'white', fontFamily:"Lato_400Regular"}}>Edit Event</Text>
              </View>
            </Pressable>
            <Pressable onPress={() => {
              setDisableBtn(true);
              setRemoveBtnColor("gray");
              console.log("Removed")
              DeleteEventItem(id);
              setUpdateScreen(true);
              setUpdateEventScreen(true);
              setUpdateProfileScreen(true);
              setUpdateProfileOther(true);
            }} 
            disabled={disableBtn}
            >
              <View style={{backgroundColor:removeBtnColor, borderRadius: 2, overflow:'hidden', marginRight: 0, width:105, height:30, paddingTop:6, paddingLeft:4 }} >
                <Text style={{marginLeft:4, color:'white', fontFamily:"Lato_400Regular"}}>Remove Event</Text>
              </View>
            </Pressable>
          </View>
  </View>
</View>
   

  )};





  const ProfileScreen: FC<Props> = ({navigation, route})  => {
    const { userItems, updateProfileScreen, setUpdateProfileScreen, setFollowersBool, setFollowingBool } = useContext<any>(UserContext);

    useEffect(() => {
      fetchEvents();
      getFollowers();
      getFollowing();
      getUserAge(userItems.dateOfBirth);
      setUpdateProfileScreen(false);
      setDisplayUserName(userItems.firstName + " " + userItems.lastName);
    }, [updateProfileScreen]);
    
    const [allEvents, setAllEvents] = useState<any>([]);
    const [displayFollowers, setDisplayFollowers] = useState<number>(0);
    const [displayFollowing, setDisplayFollowing] = useState<number>(0);
    const [displayUserAge, setDisplayUserAge] = useState<any>();
    const [displayUserName, setDisplayUserName] = useState<string>("");
    // const [pickedImagePath, setPickedImagePath] = useState('');


  // const saveImage = async () =>{
  //   //we are going to start off by getting the file type using a split.
  //   let fileType = pickedImagePath.split(".")[1];
  //   //using FormData to be able to send out data over to the api correctly.
  //   let formData = new FormData();
  //   //Getting the file name using a regex (regular expression)
  //   let fileName = pickedImagePath.replace(/^.*[\\\/]/, "");
  //   formData.append('photo', {pickedImagePath, name:fileName, type:`image/${fileType}`})
  //   //formData.append('photo', {uri: pictureURL, name:fileName, type:`image/${fileType}`})
  //   let res = await fetch(`http://172.20.10.3:5021/Image/uploadImage`, {
  //     method:"POST",
  //     headers: {
  //       'Accept':'application/json'
  //     },
  //     body:formData
  //   })
  //   let photoUrl = await res.text();
  //   console.log(photoUrl);
  // }
    

  const fetchEvents = async () => {
    let displayEvents = await GetItemsByUserId(userItems.id);
    let activeEvents = displayEvents.filter((event: any) => isItAPresentorFutureDay(event['dateOfEvent']) == true);

    activeEvents.sort(function(a: any, b: any){
      var aa = a["dateOfEvent"].split('/').reverse().join();
      var bb = b["dateOfEvent"].split('/').reverse().join();
      return aa < bb ? -1 : (aa > bb ? 1 : 0);
  });
    setAllEvents(activeEvents);
  }

  function isItAPresentorFutureDay(date: string){
    let today: any = new Date();
    const yyyy = today.getFullYear();
    let mm = today.getMonth() + 1; 
    let dd = today.getDate();

    if (dd < 10) dd = '0' + dd;
    if(mm < 10) mm = '0' + mm;

    today = mm + '/' + dd + '/' + yyyy;
    return date >= today;
  }

  const getUserAge = (dob: string) => {
    //get today's year for age calculation
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
      calculatedAge = currentYear - bdayYearNum - 1;
    }else{
      calculatedAge = currentYear - bdayYearNum;
    }

    setDisplayUserAge(calculatedAge);
    
  }

  const getFollowers = async () => {
    let followersArr: any[] = [];
    let followers = await GetFollowersByUserId(userItems.id);
    //console.log(followers);
    await followers.map(async (person: any) => {
      let follower: object = await GetUserById(person.userId);
      followersArr.push(follower);
      //console.log(follower);
      setDisplayFollowers(followersArr.length);
    });

  };

  const getFollowing = async () => {
    let followingArr: any[] = [];
    let following = await GetFollowingByUserId(userItems.id);
    //console.log(followers);
    await following.map(async (person: any) => {
      let follower: object = await GetUserById(person.followerId);
      followingArr.push(follower);
      //console.log(follower);
      setDisplayFollowing(followingArr.length);
    });

  };


 

  
  // const openCamera = async () => {
  //   const permissionResult = await ImagePicker.requestCameraPermissionsAsync();
  //   if (permissionResult.granted === false) {
  //     alert("You've refused to allow this appp to access your camera!");
  //     return;
  //   }
  //   const result = await ImagePicker.launchCameraAsync();
  //   console.log(result);
  
  //   if (!result.cancelled) {
  //     setPickedImagePath(result.uri);
  //     console.log(result.uri);
  //   }
  // }

  
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
    <EventItem id={item.id} nameOfEvent={item.nameOfEvent}
    addressOfEvent={item.addressOfEvent}
    dateOfEvent={item.dateOfEvent}
    timeOfEvent={item.timeOfEvent} 
    navigation={navigation} 
    event={item}
    sportOfEvent={item.sportOfEvent}
    />
    
  );

 return (
     <>
    <View style={styles.mainContainer}>
         <ImageBackground source={SoccerField} resizeMode="cover" style={{ height: "100%", width: "100%", backgroundColor: "#0A326D" }}>


           <View style={{marginTop:40, flexDirection:'row', justifyContent:'flex-end', marginRight:20}}>
             <Pressable onPress={() => navigation.navigate('settings')}>
                  <Ionicons name="md-settings-outline" size={28} color="white" />
             </Pressable>
           </View>
              <View style={{flexDirection:'row', justifyContent:'center'}}>
                <View style={{backgroundColor:'white', height:35,width:110, marginTop:10, borderTopLeftRadius:10, borderBottomLeftRadius:10,}}>
                    <Text style={{marginLeft:25, marginTop:10, fontSize:13,fontFamily: "Lato_700Bold",color: "rgba(10, 50, 109, 1)"}}>My Profile</Text>
                </View>

                <Pressable onPress={() => navigation.navigate('PastEvents')}>
                <View style={{backgroundColor:'white', height:35,width:110, marginTop:10}}>
                    <Text style={{marginLeft:15, marginTop:10, fontSize:13, fontFamily: "Lato_700Bold",color: "rgba(10, 50, 109, 1)"}}>Past events</Text>
                </View>
                </Pressable>

                <Pressable onPress={() => navigation.navigate('LikedEvents')}>
                <View style={{backgroundColor:'white', height:35,width:110, marginTop:10,borderTopRightRadius:10, borderBottomRightRadius:10}}>
                    <Text style={{marginLeft:15, marginTop:10, fontSize:13, fontFamily: "Lato_700Bold",color: "rgba(10, 50, 109, 1)"}}>Liked events</Text>
                </View>
                </Pressable>

             </View>
            <ScrollView style={{flex: 1, marginBottom: 70}}>
            {/* image picker goes here */}
            <ImageHandler/>
          <View style={{justifyContent:'center', flexDirection:'row'}}>
                <Text style={{marginTop: 20, color:'white', marginLeft:2, fontFamily: "Lato_900Black", fontSize: 19, fontWeight: "bold"}}>{`${displayUserName},`} </Text>
                <Text style={{marginTop: 20, color:'white', fontFamily: "Lato_700Bold", fontSize: 19, fontWeight: "bold"}}>{displayUserAge}</Text>
          </View>

          <View style={{justifyContent:'center', flexDirection:'row'}}>
          <MaterialIcons name="location-on" size={19} color="white" style={{ marginTop: 20,marginRight:2}} />
                <Text style={{marginTop: 20, color:'white', fontFamily: "Roboto_400Regular", fontSize: 18 }}>{userItems.city}, {userItems.state}</Text>
          </View>

          <View style={{justifyContent:'center', flexDirection:'row'}}>
                <Text style={{marginTop: 20, color:'white',marginRight:35, fontFamily: "Roboto_700Bold", fontSize: 17}}>{displayFollowers}</Text>
                <Text style={{marginTop: 20, color:'white', marginLeft:35, fontFamily: "Roboto_700Bold", fontSize: 17}}>{displayFollowing}</Text>
          </View>

                    <View style={{justifyContent:'center', flexDirection:'row'}}>
                    <Pressable onPress={() => {
                      navigation.navigate('followers')
                      setFollowersBool(true);
                    }}>
                        <Text style={{marginTop: 10, color:'white', marginRight:15, fontFamily: "Roboto_500Medium", fontSize: 16}}>Followers</Text>
                    </Pressable>
                  <Pressable onPress={() => {
                    navigation.navigate('following')
                    setFollowingBool(true);
                  }}>             
                      <Text style={{marginTop: 10, color:'white', marginLeft:15, fontFamily: "Roboto_500Medium", fontSize: 16}}>Following</Text>
                  </Pressable>
                    </View>



          <View>
              <Text style={{marginTop: 30, color:'white', marginLeft:25, fontSize:30, fontFamily: "Lato_900Black",}}>Active Events</Text>
          </View>

        {/* Where FlatList goes */}
        <SafeAreaView>
        <FlatList horizontal
        data={allEvents}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        />
        </SafeAreaView>
        



          </ScrollView>
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
        height:205,
        width:260
      },
      cardContent: {
        marginHorizontal: 8,
        marginVertical: 8,
      },
      imageContainer: {
        padding: 30
      },
})
export default ProfileScreen;