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
import { DeleteEventItem, GetItemsByUserId, AddLikedEvent, DeleteLikedEvent, GetFollowersByUserId, GetUserById, GetFollowingByUserId, UpdateUser, GetIsLiked } from "../Services/DataService"

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

interface EventsProps{ 
  handlePastEvents: Function,
  handleLikedEvents: Function
}

type RootStackParamList ={
  Nav: undefined,
  event:{name:string},
  profile:{name:string},
  PastEvents:undefined,
  LikedEvents:undefined,
  settings:undefined,
  following:undefined,
  YourActiveEvent:undefined,
  followers:undefined,
}
type Props = NativeStackScreenProps<RootStackParamList, "PastEvents">;

const EventItem = ({id, nameOfEvent, addressOfEvent, dateOfEvent, timeOfEvent, navigation} :any) => {
  const { userItems } = useContext<any>(UserContext);
  const [isLiked, setIsLiked] = useState(false);

  useEffect(() => {
    checkIfLiked();
  })

  const handleLiked = () => {
    setIsLiked(!isLiked)
    let liked = isLiked;
    if(!liked){
      let addLike = {
        Id: 0,
        UserId: userItems.id,
        EventId: id,
        EventUnliked: false
      }
      AddLikedEvent(addLike)
    }else{
      DeleteLikedEvent(userItems.id, id)
    }
    
  }

  const checkIfLiked = async () => {
    let liked = await GetIsLiked(userItems.id, id);
    
    setIsLiked(liked);
    //console.log(liked);
  }
 

  return (
    
    <View style={styles.card}>
      <Pressable onPress={() => {
      console.log('pressed');
      navigation.navigate('YourActiveEvent')
    }}>
  <View style={styles.cardContent}>
      <View style={{ flexDirection: 'row', }}>
      <Image source={man} style={{ height: 90, width: 120, borderRadius: 8 }} />
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

          <Text style={{marginTop:10, marginLeft: 4, fontFamily: "Lato_700Bold", fontSize:13 }}>{nameOfEvent} </Text>
          <Text style={{marginTop:5, marginLeft:4, fontSize:11, fontFamily: "Lato_400Regular"}}>{addressOfEvent}</Text>
          <View style={{flexDirection:'row', justifyContent:'flex-end', marginTop:30, marginLeft: 10}}>
            <Pressable onPress={() => {
              console.log("Removed")
              DeleteEventItem(id);
            }} >
              <View style={{ backgroundColor: '#0A326D', borderRadius: 2, overflow:'hidden', marginRight: 0, width:105, height:30, paddingTop:6, paddingLeft:4 }} >
                <Text style={{marginLeft:4, color:'white', fontFamily:"Lato_400Regular"}}>Remove Event</Text>
              </View>
            </Pressable>
          </View>
  </View>
  </Pressable>
</View>
   

  )};





  const ProfileScreen: FC<Props> = ({navigation, route})  => {
    useEffect(() => {
      fetchEvents();
      getFollowers();
      getFollowing();
      getUserAge(userItems.dateOfBirth)
    }, []);
    
    const [allEvents, setAllEvents] = useState<any>([]);
    const [displayFollowers, setDisplayFollowers] = useState<any>([]);
    const [displayFollowing, setDisplayFollowing] = useState<any>([]);
    const [displayUserAge, setDisplayUserAge] = useState<any>();
    const [pickedImagePath, setPickedImagePath] = useState('');
    const { userItems } = useContext<any>(UserContext);

  const fetchEvents = async () => {
    let displayEvents = await GetItemsByUserId(userItems.id);
    let activeEvents = displayEvents.filter((event: any) => event.isActive);
    setAllEvents(activeEvents);
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
    if(monthNum > bdayMonthNum){
      calculatedAge = currentYear - bdayYearNum;
    }else{
      calculatedAge = currentYear - bdayYearNum - 1;
    }

    setDisplayUserAge(calculatedAge);
    
  }

  const getFollowers = async () => {
    let followersArr: any[] = [];
    let followers = await GetFollowersByUserId(userItems.id);
    //console.log(followers);
    followers.map(async (person: any) => {
      let follower: object = await GetUserById(person.userId);
      followersArr.push(follower);
      //console.log(follower);
    });

    setTimeout(() => {
      setDisplayFollowers(followersArr.length);
    }, 1000);
  };

  const getFollowing = async () => {
    let followingArr: any[] = [];
    let following = await GetFollowingByUserId(userItems.id);
    //console.log(followers);
    following.map(async (person: any) => {
      let follower: object = await GetUserById(person.followerId);
      followingArr.push(follower);
      //console.log(follower);
    });

    setTimeout(() => {
      setDisplayFollowing(followingArr.length);
    }, 1000);
  };






  const showImagePicker = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (permissionResult.granted === false) {
      alert("You've refused to allow this app to access your photos!");
      return;
    }
    const result = await ImagePicker.launchImageLibraryAsync();
    console.log(result);
    if (!result.cancelled) {
      setPickedImagePath(result.uri);
      console.log(result.uri);
    }
    let userData = {
      Id: userItems.id,
      FirstName: userItems.firstName,
      LastName: userItems.lastName,
      Username: userItems.username,
      Salt: userItems.salt,
      Hash: userItems.hash,
      DateOfBirth:userItems.dateOfBirth,
      City:userItems.city,
      State:userItems.state,
      isTermsAccepted:userItems.isTermsAccepted,
      isEighteen:userItems.isEighteen,
      Image:pickedImagePath,
      IsDeleted:false
    };
    console.log("test")
    console.log(userData)
    let updateUserImage = await UpdateUser(userData);
    console.log(updateUserImage);
  }

  const openCamera = async () => {
    const permissionResult = await ImagePicker.requestCameraPermissionsAsync();
    if (permissionResult.granted === false) {
      alert("You've refused to allow this appp to access your camera!");
      return;
    }
    const result = await ImagePicker.launchCameraAsync();
    console.log(result);
  
    if (!result.cancelled) {
      setPickedImagePath(result.uri);
      console.log(result.uri);
    }
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
    <EventItem id={item.id} nameOfEvent={item.nameOfEvent}
    addressOfEvent={item.addressOfEvent}
    dateOfEvent={item.dateOfEvent}
    timeOfEvent={item.timeOfEvent} 
    navigation={navigation}/>
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
                    <Text style={{marginLeft:25, marginTop:10, fontFamily: "Lato_700Bold",color: "rgba(10, 50, 109, 1)"}}>My Profile</Text>
                </View>

                <Pressable onPress={() => navigation.navigate('PastEvents')}>
                <View style={{backgroundColor:'white', height:35,width:110, marginTop:10}}>
                    <Text style={{marginLeft:12, marginTop:10,fontSize:13, fontFamily: "Lato_700Bold",color: "rgba(10, 50, 109, 1)"}}>Past events</Text>
                </View>
                </Pressable>

                <Pressable onPress={() => navigation.navigate('LikedEvents')}>
                <View style={{backgroundColor:'white', height:35,width:110, marginTop:10,borderTopRightRadius:10, borderBottomRightRadius:10}}>
                    <Text style={{marginLeft:15, marginTop:10, fontFamily: "Lato_700Bold",color: "rgba(10, 50, 109, 1)"}}>Liked events</Text>
                </View>
                </Pressable>

             </View>
            <ScrollView style={{flex: 1, marginBottom: 70}}>
          <View style={{alignItems:'center'}}>
            <Pressable onPress={() => console.log('Change Photo')}>
                   <View style={{marginTop:20,flexDirection:'row'}}>
                <Pressable onPress={showImagePicker}>
              <View style={{backgroundColor:'#7E90AB', height:100, width:100, borderRadius:50, marginTop: 8}}>
                {
                  pickedImagePath !== '' ? <Image
                  source={{ uri: pickedImagePath }}
                  style={{ height: 100, width: 100, borderRadius: 50,}}
                  />
                  :
                  <View>
                  <MaterialCommunityIcons name="image-plus" size={40} color="white" style={{marginLeft:30, marginTop:30}}/>
                  </View>
                }
              </View>
                </Pressable>
              </View>
              {/* <View style={{backgroundColor:'gray', height:100, width:100, borderRadius:50, marginTop: 25}}>
              <Entypo name="camera" size={40} color="white" style={{marginLeft:30, marginTop:30}}/>
              {
                  
                    pickedImagePath !== '' && <Image
                    source={{ uri:pickedImagePath}} style={{ height: 100, width: 100, borderRadius: 50,}}/>
                  
              }
                </View> */}
            </Pressable>
            <Pressable onPress={showImagePicker}>
                <Text style={{color:'white',fontSize:15, fontFamily: "Lato_900Black",textDecorationLine:'underline', marginTop:5 }}>{ pickedImagePath == '' ? "Upload Profile Photo" : "Change Profile Photo"}</Text>
            </Pressable>

          </View>
          <View style={{justifyContent:'center', flexDirection:'row'}}>
                <Text style={{marginTop: 20, color:'white', marginLeft:2, fontFamily: "Lato_900Black", fontSize: 19, fontWeight: "bold"}}>{userItems.firstName + " "+ userItems.lastName}, </Text>
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
                    <Pressable onPress={() => navigation.navigate('followers')}>
                        <Text style={{marginTop: 10, color:'white', marginRight:15, fontFamily: "Roboto_500Medium", fontSize: 16}}>Followers</Text>
                    </Pressable>
                  <Pressable onPress={() => navigation.navigate('following')}>             
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