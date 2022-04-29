import { FC, useState, useContext, useEffect } from "react";
import { Image, FlatList, ImageBackground, Pressable, ScrollView, StyleSheet, Text, View, SafeAreaView } from "react-native";
import SoccerField from '../assets/SoccerField.png';
import man from '../assets/man.jpg';
import { MaterialIcons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import AppLoading from "expo-app-loading";
import { Ionicons } from '@expo/vector-icons';
import UserContext  from '../Context/UserContext';
import { DeleteEventItem, GetItemsByUserId, AddLikedEvent, DeleteLikedEvent } from "../Services/DataService"

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
  YourActiveEvents:undefined,
  followers:undefined,
}
type Props = NativeStackScreenProps<RootStackParamList, "PastEvents">;

const EventItem = ({id, nameOfEvent, addressOfEvent, dateOfEvent, timeOfEvent, navigation} :any) => {
  const { userItems } = useContext<any>(UserContext);
  const [isLiked, setIsLiked] = useState(false);

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
 

  return (
    
    
      
    <View style={styles.card}>
      <Pressable onPress={() => {
      console.log('pressed');
      navigation.navigate('YourActiveEvents')
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
          <View style={{flexDirection:'row', justifyContent:'flex-end'}}>
            <Pressable onPress={() => {
              console.log("Removed")
              DeleteEventItem(id);
            }} >
              <View style={{ backgroundColor: '#0A326D', borderRadius: 2, overflow:'hidden', marginRight: 2, padding:5, width:105, height:27 }} >
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
  }, []);

  const [allEvents, setAllEvents] = useState<any>([]);
  const { userItems } = useContext<any>(UserContext);

  const fetchEvents = async () => {
    let displayEvents = await GetItemsByUserId(userItems.id);
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
    <EventItem id={item.id} nameOfEvent={item.nameOfEvent}
    addressOfEvent={item.addressOfEvent}
    dateOfEvent={item.dateOfEvent}
    timeOfEvent={item.timeOfEvent} />
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
                <Image source={man} style={{ height: 100, width: 100, borderRadius: 50, marginTop: 25}}/>
            </Pressable>
          </View>
          <View style={{justifyContent:'center', flexDirection:'row'}}>
                <Text style={{marginTop: 20, color:'white', marginLeft:2, fontFamily: "Lato_900Black", fontSize: 19, fontWeight: "bold"}}>Jack Smith, </Text>
                <Text style={{marginTop: 20, color:'white', fontFamily: "Lato_700Bold", fontSize: 19, fontWeight: "bold"}}>26</Text>
          </View>

          <View style={{justifyContent:'center', flexDirection:'row'}}>
          <MaterialIcons name="location-on" size={19} color="white" style={{ marginTop: 20,marginRight:2}} />
                <Text style={{marginTop: 20, color:'white', fontFamily: "Roboto_400Regular", fontSize: 18 }}>Stockton, CA</Text>
          </View>

          <View style={{justifyContent:'center', flexDirection:'row'}}>
                <Text style={{marginTop: 20, color:'white',marginRight:35, fontFamily: "Roboto_700Bold", fontSize: 17}}>26</Text>
                <Text style={{marginTop: 20, color:'white', marginLeft:35, fontFamily: "Roboto_700Bold", fontSize: 17}}>38</Text>
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
})
export default ProfileScreen;