import { FC } from "react";
import { Button, Image, ImageBackground, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import PUGHeader from "../Components/PUGHeader";
import { MaterialIcons } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import man from '../assets/man.jpg';
import { FontAwesome5 } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import FooterComponent from "../Components/FooterComponent";

const EventDisplayedScreen:FC = () => {
    return (
        <>
        <ScrollView>
        <View style={styles.container}> 
        <View style={{ flexDirection:'row',marginTop:7,backgroundColor:'red'}}>
            <View style={{flex:1, alignItems: 'flex-start', marginLeft:8}}>
                 <Ionicons name="chevron-back" size={35} color="#7E90AB" style={{marginTop:7, justifyContent:'flex-start'}}/>
            </View>
            <View style={{marginTop:7,}}>
                 <MaterialIcons name="notifications" size={30} color="#7E90AB" style={{justifyContent:'center', marginRight:10}}/>
            </View>
            <View>
                <Ionicons name="add" size={43} color="#7E90AB" style={{justifyContent:'flex-end'}}/>
            </View>
        </View>

    <View style={{ flex:1, backgroundColor:'red' }}>

    <ImageBackground source={man} resizeMode="cover" style={{ height:250}}>
         <View style={styles.containerInsideImage}> 
        <View style={{flex:1, alignItems: 'flex-end', marginTop:7, marginRight:10}}>
        <MaterialIcons name="location-on" size={20} color="white" style={{ backgroundColor: '#0A326D', borderRadius: 3, overflow:'hidden', marginTop: 10, marginLeft: 12, padding:5  }} />
        </View>
        <View style={{marginTop:7, marginRight:10}}>
        <FontAwesome5 name="heart" size={17} color="white" style={{ backgroundColor: '#0A326D', borderRadius: 3, overflow:'hidden', marginTop: 10, padding:6.5 }} />
        </View>
    </View>
    </ImageBackground>
    </View>

            <View style={{marginLeft:15}}>
                <Text>Oak Park Basketball Game</Text>
                <Text style={{marginTop:10}}>4520 W Eight Mile Rd,{'\n'}Stockton, CA 95209</Text>
            </View>
                <View style={{flexDirection:'row'}}>
                    <MaterialCommunityIcons name="calendar-month" size={22} color="black" style={{ marginTop: 10, marginLeft: 18}} />
                    <Text style={{ marginTop: 12, marginLeft: 9}}>04/22/22</Text>
                    <MaterialCommunityIcons name="clock-time-three-outline" size={22} color="black" style={{ marginLeft:25, marginTop:10 }} />
                    <Text style={{ marginLeft:9, marginTop:12 }} >9:30 am</Text>
                </View>

                <Pressable onPress={() => console.log('clicked')} style={{marginLeft:9, marginTop:8}}>
                <View style={{ backgroundColor: '#0A326D', borderRadius: 2, overflow:'hidden', marginTop: 10, marginLeft: 12, padding:5, width:90, height:27 }} >
                    <Text style={{marginLeft:16, color:'white'}}>Follow</Text>
                </View>
                </Pressable>
                
                <View style={{flexDirection:'row'}}>
                <View style={{flexDirection:'row', flex: 1, backgroundColor: '#7E90AB', marginTop: 15, height:80,shadowRadius:8,shadowColor: '#333',shadowOffset: { width: 5, height: 5 },shadowOpacity: 0.4}}>
                <Image source={man} style={{ height: 55, width: 55, borderRadius: 30, marginTop: 13, marginLeft: 22 }} />
                <Text style={{flex:0.5, marginTop:30, marginLeft:17, fontSize:17,color:'white'}}>Matthew David</Text>
                </View>
                </View>

                <View style={{marginLeft:20, marginTop:15}} >
                    <Text>Details:</Text>
                    <Text style={{marginTop:10}}>We want to play at least 3 games. With at least 15 people on each team. If we have more players we will swap between new games. </Text>
                </View>
        </View>
           </ScrollView>
           <FooterComponent/>
        </>
    )
}


const styles = StyleSheet.create({
    container: {
        paddingTop: 20,
        flex: 1 
      },

      containerInsideImage: {
        flexDirection: "row",
        paddingTop: 5,
      },
});
export default EventDisplayedScreen;