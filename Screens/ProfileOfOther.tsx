import { FC, useState, useContext, useEffect } from "react";
import { Image, ImageBackground, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import SoccerField from '../assets/SoccerField.png';
import man from '../assets/man.jpg';
import { MaterialIcons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
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
import { GetUserByUsername, GetFollowersByUserId, GetUserById, GetFollowingByUserId, GetItemsByUserId} from '../Services/DataService';

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

const ProfileOfOther: FC<Props> = ({navigation, route})  => {
  const { userItems, nameContext, viewUserProfile, updateProfileOther, setUpdateProfileOther } = useContext<any>(UserContext);
  
  const [displayFollowers, setDisplayFollowers] = useState<any>([]);
  const [displayFollowing, setDisplayFollowing] = useState<any>([]);
  const [displayUserAge, setDisplayUserAge] = useState<any>();
  const [allEvents, setAllEvents] = useState<any>([]);

  useEffect(() => {
    getFollowers();
    getFollowing();
    getUserAge(viewUserProfile.dateOfBirth);
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

 

 return (
     <>
    <View style={styles.mainContainer}>
         <ImageBackground source={SoccerField} resizeMode="cover" style={{ height: "100%", width: "100%", backgroundColor: "#0A326D" }}>
          <View style={{alignItems:'center', marginTop:30}}>
            <Pressable onPress={() => console.log('Change Photo')}>
                <Image source={man} style={{ height: 100, width: 100, borderRadius: 50, marginTop: 25}}/>
            </Pressable>
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
            <Pressable onPress={() => navigation.navigate('OtherPersonsFollowers')}>
                <Text style={{marginTop: 10, color:'white', marginRight:15, fontFamily: "Roboto_500Medium", fontSize: 16}}>Followers</Text>
            </Pressable>
            <Pressable  onPress={() => navigation.navigate('OtherPersonsFollowings')}>
                <Text style={{marginTop: 10, color:'white', marginLeft:15, fontFamily: "Roboto_500Medium", fontSize: 16}}>Following</Text>
            </Pressable>
          </View>


          <View>
              <Text style={{marginTop: 30, color:'white', marginLeft:25, fontSize:30, fontFamily: "Lato_900Black",}}>Active Events</Text>
          </View>

        <ScrollView horizontal>
          {

          allEvents.map((event: any, idx: number) => {
            return(
              <Pressable onPress={() => navigation.navigate('LookAtEvent')} key={idx}>
          <View style={styles.card}>
        <View style={styles.cardContent}>
            <View style={{ flexDirection: 'row', }}>
            <Image source={man} style={{ height: 90, width: 120, borderRadius: 8 }} />
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
                   <FontAwesome5 name="heart" size={16} color="white" style={{ backgroundColor: '#0A326D', borderRadius: 3, overflow:'hidden', marginTop: 9, marginLeft:9, padding:4 }} />
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
            )
          })
        }
            

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
        height:190,
        width:260
      },
      cardContent: {
        marginHorizontal: 8,
        marginVertical: 8,
      },
})
export default ProfileOfOther;