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
import { GetUserByUsername, GetFollowersByUserId, GetUserById, GetFollowingByUserId} from '../Services/DataService';

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
  const { userItems, nameContext } = useContext<any>(UserContext);
  const [user, setUser] = useState<any>({})
  const [displayFollowers, setDisplayFollowers] = useState<any>([]);
  const [displayFollowing, setDisplayFollowing] = useState<any>([]);

  useEffect(() => {
    let userProfile = GetUserByUsername(nameContext);
    setUser(userProfile);
  })
  
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
                <Text style={{marginTop: 20, color:'white', marginLeft:2, fontFamily: "Lato_900Black", fontSize: 19, fontWeight: "bold"}}>{nameContext} </Text>
                <Text style={{marginTop: 20, color:'white', fontFamily: "Lato_700Bold", fontSize: 19, fontWeight: "bold"}}>26</Text>
          </View>

          <View style={{justifyContent:'center', flexDirection:'row'}}>
          <MaterialIcons name="location-on" size={19} color="white" style={{ marginTop: 20,marginRight:2}} />
                <Text style={{marginTop: 20, color:'white', fontFamily: "Roboto_400Regular", fontSize: 18 }}>{user.city}, {user.state}</Text>
          </View>

          <View style={{justifyContent:'center', flexDirection:'row'}}>
                <Text style={{marginTop: 20, color:'white',marginRight:35, fontFamily: "Roboto_700Bold", fontSize: 17}}>26</Text>
                <Text style={{marginTop: 20, color:'white', marginLeft:35, fontFamily: "Roboto_700Bold", fontSize: 17}}>38</Text>
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
            <Pressable onPress={() => navigation.navigate('LookAtEvent')}>
          <View style={styles.card}>
        <View style={styles.cardContent}>
            <View style={{ flexDirection: 'row', }}>
            <Image source={man} style={{ height: 90, width: 120, borderRadius: 8 }} />
            <View>
              <View style={{ flexDirection: 'row' }}>
                <MaterialCommunityIcons name="calendar-month" size={23} color="rgba(10, 50, 109, 1)" style={{ marginTop: 6, marginLeft: 14}} />
                  <Text style={{ marginTop: 9, marginLeft: 5, fontFamily: "Roboto_400Regular", fontSize: 13}}>3/13/22</Text>
              </View>
              <View style={{ flexDirection: 'column', }}>
                <View style={{ flexDirection: 'row', }}>
                <MaterialCommunityIcons name="clock-time-three-outline" size={23} color="rgba(10, 50, 109, 1)" style={{ marginTop:5, marginLeft: 14 }} />
                  <Text style={{ marginTop: 9, marginLeft: 5, fontFamily: "Roboto_400Regular", fontSize: 13 }}>9:30 am</Text>
                </View>

                <View style={{ flexDirection: 'row' }}>
                <MaterialIcons name="location-on" size={17} color="white" style={{ backgroundColor: '#0A326D', borderRadius: 3, overflow:'hidden', marginTop: 9, marginLeft:17, padding:3  }} />
                   <FontAwesome5 name="heart" size={16} color="white" style={{ backgroundColor: '#0A326D', borderRadius: 3, overflow:'hidden', marginTop: 9, marginLeft:9, padding:4 }} />
                </View>


              </View>
            </View>
          </View>

                <Text style={{marginTop:10, marginLeft: 4, fontFamily: "Lato_700Bold", fontSize:13 }}>Hal Bartholomew Sports Park Football Game </Text>
                <Text style={{marginTop:5, marginLeft:4, fontSize:11, fontFamily: "Lato_400Regular"}}>6300 Whitelock Pkwy,{'\n'}Elk Grove, CA 95757</Text>
                <View style={{flexDirection:'row', justifyContent:'flex-end'}}>
                </View>
        </View>
      </View>
     </Pressable>

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